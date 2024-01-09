export default defineEventHandler(async (event) => {
  const { session_id } = getQuery(event)
  if (!session_id)
    return sendRedirect(event, '/', 302)
  const session = await stripeService.validatePayment(session_id.toString())
  if (!session)
    return sendRedirect(event, '/', 302)
  const org = await stripeService.getOrgForCustomerId(session.customer as string)

  if (org)
    return sendRedirect(event, `/app/${org.slug}`, 302)

  return sendRedirect(event, '/', 302)
})
