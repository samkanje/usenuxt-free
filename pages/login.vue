<script setup lang="ts">
import type { FormSubmitEvent } from '#ui/types'
import { z } from 'zod'

const user = useUser()
if (user.value)
  await navigateTo('/app')

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Must be at least 8 characters'),
})

type Schema = z.output<typeof schema>

const errorMessage = ref('')
const state = reactive({
  email: undefined,
  password: undefined,
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  const res = await $fetch('/api/auth/login', {
    ignoreResponseError: true,
    method: 'POST',
    body: event.data,
    redirect: 'manual',
  })
  if (res.success)
    await navigateTo('/app')
  else
    errorMessage.value = res.message
}
</script>

<template>
  <h1 class="text-3xl font-medium mb-4 text-center mt-12 lg:mt-52 my-8">
    Sign in
  </h1>
  <UCard class="max-w-sm mx-auto ">
    <UButton block class="mb-4" variant="outline" color="gray" to="/auth/google" external>
      <UIcon name="i-logos-google-icon" class="h-6 w-6 m-1" /> Sign in with Google
    </UButton>
    <UDivider class="my-4" label="OR" />
    <UAlert v-if="errorMessage" :title="errorMessage" class="mb-2" variant="soft" color="orange" />
    <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
      <UFormGroup label="Email" name="email">
        <UInput v-model="state.email" />
      </UFormGroup>

      <UFormGroup label="Password" name="password">
        <UInput v-model="state.password" type="password" />
      </UFormGroup>

      <UButton type="submit">
        Submit
      </UButton>
      <p class="text-sm mt-4">
        Don't have an account? <NuxtLink to="/signup" class="text-primary">
          Sign up
        </NuxtLink>
      </p>
    </UForm>
  </UCard>
</template>
