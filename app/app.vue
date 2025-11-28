<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>

<script setup>
const { $directus, $readItems } = useNuxtApp()

const { data: global } = await useAsyncData('global', () => {
  return $directus.request($readItems('global'))
})

useSeoMeta({
  title: global.value?.title || 'Lintek',
  description: global.value?.description || 'Linköpings studentteknologers studentkår!',
})
</script>