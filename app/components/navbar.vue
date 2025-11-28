<template>
    <nav class="w-full px-6 py-4 sticky top-0 bg-lintekblack-900 text-neutral-50 z-999999">
        <UContainer class="grid grid-cols-3">
            <div class="flex items-center justify-self-start">
                <NuxtLink to="/">
                    <img src="/LinTekLogo-darkmode.png" alt="LinTek" class="h-8" />
                </NuxtLink>
            </div>
            <!-- Use the computed property directly in the template -->
            <nav class="flex justify-center w-full">
                <UNavigationMenu :items="menuItems" color="primary" variant="link" />
            </nav>
            <div class="flex items-center justify-self-end dark">
              <UButton
                  color="neutral"
                  variant="ghost"
                  icon="i-lucide-search"
                  @click="openSearch = true"
                />
                <UButton 
                  variant="ghost" 
                  @click="toggleLocale" 
                  icon="i-lucide-languages" 
                  color="neutral" 
                />
                <UColorModeButton 
                  variant="ghost" 
                />
            </div>
        </UContainer>
          <UModal v-model:open="openSearch" size="lg" :closeable="true">
          <template #content>
            <UCommandPalette close :groups="[{ id: 'users', items: users }]" @update:open="openSearch = $event" placeholder="Sök på lintek!" />
          </template>
  </UModal>
      </nav>
</template>

<script setup>
const { locale, toggleLocale } = useLanguage();

const menuItems = (await useGlobalNavigation()).navbarItems;

const openSearch = ref(false);
const content = {
  "se-SV": {
    search: "Sök i LinTek",
  },
  "en-US": {
    search: "Search in LinTek",
  }
}

</script>