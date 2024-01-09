<script setup lang="ts">
const route = useRoute()
const base = computed(() => route.params.slug ? `/app/${route.params.slug}` : '/app')

const appLinks = computed(() => [
  {
    label: 'Dashboard',
    icon: 'i-solar-home-line-duotone',
    to: base.value,
  },
  {
    label: 'Team',
    icon: 'i-solar-users-group-rounded-line-duotone',
    to: `${base.value}/team`,
  },
])

const adminLinks = computed(() => [
  {
    label: 'Billing',
    icon: 'i-solar-bill-list-line-duotone',
    to: `${base.value}/billing`,
  },
  {
    label: 'Settings',
    icon: 'i-solar-settings-line-duotone',
    to: `${base.value}/settings`,
  },
])

const ui = {
  label: 'text-base py-1 font-normal',
  icon: {
    base: 'h-6 w-6',
    active: 'text-primary-600',
  },
}
</script>

<template>
  <div class="w-full lg:w-96 lg:h-full pt-12">
    <UVerticalNavigation :links="appLinks" :ui="ui" />
    <UDivider class="w-10/12 my-2" />
    <UVerticalNavigation :links="adminLinks" :ui="ui" />
  </div>
</template>
