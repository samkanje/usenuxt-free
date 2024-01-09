export default defineEventHandler(async (event) => {
  const { slug } = getQuery(event)
  const session = await authService.getSession(event)
  if (!session?.user || !slug)
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })

  const org = await orgService.getOrgBySlug(slug.toString(), session.user.id, 'owner')
  if (!org)
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })

  const customer = await stripeService.getCustomer(org)
  const portalSession = await stripeService.createPortalSession(customer.id, org.slug)
  return sendRedirect(event, portalSession.url ?? '/', 302)
})
