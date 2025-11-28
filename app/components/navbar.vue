<template>
    <nav class="w-full px-6 py-4 sticky flex top-0 bg-lintekblack-900 text-neutral-50 z-999999">
        <UContainer class="grid grid-cols-3">
            <div class="flex items-center justify-self-start">
                <NuxtLink to="/">
                    <img src="/LinTekLogo-darkmode.png" alt="LinTek" class="h-8" />
                </NuxtLink>
            </div>
            <!-- Use the computed property directly in the template -->
            <nav class="hidden lg:flex justify-center w-full">
                <UNavigationMenu :items="menuItems" color="primary" variant="link" :ui="navbarUI" />
            </nav>
            <div class="hidden lg:flex items-center justify-self-end">
              <UButton
                  color="neutral"
                  variant="ghost"
                  icon="i-lucide-search"
                  @click="openSearch = true"
                  class="dark"
                />
                <UButton 
                  variant="ghost" 
                  @click="toggleLocale" 
                  icon="i-lucide-languages" 
                  color="neutral" 
                  class="dark"
                />
                <UColorModeButton 
                  variant="ghost"
                  class="text-neutral-300 hover:bg-neutral-800 active:bg-neutral-800 transition-colors" 
                />
            </div>
        </UContainer>
        <UButton
              class="lg:hidden justify-self-end dark"
              color="neutral"
              variant="ghost"
              icon="i-lucide-menu"
              @click="openHamburger = true"
        />
    </nav>
    
    <UDrawer direction="right" inset v-model:open="openHamburger" class="w-full" >
      <template #content>
        <nav class="flex flex-col gap-6 mt-12 mb-6 mr-5 w-full">
          <div class="bg-black rounded-xl flex flex-row place-content-between gap-4 p-5">
            <img src="/LinTekLogo-darkmode.png" alt="LinTek" class="h-8 w-fit text-center" />
            <img src="/linus_utanbg.png" alt="LinTek" class="h-8 w-fit text-center" />
          </div>
                    <!-- Use the computed property directly in the template -->
            <UNavigationMenu :items="menuItems" color="primary" variant="link" orientation="vertical" type="multiple" />
            <USeparator class="my-2" />
            <div class="flex flex-col gap-2">
              <UButton
                  color="neutral"
                  variant="soft"
                  icon="i-lucide-search"
                  :block="true"
                  @click="openSearch = true"
                />
                <UButton 
                  variant="soft" 
                  @click="toggleLocale" 
                  icon="i-lucide-languages" 
                  color="neutral"
                  :block="true"
                />
                <UColorModeButton 
                  variant="soft"
                  :block="true"
                  class="text-center"
                />
            </div>
        </nav>
      </template>
    </UDrawer>

    <UModal v-model:open="openSearch" size="lg" :closeable="true">
            <template #content>
              <UCommandPalette close :groups="[{ id: 'users', items: users }]" @update:open="openSearch = $event" placeholder="Sök på lintek!" />
            </template>
    </UModal>
</template>

<script setup>

const { locale, toggleLocale } = useLanguage();

const menuItems = (await useGlobalNavigation()).navbarItems;

const openSearch = ref(false);
const openHamburger = ref(false);

const content = {
  "se-SV": {
    search: "Sök i LinTek",
  },
  "en-US": {
    search: "Search in LinTek",
  }
}

const navbarUI = {
      link: 'text-neutral-400 hover:text-white data-[state=open]:text-white transition-colors',
};

</script>