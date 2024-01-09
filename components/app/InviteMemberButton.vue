<script setup lang="ts">
const emit = defineEmits(['complete'])
const slug = useRoute().params.slug as string
const modalOpen = ref(false)
const formState = reactive({
  email: undefined,
  role: 'member',
})
function resetForm() {
  formState.email = undefined
  formState.role = 'member'
}
async function onSubmit() {
  modalOpen.value = false
  await $fetch(`/api/orgs/${slug}/invite-member`, {
    method: 'POST',
    body: formState,
  })
  emit('complete')
  resetForm()
}
</script>

<template>
  <UButton block class="max-w-24" @click="modalOpen = true">
    Invite
  </UButton>
  <UModal v-model="modalOpen" @close="resetForm">
    <UCard>
      <template #header>
        <h2>Invite new member</h2>
      </template>
      <UForm :state="formState" class="space-y-4" @submit="onSubmit">
        <UFormGroup label="Email" name="email">
          <UInput v-model="formState.email" placeholder="Email" required />
        </UFormGroup>
        <UFormGroup label="Role" name="role">
          <USelect v-model="formState.role" :options="['owner', 'member']" />
        </UFormGroup>
        <UButton type="submit">
          Submit
        </UButton>
      </UForm>
    </UCard>
  </UModal>
</template>
