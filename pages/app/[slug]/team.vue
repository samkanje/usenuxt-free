<script setup lang="ts">
const route = useRoute()
const user = useAuthenticatedUser()
const { data, refresh } = useFetch(() => `/api/orgs/${route.params.slug}/members`)

const roles = ['owner', 'member']
const tabs = [{ label: 'Members', key: 'members' }, { label: 'Invited', key: 'invited' }]

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'role', label: 'Role' },
  { key: 'actions' },
]
function actions() {
  return [
    [{
      label: 'Delete',
      icon: 'i-heroicons-trash-20-solid',
    }],
  ]
}
const invitedColumns = [
  { key: 'email', label: 'Email' },
  { key: 'role', label: 'Role' },
  { key: 'actions' },
]
async function changeRole() {
  // TODO
}
</script>

<template>
  <h1 class="text-lg font-medium mb-4">
    Team
  </h1>
  <div class="mt-8 my-4">
    <AppInviteMemberButton @complete="refresh" />
  </div>

  <UCard class="border rounded-lg border-gray-200 dark:border-gray-700 w-full max-w-screen-md">
    <UTabs :items="tabs" class="mb-4">
      <template #item="{ item }">
        <UTable v-if="item.key === 'members'" :rows="data?.members" :columns="columns">
          <template #role-data="{ row }">
            <span v-if="row.id === user.id">{{ row.role }}</span>
            <UDropdown v-else :items="[roles.map(role => ({ label: role }))]" :ui="{ item: { base: 'capitalize' } }" @select="changeRole(row.email, $event)">
              <UButton variant="ghost" color="gray" :label="row.role" trailing-icon="i-heroicons-chevron-down-20-solid" class="capitalize text-sm" />
            </UDropdown>
          </template>
          <template #actions-data="{ row }">
            <span v-if="row.id === user.id">-</span>
            <UDropdown v-if="row.id !== user.id" :items="actions()">
              <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
            </UDropdown>
          </template>
        </UTable>
        <UTable v-if="item.key === 'invited'" :rows="data?.invited" :columns="invitedColumns">
          <template #role-data="{ row }">
            {{ row.role }}
          </template>
          <template #actions-data="{ row }">
            <span v-if="row.id === user.id">-</span>
            <UDropdown v-if="row.id !== user.id" :items="actions()">
              <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
            </UDropdown>
          </template>
        </UTable>
      </template>
    </UTabs>
  </UCard>
</template>
