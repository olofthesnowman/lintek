<template>
    <div class="bg-black absolute top-0 left-0 right-0 h-20"></div>
    <nav class="w-full px-6 py-4 sticky flex top-0 bg-black/90 backdrop-blur text-neutral-50 z-999999">
        <UContainer class="grid grid-cols-3">
            <div class="flex items-center justify-self-start">
                <NuxtLink to="/">
                    <img src="/LinTekLogo-darkmode.png" alt="LinTek" class="h-8 w-min-[100%]" />
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
                  aria-label="search"
                />
                <UButton 
                  variant="ghost" 
                  @click="toggleLocale" 
                  icon="i-lucide-languages" 
                  color="neutral" 
                  class="dark"
                  aria-label="language toggle"
                  :label="locale"
                />
                <UColorModeButton 
                  variant="ghost"
                  class="text-neutral-300 hover:bg-neutral-800 active:bg-neutral-800 transition-colors"
                />
            </div>
        </UContainer>
        <div class="flex lg:hidden items-center justify-self-end">
              <UButton
                  color="neutral"
                  variant="ghost"
                  icon="i-lucide-search"
                  @click="openSearch = true"
                  class="dark"
                  aria-label="search"
                />
                <UButton 
                  variant="ghost" 
                  @click="toggleLocale" 
                  icon="i-lucide-languages" 
                  color="neutral" 
                  class="dark"
                  aria-label="language toggle"
                  :label="locale"
                />
                <UColorModeButton 
                  variant="ghost"
                  class="text-neutral-300 hover:bg-neutral-800 active:bg-neutral-800 transition-colors"
                />
            </div>
        <UButton
              class="lg:hidden justify-self-end dark"
              color="neutral"
              variant="ghost"
              icon="i-lucide-menu"
              @click="openHamburger = true"
              name="navigation"
        />
    </nav>

    <UModal v-model:open="openHamburger" class="w-full" :overlay="false" fullscreen :ui="{ header: 'bg-black' }" :transition="false" >
      <template #header>
        <div class="flex justify-between items-center w-full bg-black">
          <NuxtLink to="/">
              <img src="/LinTekLogo-darkmode.png" alt="LinTek" class="h-8 w-min-[100%]" />
          </NuxtLink>
          <div class="flex items-center justify-self-end">
              <UButton
                  color="neutral"
                  variant="ghost"
                  icon="i-lucide-search"
                  @click="openSearch = true"
                  class="dark"
                  aria-label="search"
                />
                <UButton 
                  variant="ghost" 
                  @click="toggleLocale" 
                  icon="i-lucide-languages" 
                  color="neutral" 
                  class="dark"
                  aria-label="language toggle"
                  :label="locale"
                />
                <UColorModeButton 
                  variant="ghost"
                  class="text-neutral-300 hover:bg-neutral-800 active:bg-neutral-800 transition-colors"
                />
                <UButton
                  color="neutral"
                  variant="ghost"
                  icon="i-lucide-x"
                  class="dark"
                  @click="openHamburger = false"
                  aria-label="close menu"
                />
            </div>
        </div>
      </template>
      <template #body>
        <nav class="flex flex-col gap-6 w-full">
                    <!-- Use the computed property directly in the template -->
            <UNavigationMenu :items="menuItems" color="primary" variant="link" orientation="vertical" type="multiple" />
            <USeparator class="my-2 hidden" />
            <div class="hidden flex flex-col gap-2">
              <UButton
                  color="neutral"
                  variant="soft"
                  icon="i-lucide-search"
                  :block="true"
                  @click="openSearch = true"
                  aria-label="search"
                />
                <UButton 
                  variant="soft" 
                  @click="toggleLocale" 
                  icon="i-lucide-languages" 
                  color="neutral"
                  :block="true"
                  aria-label="language toggle"
                  :label="locale"

                />
                <UColorModeButton 
                  variant="soft"
                  :block="true"
                  class="text-center"
                />
            </div>
        </nav>
      </template>
    </UModal>

    <UModal v-model:open="openSearch" size="lg" :closeable="true">
            <template #content>
              <UCommandPalette close :groups="[{ id: 'users', items: users }]" @update:open="openSearch = $event" placeholder="Sök på lintek!" />
            </template>
    </UModal>
</template>

<script setup>

const { toggleLocale, locale } = useLanguage();

const menuItems = (await useGlobalNavigation()).navbarItems;

const openSearch = ref(false);
const openHamburger = ref(false);

const content = {
  "sv": {
    search: "Sök i LinTek",
    langToggle: "Byt språk till engelska",
  },
  "en": {
    search: "Search in LinTek",
    langToggle: "Switch language to Swedish",
  }
}

const navbarUI = {
      link: 'text-neutral-400 hover:text-white data-[state=open]:text-white transition-colors',
};

</script>