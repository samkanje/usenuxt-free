export default defineEventHandler(async (event) => {
  const session = await authService.getSession(event)
  const { context: { params } } = event
  if (!session?.user || !params?.slug)
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })

  const org = await orgService.getOrgBySlug(params.slug, session.user.id, 'owner')
  if (!org)
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })

  const { email, role } = await readBody(event)
  if (!email || !role)
    throw createError({ statusCode: 400, statusMessage: 'Bad Request' })

  const member = await orgService.createInvite(org.id, email, role)

  return { member }
})
