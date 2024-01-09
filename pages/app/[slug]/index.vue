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

const stats = [
  { data: '35K', title: 'Customers' },
  { data: '10K+', title: 'Downloads' },
  { data: '40+', title: 'Countries' },
  { data: '30M+', title: 'Total revenue' },
]
</script>

<template>
  <h1 class="text-lg font-medium">
    Dashboard
  </h1>
  <section class="py-14">
    <div class="max-w-screen-xl mx-auto px-4 md:px-8">
      <UCard>
        <ul class="flex flex-col items-center justify-center gap-x-12 gap-y-10 sm:flex-row sm:flex-wrap md:gap-x-24">
          <li v-for="(item, idx) in stats" :key="idx" class="text-center">
            <h4 class="text-4xl font-semibold">
              {{ item.data }}
            </h4>
            <p class="mt-3  font-medium">
              {{ item.title }}
            </p>
          </li>
        </ul>
      </UCard>
      <div class="grid lg:grid-cols-2 gap-8 mt-8">
        <UCard class="min-h-40" />
        <UCard class="min-h-40" />
        <UCard class="col-span-2 min-h-80" />
      </div>
    </div>
  </section>
</template>
