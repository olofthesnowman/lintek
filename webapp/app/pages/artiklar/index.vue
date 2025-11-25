<template>
    <UContainer class="flex flex-col gap-6 pt-10 pb-20 min-h-screen">
        <h1 class="text-5xl">{{ title }}</h1>

        <div v-if="!articles">Loading articles...</div>
        <div v-else-if="localizedArticles.length === 0">No articles available in the current language ({{ locale.locale }}).</div>
        
  <UBlogPosts>
    <UBlogPost
      v-for="(article, index) in localizedArticles"
      :key="index"
      v-bind="article"
      :to="`/artiklar/${article.slug}`"
    />
  </UBlogPosts>
    </UContainer>
</template>

<script setup>

const config = useRuntimeConfig();

// (The <script setup> block remains the same as you provided)

const locale = useLanguage();
const title = computed(() =>  { return locale.locale.value === 'sv-SE' ? 'Artiklar' : 'Articles'; });


const { $directus, $readItems, $readUsers } = useNuxtApp()

const { data: articles } = await useAsyncData('articles', () => {
    return $directus.request(
        $readItems('articles', {
            fields: ['slug', 'date_created', 'user_created', 'user_updated', 'image', { translations: ['languages_code', 'title', 'description'] }],
        })
    )
})

// A reactive reference to hold the final, processed, and localized data
const localizedArticles = ref([]);

// Your existing utility function remains async
const getAuthors = async(userIds) => {

    // Note: If userIds might be null/undefined, add a check here.
    if (!userIds) return [];

    // Deduplicate user IDs to avoid redundant requests
    userIds = [...new Set(userIds)];

    console.log("Fetching authors for IDs:", userIds);
    
    // Filter out null/undefined user IDs before the request
    const validUserIds = userIds.filter(Boolean); 

    // For all valid user IDs, fetch user data
    const raw_authors = await $directus.request(
        $readUsers({
            // Filter where the primary key ('id') is one of the validUserIds
            // When $readUsers is used, the filter applies to the 'directus_users' collection.
            filter: {
                id: {
                    _in: validUserIds
                }
            },
            // Request the necessary fields for the profile
            fields: ['first_name', 'last_name', 'avatar'], 
        })
    );

    // Map over the authors so they match Nuxt UI User type
    const authors = raw_authors.map((author) => ({
        name: `${author.first_name} ${author.last_name}`,
        avatar: author.avatar ? {
            // Assuming Directus stores path in filename_disk or similar
            src: author.avatar.filename_disk, 
            alt: `${author.first_name} ${author.last_name}`,
        } : null,
    }));
    return authors;
};


// Use watchEffect to automatically re-run the async logic when 'articles' or 'locale' changes
watchEffect(async () => {
    // Ensure articles.value is available before proceeding
    if (!articles.value || articles.value.length === 0) {
        localizedArticles.value = [];
        return;
    }

    // 1. Process all articles and return an array of Promises
    const processingPromises = articles.value.map(async article => {
        const localizedTranslation = article.translations.find(
            // Use .locale since it's a proxy object
            t => t.languages_code === locale.locale.value
        );
        
        // 2. Await the asynchronous author fetching for THIS article
        const authorsData = await getAuthors([article.user_created, article.user_updated]);

        // 3. Return the fully formed, localized object
        return {
            slug: article.slug,
            image: `${config.public.directusUrl}/assets/${article.image}`,
            date_created: article.date_created,
            title: localizedTranslation?.title || 'No title available',
            description: localizedTranslation?.description || 'No description available',
            date: article.date_created,
            authors: authorsData, // Now an array of User objects
        };
    });

    // 4. Wait for ALL article processing (including author fetching) to complete
    localizedArticles.value = await Promise.all(processingPromises);
});
</script>