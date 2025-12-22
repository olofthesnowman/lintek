<template>
    <UMain class="flex flex-col justify-center items-center w-full gap-10">
        <section class="w-full bg-black min-h-200">
            <UContainer class="dark">
                  <UPageHero
                        :headline="localizedHero.headline"
                        :title="localizedHero.title"
                        :description="localizedHero.description"
                        :links="localizedHero.cta"
                        orientation="horizontal"
                        color-mode="dark"
                    >
                    <img
                        :src="`${directusURL}/assets/${localizedHero.cover}`"
                        alt="App screenshot"
                        class="ml-auto"
                    />
                 </UPageHero>
            </UContainer>    
        </section>
        <UContainer>
            <UPageSection v-for="(block, index) in page?.blocks" :key="`block-${block.id || index}`" :class="index === 0 ? 'no-margin' : ''">
                    <!-- Dynamic component -->
                    <component
                            v-if ="block.collection == 'block_marquee'"
                            :is="getComponent(block.collection)"
                            :items="block.item.items"
                    />
                    <component
                            v-if ="block.collection == 'block_rich_content'"
                            :is="getComponent(block.collection)"
                            :content="block.item.translations.find((t: { languages_code: any; }) => t.languages_code === locale)?.content"
                    />
            </UPageSection>
            <ArticleGroup />
              <UPageSection
                    title="Beautiful Vue UI components"
                    description="Nuxt UI provides a comprehensive suite of components and utilities to help you build beautiful and accessible web applications with Vue and Nuxt."
                    icon="i-lucide-rocket"
                    orientation="horizontal"
                >
                    <img
                    src="https://picsum.photos/704/1294"
                    width="352"
                    height="400"
                    alt="Illustration"
                    class="w-full aspect-[4/3] rounded-lg"
                />
            </UPageSection>
            <UPageSection
                    title="Beautiful Vue UI components"
                    description="Nuxt UI provides a comprehensive suite of components and utilities to help you build beautiful and accessible web applications with Vue and Nuxt."
                    icon="i-lucide-rocket"
                    orientation="horizontal"
                    reverse
            >
                <img
                    src="https://picsum.photos/704/1294"
                    width="352"
                    height="200"
                    alt="Illustration"
                    class="w-full aspect-[4/3] rounded-xl"
                />
            </UPageSection>
            <UPageSection>
                    <UPageCTA
                        title="Bli en medlem!"
                        description="Gå med i LinTek idag och dra nytta av alla förmåner som erbjuds våra medlemmar."
                        :links="[
                            { label: 'Get Started', to: '/docs/getting-started/introduction', variant: 'solid' },
                            { label: 'Contact Sales', to: '/contact', variant: 'outline' }
                        ]"
                        variant="soft"
                    >
                </UPageCTA>
            </UPageSection>
        </UContainer>
        <pre class="bg-muted p-5 rounded hidden">{{ page }}</pre>
    </UMain>
</template>

<style scoped>
.no-margin > *:first-child {
  margin-top: 1rem !important;
  padding-top: 1rem !important;
}
</style>

<script setup lang="ts">

// Use the composable to fetch page data
const { locale } = useLanguage();
const { $directus, $readItems } = useNuxtApp();

const directusURL = useRuntimeConfig().public.directusUrl;

// Use useAsyncData to prevent component re-execution on locale changes
const { data: page } = await useAsyncData('homepage', () => {
    // try singletons API (Directus v10+ SDK)
    return $directus.request($readItems('homepage', { 
        limit: 1,
        fields: [
            '*', 
            'hero.*',
            'blocks.*',
            'blocks.*.items.item.*',
        ]
    }))
})

const localizedHero = computed(() => {
    if (!page.value) { console.log('No page data available'); return null; }
    const translations = page.value.hero || [];
    const translation = translations.find(t => t.languages_code === locale.value);
    return translation || page.value.hero[0];
});

// Helper function to dynamically load components
const getComponent = (collection: string) => {
    const components: Record<string, any> = {
        'block_marquee': defineAsyncComponent(() => import('~/components/block_marquee.vue')),
        'block_cardgroup': defineAsyncComponent(() => import('~/components/block_cardgroup.vue')),
        'block_rich_content': defineAsyncComponent(() => import('~/components/block_richcontent.vue')),
        // Add more components as needed
    }
    
    return components[collection] || 'div'
}
</script>