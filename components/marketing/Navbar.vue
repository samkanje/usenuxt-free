<script setup lang="ts">
const open = ref(false)
function menuOpen() {
  open.value = !open.value
}

const navigation: { title: string, to: string }[] = []
</script>

<template>
  <nav class="w-full top-0 z-20">
    <div class="items-center px-4 max-w-screen-xl mx-auto lg:flex lg:px-8">
      <div class="flex items-center justify-between py-3 lg:py-4 lg:block">
        <Brand />
        <div class="lg:hidden">
          <button
            class="outline-none p-2 rounded-md border-gray-200 dark:border-gray-800 focus:border"
            @click="menuOpen()"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor"
              :class="[open ? 'block' : 'hidden']"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
              :class="[open ? 'hidden' : 'block']" stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8h16M4 16h16" />
            </svg>
          </button>
        </div>
      </div>
      <div class="flex-1 justify-between flex-row-reverse lg:overflow-visible lg:flex lg:pb-0 lg:pr-0 lg:h-auto" :class="[open ? 'h-screen pb-20 overflow-auto pr-4' : 'hidden']">
        <div>
          <ul class="flex flex-col-reverse space-x-0 lg:space-x-6 lg:flex-row">
            <li class="mt-4 lg:mt-0">
              <AuthButton />
            </li>
          </ul>
        </div>
        <div class="flex-1">
          <ul class="justify-center items-center space-y-8 lg:flex lg:space-x-6 lg:space-y-0">
            <li v-for="link in navigation" :key="link.to" class="">
              <NuxtLink :href="link.to">
                {{ link.title }}
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>
