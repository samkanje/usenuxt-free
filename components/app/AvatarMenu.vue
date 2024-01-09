<script setup lang="ts">
const user = useUser()
const items = computed(() => [
  [{
    label: user.value?.email ?? '',
    slot: 'account',
    disabled: true,
  }],
  [{
    label: 'Profile',
    icon: 'i-heroicons-cog-8-tooth',
    to: '/app/profile',
  }],
  [{
    label: 'Sign out',
    icon: 'i-heroicons-arrow-left-on-rectangle',
    external: true,
    to: '/logout',
  }],
])
</script>

<template>
  <div class="flex items-center gap-2">
    <span class="text-sm">{{ user?.name }}</span>
    <UDropdown :items="items" :ui="{ item: { disabled: 'cursor-text select-text' } }">
      <UAvatar icon="i-solar-user-bold-duotone" />

      <template #account="{ item }">
        <div class="text-left">
          <p>
            Signed in with
          </p>
          <p class="truncate font-medium text-gray-900 dark:text-white">
            {{ item.label }}
          </p>
        </div>
      </template>

      <template #item="{ item }">
        <span class="truncate">{{ item.label }}</span>

        <UIcon :name="item.icon" class="flex-shrink-0 h-4 w-4 ms-auto" />
      </template>
    </UDropdown>
  </div>
</template>
