export default defineEventHandler(async (event) => {
  const session = await authService.getSession(event)
  if (!session?.user)
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  const { name } = await readBody<{ name: string }>(event)
  const org = await orgService.create(name, session.user.email)
  await orgService.addMember(org.id, session.user.id, 'owner')
  return org
})
