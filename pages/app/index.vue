<script setup lang="ts">
const { data } = await useFetch('/api/me/orgs')
const defaultSlug = computed(() => data.value?.orgs.find(o => o.default)?.org.slug ?? '')
navigateTo(`/app/${defaultSlug.value}`)
</script>
