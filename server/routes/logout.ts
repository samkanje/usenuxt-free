export default defineEventHandler(async (event) => {
  await authService.logout(event)
  return sendRedirect(event, '/')
})
