<template>
    <UContainer class="flex flex-col gap-6 pt-10 pb-20">
        <h1 class="text-5xl">{{ title }}</h1>
        <div v-if="!articles">Loading articles...</div>        
        <UBlogPosts>
            <UBlogPost
                v-for="(article, index) in articles"
                :key="index"
                v-bind="article"
                :to="`${locale}/nyheter/${article.slug}`"
            />
        </UBlogPosts>
    </UContainer>
</template>

<script setup>
const { fullLocale, locale } = useLanguage();
const title = computed(() =>  { return fullLocale.value === 'sv-SE' ? 'Nyheter' : 'News'; });

const { getArticleListLocalized } = useArticle();
const articles = ref(getArticleListLocalized(3));
</script>