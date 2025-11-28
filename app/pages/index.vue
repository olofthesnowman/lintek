<template>
    <UMain class="flex flex-col justify-center items-center w-full gap-10">
        <section class="w-full bg-black min-h-200">
            <UContainer class="dark">
                  <UPageHero
                        title="Linköpings Teknologers Studentkår "
                        description="Ta del av allt som LinTek har att erbjuda – från evenemang och nyheter till resurser och stöd för studenter vid Linköpings tekniska högskola."
                        headline="Din kompis i studentlivet sedan 1971!"
                        orientation="horizontal"
                        :links="links"
                        color-mode="dark"
                    >
                        <img
                        src="/linus_utanbg.png"
                        alt="App screenshot"
                        class="ml-auto"
                        />
                 </UPageHero>
            </UContainer>    
        </section>
        <UContainer class="flex flex-col justify-center items-center gap-6">
            <ArticleGroup />
        </UContainer>
    </UMain>
</template>

<script setup>
const links = ref([
  {
    label: 'Get started',
    to: '/docs/getting-started',
    icon: 'i-lucide-square-play'
  },
  {
    label: 'Learn more',
    to: '/docs/getting-started/theme/design-system',
    color: 'neutral',
    variant: 'subtle',
    trailingIcon: 'i-lucide-arrow-right'
  }
])
</script>