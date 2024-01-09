<script setup lang="ts">
const features = [
  {
    icon: 'i-tabler-shield-check',
    title: 'Authentication',
    desc: 'Includes password and social login flows for user convenience. Easily add more providers through Lucia Auth.',
  },
  {
    icon: 'i-tabler-credit-card',
    title: 'Payments',
    desc: 'Stripe subscriptions and payments integration from day one. Users can manage subscriptions in the billing portal.',
  },
  {
    icon: 'i-tabler-database-star',
    title: 'Own the data',
    desc: 'Built with the most reliable and scalable database, Postgres. Use of Drizzle ORM makes it easy to use with any provider e.g. Supabase, AWS RDS...',
  },
  {
    icon: 'i-tabler-users-group',
    title: 'Enterprise ready',
    desc: 'Users can create teams and projects, and invite members.',
  },
  {
    icon: 'i-tabler-palette',
    title: 'Elegant Design',
    desc: 'Craft beautiful sites with NuxtUI and Headless UI components. Built with TailwindCSS and mobile first.',
  },
  {
    icon: 'i-tabler-stars',
    title: 'Flexible',
    desc: 'You own the code. Modify it to your heart\'s content thanks to the modularized architecture.',
  },
]
</script>

<template>
  <section class="py-14">
    <div class="max-w-screen-xl mx-auto px-4 text-center md:px-8">
      <div class="max-w-2xl mx-auto">
        <h3 class=" text-3xl font-semibold sm:text-4xl">
          The fastest way to launch a product
        </h3>
        <p class="mt-3">
          Batteries included. All the features you need to start getting paid today!
        </p>
      </div>
      <div class="mt-12">
        <ul class="grid gap-y-8 gap-x-12 sm:grid-cols-2 lg:grid-cols-3">
          <li v-for="(item, index) in features" :key="index" class="space-y-3">
            <div class="w-12 h-12 mx-auto bg-primary/10 text-primary-600 rounded-full flex items-center justify-center">
              <UIcon :name="item.icon" class="h-6 w-6 text-primary" />
            </div>
            <h4 class="text-lg  font-semibold">
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
