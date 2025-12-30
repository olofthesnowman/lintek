<template>
  <UMain class="mb-25">
    <article class="mb-20">
    <div v-if="article">
        <section class="w-full bg-black overflow-hidden pb-0">
            <UContainer class="pt-12 flex flex-col relative dark">
                <h1 class="text-5xl leading-14 font-bold text-highlighted">{{ article.title }}</h1>
                <p class="text-muted text-base/8"> {{ contentText[locale].published }} {{ article.published }}</p> 
            </UContainer>
            <UContainer class="relative">
              <div class="absolute -bottom-1/4 left-1/2 -translate-x-1/2 bg-default content-[''] z-0 h-1/2 w-[110vw]"></div>
            <img
                    v-if="article.image"
                    :src="`${config.public.directusUrl}/assets/${article.image}`"
                    alt="Article Image"
                    class="my-6 rounded-lg w-full aspect-video object-cover relative transform max-h-180"
                    object-fit="cover"
            />
          </UContainer>
        </section>
        <UContainer class="grid grid-cols-3 gap-4">
          <div class="prose dark:prose-invert max-w-[80ch] col-span-3 md:col-span-2" v-html="article.content"></div>
          <div class="col-span-3 md:col-span-1">
            <USeparator class="my-4 md:hidden" />
            <p class="text-muted mb-4">{{ contentText[locale].tags }}</p>
            <div class="flex gap-4 flex-wrap">
              <UBadge v-for="tag in article.tags" :key="tag" :label="tag" size="lg" color="neutral" />
            </div>
            <p class="mt-4 text-muted">{{ contentText[locale].authors }}</p>
            <div class="flex flex-col gap-4 mt-2">
              <UUser
                v-for="(author, index) in article.authors"
                :key="index"
                :name="author.name"
                :description="author.description"
                :avatar="author.avatar"
              />
            </div>
          </div>
        </UContainer>
    </div>
    </article>
  </UMain>
</template>

<script setup>

// Use the existing locale composable
const locale = useLanguage().fullLocale; 
//const { $directus, $readItems } = useNuxtApp();
const route = useRoute();

const config = useRuntimeConfig();

const { getArticleBySlugLocalized } = useArticle();
const article = await getArticleBySlugLocalized(route.params.slug);

const contentText = {
  'sv-SE': {
    tags: 'Taggar',
    published: 'Publicerad',
    authors: 'Skribenter'
  },
  'en-US': {
    tags: 'Tags',
    published: 'Published',
    authors: 'Writers'
  }
}

</script>

<style scoped>

</style>