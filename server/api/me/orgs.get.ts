import { userService } from '~/server/utils/user'

export default defineEventHandler(async (event) => {
  const session = await authService.getSession(event)
  if (!session?.user)
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  const orgs = await userService.getUserRoles(session.user.id)
  const invitations = await orgService.getInvites(session.user.email)
  return { orgs, invitations }
})
