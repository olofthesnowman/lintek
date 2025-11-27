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
                <UNavigationMenu :items="computedMenuItems" color="neutral" variant="link" />
            </nav>
            <div class="flex items-center justify-self-end">
                <!-- Assuming useLanguage() returns an object with 'locale' and 'toggleLocale' -->
                <UButton variant="link" @click="locale.toggleLocale" icon="i-lucide-languages" color="neutral">
                    {{ locale.locale }}
                </UButton>
                <UColorModeButton variant="link" />
            </div>
        </UContainer>
      </nav>
</template>

<script setup>
import { computed, ref, watch } from 'vue';

// Use the composable you created earlier
const locale = useLanguage(); // assuming you renamed useLanguage to useLocale

const { $directus, $readItems } = useNuxtApp();

// 1. Fetch the data globally using useAsyncData
const { data: globalData } = await useAsyncData('global-data', async () => {
  return $directus.request(
    $readItems('global', {
      // Fetch all translations so we have them client-side
      fields: [{ translations: ['*'] }],
      limit: 1,
    })
  );
});

// 2. Create a COMPUTED property that REACTIVELY filters the data based on locale.
const computedMenuItems = computed(() => {
  // Ensure we have data before trying to filter
  if (!globalData.value || !globalData.value.translations) {
    return [];
  }

  // Find the matching translation using the reactive locale value
  const localizedData = globalData.value.translations.find(
    item => item.languages_code === locale.locale.value // Access locale as a .value since it's a ref
  );

  if (localizedData && localizedData.navigation_menu) {
    // Parse the JSON string if it exists
    try {
        return JSON.parse(localizedData.navigation_menu);
    } catch (e) {
        console.error("Error parsing navigation menu JSON:", e);
        return [];
    }
  }

  return [];
});

// We don't need items.value = ... because we use computedMenuItems directly in the template.
</script>