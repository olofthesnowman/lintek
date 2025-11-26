<template>
  <UMain>
    <article>
    <div v-if="article">
        <section class="w-full bg-black">
            <UContainer class="pt-12 flex flex-col relative">
                <h1 class="text-5xl leading-14 font-bold text-white">{{ article.title }}</h1>
                <p class="text-muted text-base/8"> {{ contentText[locale].published }} {{ article.published }}</p> 
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
        <UContainer class="grid grid-cols-3 gap-4 my-8">
          <div class="prose max-w-[80ch] col-span-2" v-html="article.content"></div>
          <div>
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
    <!--<div v-else-if="article === null && rawArticle.status === 'success'">
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
    </div>-->
    </article>
  </UMain>
</template>

<script setup>

// Use the existing locale composable
const locale = useLanguage().locale; 
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