export async function useOrgs() {
  return useFetch('/api/me/orgs')
}

export async function useOrgData() {
  const route = useRoute()
  return useFetch(() => `/api/orgs/${route.params.slug}`)
}
