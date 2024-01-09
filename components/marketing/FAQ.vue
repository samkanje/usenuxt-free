<script setup lang="ts">
const selectedFaq = ref(-1)
function toggleFaq(index: number) {
  selectedFaq.value = index === selectedFaq.value ? -1 : index
}
const faqs = [
  {
    q: 'What do I get with this?',
    a: 'The Nuxt starter with all the code you need to run an online business. A Stripe payment system, a PostgreSQL database schema in Drizzle ORM, Lucia Auth login, UI components etc. All code is in Typescript.',
  },
  {
    q: 'Is it easy to setup?',
    a: 'Yes. Clone the repo and add your environment variables and you are ready to start building your own features.',
  },
  {
    q: 'I can build it myself, why should I use UseNuxt?',
    a: 'True. How much time are you going to spend researching and building all the features that do not differentiate your product and how much is that time worth to you? While you do so, your competitors are busy launching and selling.',
  },
  {
    q: 'I have other questions!',
    a: 'Sure. Contact me at sam@usenuxt.com',
  },
]
</script>

<template>
  <div>
    <section class="leading-relaxed max-w-screen-xl mt-12 mx-auto px-4 md:px-8">
      <div class="space-y-3 text-center">
        <h1 class="text-3xl font-semibold">
          Frequently Asked Questions
        </h1>
        <p class="max-w-lg mx-auto text-lg">
          Feel free to reach out if your question is not answered here.
        </p>
      </div>
      <div class="mt-14 max-w-2xl mx-auto">
        <div
          v-for="(item, index) in faqs"
          :key="index"
          class="space-y-3 mt-5 overflow-hidden border-b"
          @click="toggleFaq(index)"
        >
          <h4 class="cursor-pointer pb-5 flex items-center justify-between text-lg font-medium">
            {{ item.q }}
            <svg
              v-if="selectedFaq === index"
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 ml-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M20 12H4"
              />
            </svg>
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 ml-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
          </h4>
          <div v-show="selectedFaq === index">
            <div>
              <p class=" pb-4">
                {{ item.a }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
