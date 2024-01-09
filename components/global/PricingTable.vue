<script setup lang="ts">
const isMonthly = ref(true)
const slug = useRoute().params.slug ?? ''
const { data: products } = await useFetch('/api/pricing')
const tabs = [
  { key: 'month', label: 'Monthly', default: true },
  { key: 'year', label: 'Yearly' },
]
const formatPrice = (price: number) => new Intl.NumberFormat().format(price / 100)
const checkoutUrl = (code: string) => `/stripe/checkout?slug=${slug}&plan=${code}&period=${isMonthly.value ? 'month' : 'year'}`

function onPeriodChange(index: number) {
  isMonthly.value = index === 0
}
</script>

<template>
  <div class="max-w-screen-lg mx-auto">
    <UTabs :items="tabs" class="max-w-sm mx-auto mb-8" @change="onPeriodChange" />
    <div class="grid lg:grid-cols-3 gap-8">
      <UCard v-for="product in products" :key="product.id" class="flex-grow max-w-sm text-center">
        <h3 class="text-3xl font-semibold mb-4">
          {{ product.name }}
        </h3>
        <p class="text-5xl font-medium text-primary">
          ${{ isMonthly ? formatPrice(product.monthlyPrice) : formatPrice(product.yearlyPrice) }}
        </p>
        <p class=" mt-2">
          {{ isMonthly ? 'per month' : 'per year' }}
        </p>
        <div class="text-start my-4">
          <span class="font-semibold">Features</span>
          <ul class=" ">
            <li v-for="feature in product.features" :key="feature" class="my-1 flex items-center gap-1">
              <UIcon name="i-solar-check-circle-bold-duotone" class="h-4 w-4" />  {{ feature }}
            </li>
          </ul>
        </div>
        <UButton class="mt-8" block size="lg" :to="checkoutUrl(product.code)" external>
          Subscribe
        </UButton>
      </UCard>
    </div>
  </div>
</template>
