<script setup lang="ts">
const footerNavs = [
  {
    href: '/',
    name: 'Home',
  },

  {
    href: '/login',
    name: 'Login',
  },
]
</script>

<template>
  <UDivider class="mt-24 mb-8" />
  <footer class="px-4 py-5 max-w-screen-xl mx-auto">
    <div class="max-w-lg sm:mx-auto sm:text-center">
      <div class="flex justify-center">
        <Brand />
      </div>

      <p class="leading-relaxed mt-2 text-[15px]">
        The starter you've been longing for!
      </p>
    </div>
    <ul class="items-center justify-center mt-8 space-y-5 sm:flex sm:space-x-4 sm:space-y-0">
      <li v-for="item in footerNavs" :key="item.name" class="">
        <NuxtLink :to="item.href">
          {{ item.name }}
        </NuxtLink>
      </li>
    </ul>
    <div class="mt-8 items-center justify-between sm:flex gap-8">
      <div class="mt-4 sm:mt-0">
        &copy; {{ new Date().getFullYear() }} UseNuxt
      </div>
      <div class="mt-6 sm:mt-0">
        <ul class="flex items-center space-x-8">
          <li>
            <NuxtLink external href="https://github.com/samkanje/usenuxt-free">
              <UIcon name="i-devicon-github" class="h-6 w-6 grayscale hover:grayscale-0 dark:invert dark:opacity-60" />
            </NuxtLink>
          </li>
          <li>
            <NuxtLink external href="https://discord.gg/bKCjzVPZYM">
              <UIcon name="i-logos-discord-icon" class="h-6 w-6 grayscale hover:grayscale-0" />
            </NuxtLink>
          </li>
          <li>
            <NuxtLink external href="https://twitter.com/in/kanje">
              <UIcon name="i-devicon-twitter" class="h-6 w-6 grayscale hover:grayscale-0 dark:invert dark:opacity-60" />
            </NuxtLink>
          </li>
          <li>
            <NuxtLink external href="https://www.linkedin.com/in/samkanje">
              <UIcon name="i-logos-linkedin-icon" class="h-6 w-6 grayscale hover:grayscale-0" />
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>
