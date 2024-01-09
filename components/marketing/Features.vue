<script setup lang="ts">
const features = [
  {
    icon: 'i-tabler-brand-speedtest',
    title: 'Fast Refresh',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec congue, nisl eget molestie varius, enim ex faucibus purus.',
  },
  {
    icon: 'i-tabler-brand-google-analytics',
    title: 'Analytics',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec congue, nisl eget molestie varius, enim ex faucibus purus.',
  },
  {
    icon: 'i-tabler-lock',
    title: 'Datacenter security',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec congue, nisl eget molestie varius, enim ex faucibus purus.',
  },
  {
    icon: 'i-tabler-stack-2',
    title: 'Build on your terms',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec congue, nisl eget molestie varius, enim ex faucibus purus.',
  },
  {
    icon: 'i-tabler-shield-check',
    title: 'Safe to use',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec congue, nisl eget molestie varius, enim ex faucibus purus.',
  },
  {
    icon: 'i-tabler-stars',
    title: 'Flexible',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec congue, nisl eget molestie varius, enim ex faucibus purus.',
  },
]
</script>

<template>
  <section class="py-14">
    <div class="max-w-screen-xl mx-auto px-4 text-center text-gray-600 md:px-8">
      <div class="max-w-2xl mx-auto">
        <h3 class="text-gray-800 text-3xl font-semibold sm:text-4xl">
          The fastest way to launch a product
        </h3>
        <p class="mt-3">
          Batteries included. All the features you need to start getting paid today!
        </p>
      </div>
      <div class="mt-12">
        <ul class="grid gap-y-8 gap-x-12 sm:grid-cols-2 lg:grid-cols-3">
          <li v-for="(item, index) in features" :key="index" class="space-y-3">
            <div class="w-12 h-12 mx-auto bg-primary-50 text-primary-600 rounded-full flex items-center justify-center">
              <UIcon :name="item.icon" class="h-6 w-6 text-primary" />
            </div>
            <h4 class="text-lg text-gray-800 font-semibold">
              {{ item.title }}
            </h4>
            <p>
              {{ item.desc }}
            </p>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
