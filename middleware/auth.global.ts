export default defineNuxtRouteMiddleware(async (to) => {
  const user = useUser()
  const { data, error } = await useFetch('/api/me')
  if (error.value)
    throw createError('Failed to fetch data')
  user.value = data.value?.user ?? null

  if (to.path.startsWith('/app') && !user.value)
    return navigateTo('/login')
})
