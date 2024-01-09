import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const { plan, period, slug } = getQuery(event)
  if (!plan || !period)
    return sendRedirect(event, '/', 302)

  const [product] = await db.select().from(tables.product).where(eq(tables.product.code, plan as string))
  if (!product)
    return sendRedirect(event, '/', 302)
  const pricingId = period === 'year' ? product.stripeYearlyPriceId : product.stripeMonthlyPriceId

  const session = await authService.getSession(event)

  if (!session?.user) { // we still want to allow buying a subscription before signup.
    const stripeSession = await stripeService.createCheckoutSession(pricingId)
    return sendRedirect(event, stripeSession.url ?? '/', 302)
  }

  if (!slug) { // logged in but did not specify org. send back to billing portal
    const defuaultOrg = await userService.getDefaultUserRole(session.user.id)
    return sendRedirect(event, `/app/${defuaultOrg?.org.slug}/billing`, 302)
  }

  // Only allow org owners to create subscription
  const org = await orgService.getOrgBySlug(slug.toString(), session.user?.id, 'owner')
  if (!org)
    return sendRedirect(event, '/', 302)

  // if the org already has a subscription, send to billing portal
  const subscription = await orgService.getSubscription(org.id)
  if (subscription) {
    const portalSession = await stripeService.createPortalSession(subscription.stripeCustomerId, org.slug)
    return sendRedirect(event, portalSession.url ?? '/', 302)
  }

  const customer = await stripeService.getCustomer(org)

  const stripeSession = await stripeService.createCheckoutSession(pricingId, customer.id)
  return sendRedirect(event, stripeSession.url ?? '/', 302)
})
