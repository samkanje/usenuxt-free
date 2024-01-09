export default defineEventHandler(async (event) => {
  const session = await authService.getSession(event)
  const { context: { params } } = event
  if (!session?.user || !params?.slug)
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })

  const org = await orgService.getOrgBySlug(params.slug, session.user.id, 'owner')
  if (!org)
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })

  const members = await orgService.getMembers(org)
  const invited = await orgService.getInvites(org.id)

  return { members, invited }
})
