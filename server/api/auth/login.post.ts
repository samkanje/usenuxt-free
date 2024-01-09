import { z } from 'zod'
import { authService } from '~/server/utils/auth'

const userSchema = z.object({
  email: z.string({ description: 'Email required' }).email('Invalid email'),
  password: z.string({ description: 'Password required' }).min(8, 'Password should be at least 8 characters'),
})

export default defineEventHandler(async (event) => {
  const u = await readValidatedBody(event, userSchema.safeParse)
  if (!u.success)
    return reply(event, false, 401)

  const { email, password } = u.data
  const user = await authService.passwordLogin(event,email, password)
  if (!user)
    return reply(event, false, 401, 'Invalid email or password')

  return reply(event, !!user)
})

function reply(event: any, success: boolean, code = 200, message = '') {
  setResponseStatus(event, code)
  return { success, message }
}
