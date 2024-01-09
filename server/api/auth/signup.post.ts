import { z } from 'zod'
import { authService } from '~/server/utils/auth'

const userSchema = z.object({
  name: z.string({ description: 'Enter your name' }).min(1, 'Enter your name'),
  email: z.string({ description: 'Email required' }).email('Invalid email'),
  password: z.string({ description: 'Password required' }).min(8, 'Password should be at least 8 characters'),
})

export default defineEventHandler(async (event) => {
  const u = await readValidatedBody(event, userSchema.safeParse)
  if (!u.success)
    return reply(event, false, 401)

  const { name, email, password } = u.data
  const user = await authService.createUser(name, email, password)
  if (!user)
    return reply(event, false, 401, 'User already exists')

  const session = user ? await authService.createSession(user.userId, event) : null
  return reply(event, !!session)
})

function reply(event: any, success: boolean, code = 200, message = '') {
  setResponseStatus(event, code)
  return { success, message }
}
