<script setup lang="ts">
</script>

<template>
  <header class="mb-4">
    <UContainer class="flex items-center py-4 gap-2 lg:gap-4">
      <Brand />
      <AppOrgSelector />
      <div class="flex ml-auto items-center">
        <AuthButton />
      </div>
    </UContainer>
    <UDivider />
  </header>
</template>
