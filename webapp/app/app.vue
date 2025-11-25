<template>
  <UApp>
      <Header />
      <NuxtPage />
      <GlobalFooter />
    </UApp>
</template>

<script setup>
const { $directus, $readItems, $readCollections } = useNuxtApp()

const { data: global } = await useAsyncData('global', () => {
  return $directus.request($readItems('global'))
})


console.log($directus)
console.log(global)
useSeoMeta({
  title: global.value?.title || 'Lintek',
  description: global.value?.description || 'Linköpings studentteknologers studentkår!',
})
</script>