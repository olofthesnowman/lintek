<script setup lang="ts">
const route = useRoute()
const { $directus, $readItems } = useNuxtApp()

// Get slug parameter
const slugParam = Array.isArray(route.params.slug) ? route.params.slug[0] : route.params.slug;

if (!slugParam) {
    throw createError({
        statusCode: 400,
        statusMessage: "No slug parameter found"
    })
}

// Use the composable to fetch page data
const { locale } = useLanguage();

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
            'blocks.*.translations.*',
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
        // Add more components as needed
    }
    
    return components[collection] || 'div'
}

</script>

<template>
    <section class="border-b border-muted border-xl py-4 mb-8">
        <UContainer class="relative">
            <h1 class="text-5xl font-semibold">
                {{ page[0]?.translations?.find((t: { languages_code: any; }) => t.languages_code === locale)?.title }}
            </h1>
            <img
                src="https://lintek.liu.se/wp-content/uploads/2024/09/LinTekhjartanRityta-5_1@2x.png"
                alt="Banner Image"
                class="w-25 rounded-lg mt-4 absolute right-0 top-0 -translate-x-1/3"
            />
        </UContainer>
    </section>
    <UContainer>
    <UPage>
        <!--<UPageHeader
            :title="page[0]?.translations?.find((t: { languages_code: any; }) => t.languages_code === locale)?.title"
        />-->
        <UPageBody>
            <div v-for="(block, index) in page[0]?.blocks" :key="`block-${block.id || index}`" class="my-8">
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
            </div>
        </UPageBody>
    </UPage>
    </UContainer>
</template>