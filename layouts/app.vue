<template>
  <div class="min-h-screen flex flex-col">
    <AppNavbar />

    <div class="flex-grow w-full max-w-screen-xl mx-auto p-4 lg:flex">
      <AppSidebar />
      <div class="w-full  p-4 rounded-xl">
        <slot />
      </div>
    </div>
  </div>
</template>
