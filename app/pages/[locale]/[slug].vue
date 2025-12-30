<script setup lang="ts">
const route = useRoute()
const { $directus, $readItems } = useNuxtApp()
const directusURL = useRuntimeConfig().public.directusUrl;

// Get slug parameter
const slugParam = Array.isArray(route.params.slug) ? route.params.slug[0] : route.params.slug;

if (!slugParam) {
    throw createError({
        statusCode: 400,
        statusMessage: "No slug parameter found"
    })
}

// Use the composable to fetch page data
const { fullLocale } = useLanguage();

// Use useAsyncData to prevent component re-execution on locale changes
const { data: page } = await useAsyncData(`page-${slugParam}`, async () => {
    return await $directus.request($readItems('pages', {
        filter: {
            slug: {
                _eq: slugParam
            }
        },
        limit: 1,
        fields: [
            '*', 
            'translations.*', 
            'blocks.*', 
            'blocks.*.items.item.*',
            'blocks.*.items.item.content.*',
            'blocks.*.translations.*',
            'blocks.*.items.item.translations.*',
            'blocks.item.*',
            'blocks.translations.*'
        ]
    }))
});

if (!page.value || page.value.length === 0) {
    throw createError({
        statusCode: 404,
        statusMessage: "Page not found"
    })
}

// Helper function to dynamically load components
const getComponent = (collection: string) => {
    const components: Record<string, any> = {
        'block_marquee': defineAsyncComponent(() => import('~/components/block_marquee.vue')),
        'block_cardgroup': defineAsyncComponent(() => import('~/components/block_cardgroup.vue')),
        'block_rich_content': defineAsyncComponent(() => import('~/components/block_richcontent.vue')),
        'block_item_showcase': defineAsyncComponent(() => import('~/components/block_item_showcase.vue')),
        // Add more components as needed
    }
    
    return components[collection] || 'div'
}

// Computed style for the right-side image container: image covers the box and will be visible on the right ~25%
const imageStyle = computed(() => {
    const image = page.value?.[0]?.banner_image
    const imageUrl = image ? `${directusURL}/assets/${image}` : ''
    return {
        backgroundImage: imageUrl ? `url("${imageUrl}")` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center right',
        backgroundRepeat: 'no-repeat',
        width: '25%',
        minHeight: '160px',
        borderRadius: '0.5rem',
        overflow: 'hidden',
        position: 'absolute',
    }
})

// Safe unwrap of first page entry for template usage
const safePage = computed(() => page.value?.[0] ?? null)
</script>

<template>
     <header class="bg-black text-white dark:text-white relative min-h-62 mb-8 flex items-center">
         <UContainer class="flex justify-between items-center py-8">
             <div>
                 <span class="font-semibold text-primary">{{ safePage?.translations?.find((t: { languages_code: any; }) => t.languages_code === fullLocale)?.headline }}</span>
             <h1 class="text-6xl font-bold">
                 {{ safePage?.translations?.find((t: { languages_code: any; }) => t.languages_code === fullLocale)?.title }}
             </h1>
             </div>
            </UContainer>
            <div style="imageStyle" aria-hidden="true"></div>
     </header>
    <UContainer>
    <UPage>
        <template #left>
                <UPageAside>
                    <div>
                        Skriven av

                    </div>
                    <div>
                        <p>Publicerad</p>
                        <p>{{ new Date(safePage?.published_at).toLocaleDateString(fullLocale, { year: 'numeric', month: 'long', day: 'numeric' }) }}</p>
                    </div>
                </UPageAside>
            </template>
        <UPageBody>
            <div v-for="(block, index) in safePage?.blocks || []" :key="`block-${block.id || index}`" class="my-8">
            <!-- Dynamic component -->
                <component
                    v-if ="block.collection == 'block_marquee'"
                    :is="getComponent(block.collection)"
                    :items="block.item.items"
                    :id="block.id"
                />
                <component
                    v-if ="block.collection == 'block_rich_content'"
                    :is="getComponent(block.collection)"
                    :content="block.item.translations.find((t: { languages_code: any; }) => t.languages_code === fullLocale)?.content"
                    :id="block.id"
                />
                <component
                    v-if ="block.collection == 'block_item_showcase'"
                    :is="getComponent(block.collection)"
                    :item="block.item"
                    :id="block.id"
                />
            </div>
        </UPageBody>
        <template #right>
        </template>
    </UPage>
    </UContainer>
</template>