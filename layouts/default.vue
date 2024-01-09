<template>
  <div class="min-h-screen flex flex-col">
    <MarketingNavbar />
    <div class="px-4 flex-grow">
      <slot />
    </div>

    <MarketingFooter />
  </div>
</template>
