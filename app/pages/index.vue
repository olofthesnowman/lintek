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
        <UContainer class="flex flex-col justify-center items-center gap-50">
            <section class="w-full flex  flex-col gap-8">
                <h2 class="font-bold text-center">
                    Vår verksamhet
                </h2>
                <UMarquee class="w-full" :ui="{root: '[--duration:40s]'}" pause-on-hover>
                    <img src="https://lintek.liu.se/wp-content/uploads/2024/09/LinTekhjartanRityta-5_1@2x.png" alt="Teknik" class="h-24 mx-6" />
                    <img src="https://lintek.liu.se/wp-content/uploads/2024/09/LinTekhjartanRityta-5_3@2x.png" alt="1" class="h-24 mx-6" />
                    <img src="https://lintek.liu.se/wp-content/uploads/2024/09/LinTekhjartanRityta-5_4@2x.png" alt="2" class="h-24 mx-6" />
                    <img src="https://lintek.liu.se/wp-content/uploads/2024/09/LinTekhjartanRityta-5@2x.png" alt="3" class="h-24 mx-6" />
                    <img src="https://lintek.liu.se/wp-content/uploads/2024/09/LinTekhjartanRityta-5_5@2x.png" alt="4" class="h-24 mx-6" />
                    <img src="https://lintek.liu.se/wp-content/uploads/2024/09/LinTekhjartanRityta-5_3@2x-1.png" alt="5" class="h-24 mx-6" />
                </UMarquee>
            </section>
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