<script setup lang="ts">
const { data } = await useOrgData()

const portalUrl = computed(() => `/stripe/portal?slug=${data.value?.org.slug}`)
</script>

<template>
  <h1 class="text-lg font-medium">
    Billing
  </h1>
  <UCard class="w-6/12 mt-4">
    <h2 class="font-medium mb-4">
      Current plan
    </h2>
    <div class="flex justify-between items-center">
      <div v-if="data?.subscription">
        <p>
          <span class="text-primary font-semibold text-lg">
            {{ data.subscription.name }}
          </span>
          <span class="text-xs"> / {{ data.subscription.interval }}</span>
        </p>
        <p class="mt-2">
          next billing: {{ (new Date(data.subscription.expires)).toLocaleDateString() }}
        </p>
      </div>
      <p v-else class="text-primary font-semibold">
        Free Plan
      </p>
      <UButton v-if="data?.subscription" :to="portalUrl" external>
        Manage subscription
      </UButton>
    </div>
  </UCard>
  <UCard class="mt-4">
    <h2 class="font-medium mb-4">
      Upgrade your plan
    </h2>
    <PricingTable />
  </UCard>
</template>
