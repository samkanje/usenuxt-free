export default defineEventHandler(async (event) => {
  const session = await authService.getSession(event)
  return {
    user: session?.user ?? null,
  }
})
