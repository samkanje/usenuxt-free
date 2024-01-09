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
  try {
    await authService.passwordLogin(event, email, password)
    return reply(event, true)
  }
  catch (error) {
    return reply(event, false, 401, 'Invalid email or password')
  }
})
function reply(event: any, success: boolean, code = 200, message = '') {
  setResponseStatus(event, code)
  return { success, message }
}
