<template>
  <UMain>
    <article>
    <div v-if="article">
        <section class="w-full bg-black">
            <UContainer class="pt-12 flex flex-col relative">
                <h1 class="text-5xl font-bold text-white">{{ article.title }}</h1>
                <p class="text-muted"> Publicerad {{ article.formattedDate }}</p> 
            </UContainer>
            <UContainer class="relative">
              <div class="absolute bottom-0 left-1/2 -translate-x-1/2 bg-default content-[''] z-0 h-1/3 w-screen"></div>
            <img
                    v-if="article.image"
                    :src="`${config.public.directusUrl}/assets/${article.image}`"
                    alt="Article Image"
                    class="my-6 rounded-lg w-full aspect-video object-cover relative transform max-h-180"
                    object-fit="cover"
            />
          </UContainer>
        </section>
        <UContainer>
          <div class="prose max-w-[80ch] mt-8" v-html="article.content"></div>
        </UContainer>
    </div>
    <div v-else-if="article === null && rawArticle.status === 'success'">
        <UContainer class="py-12 text-center">
            <h1 class="text-3xl font-semibold">Article Not Found</h1>
            <p class="text-gray-500 mt-2">The article with slug '{{ route.params.slug }}' could not be located.</p>
        </UContainer>
    </div>
    <div v-else>
        <section class="w-full bg-black">
            <UContainer class="py-12">
                <USkeleton class="w-3/4 h-12 mb-3 bg-gray-700" /> 
                <USkeleton class="w-1/4 h-5 mb-6 bg-gray-700" /> 
                <USkeleton class="my-6 rounded-lg" width="800" height="400" />
            </UContainer>
        </section>
        <UContainer class="mt-8">
            <USkeleton class="w-1/2 h-10 mb-4" />
            <USkeleton class="w-full h-4 mb-2" />
            <USkeleton class="w-full h-4 mb-2" />
            <USkeleton class="w-3/4 h-4" />
        </UContainer>
    </div>
    </article>
  </UMain>
</template>

<script setup>
import { computed } from 'vue';

// Use the existing locale composable
const locale = useLanguage(); 
const { $directus, $readItems } = useNuxtApp();
const route = useRoute();

const config = useRuntimeConfig();


// --- Author Fetching (Simplified) ---
// You will need this for the full solution, including it here for completeness
const getAuthors = async(userIds) => {
    const { $directus, $readUsers } = useNuxtApp(); 
    const validUserIds = [...new Set(userIds)].filter(Boolean);
    if (validUserIds.length === 0) return [];

    const raw_authors = await $directus.request(
        $readUsers({
            filter: { id: { _in: validUserIds } },
            fields: ['first_name', 'last_name', 'avatar'], 
        })
    );
    return raw_authors.map((author) => ({
        name: `${author.first_name} ${author.last_name}`,
        // ... avatar mapping
    }));
};
// ------------------------------------

const { data: rawArticle } = await useAsyncData('article-by-slug', async () => {
    if (!route.params.slug) return null; // Safety check

    const response = await $directus.request(
        $readItems('articles', {
            filter: {
                slug: { _eq: route.params.slug } 
            },
            limit: 1, 
            // Fetch necessary relational fields (translations, user_created)
            fields: ['date_created', 'image', 'user_created', 'user_updated', { translations: ['languages_code', 'title', 'description', 'content'] }] 
        })
    );
    
    return response.length > 0 ? response[0] : null;
});

// 3. Process the raw article data for localization and authors
const article = computed(() => {
    const art = rawArticle.value;
    if (!art) return null;

    // Localize the translation
    const localizedTranslation = art.translations?.find(
        t => t.languages_code === locale.locale.value
    );

    // Get authors asynchronously (use a different method if you need reactivity, but this is simple)
    // For a detail page, we can handle the authors separately or ensure they are fetched with the article.
    // NOTE: Directus does not return full user profiles by default, so we run the helper:
    // This is simplified, for proper rendering, you may need to use a separate useFetch for authors.
    
    return {
        // Core fields
        ...art,
        // Localized fields
        title: localizedTranslation?.title || 'No title available',
        description: localizedTranslation?.description || 'No description available',
        content: localizedTranslation?.content || 'No content available',
        
        // Formatted Date
        formattedDate: new Date(art.date_created).toLocaleDateString(locale.locale, {
            year: 'numeric', month: 'long', day: 'numeric'
        }),
        // Authors (You need a separate useFetch or a watcher to reliably get this data)
        // For simplicity, we skip the author fetch here and focus on the main error.
    };
});
</script>

<style scoped>

</style>