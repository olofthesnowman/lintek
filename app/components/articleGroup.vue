<template>
    <UContainer class="flex flex-col gap-6 pt-10 pb-20 min-h-screen">
        <h1 class="text-5xl">{{ title }}</h1>
        <div v-if="!articles">Loading articles...</div>        
        <UBlogPosts>
            <UBlogPost
            v-for="(article, index) in articles"
            :key="index"
            v-bind="article"
            :to="`/artiklar/${article.slug}`"
            />
        </UBlogPosts>
    </UContainer>
</template>

<script setup>
const { locale } = useLanguage();
const title = computed(() =>  { return locale.value === 'sv-SE' ? 'Artiklar' : 'Articles'; });

const { getArticleListLocalized } = useArticle();
const articles = ref(getArticleListLocalized(3));
</script>