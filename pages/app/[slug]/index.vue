<script setup lang="ts">
const route = useRoute()
const { data } = await useOrgs()
if (data.value && !data.value.orgs.some(o => o.org.slug === route.params.slug)) {
  const slug = data.value.orgs.find(o => o.default)?.org.slug ?? '' as string
  if (!slug)
    await navigateTo('/')

  const path = route.path.split('/')
  path.splice(2, 0, slug)
  await navigateTo(path.join('/'))
}
</script>

<template>
  inside org something
</template>
