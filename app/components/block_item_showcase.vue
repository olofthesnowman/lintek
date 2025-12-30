<template>
    <span :id="`${localizedShowcase?.title}`"></span>
    <UPageSection :title="localizedShowcase?.title" :description="localizedShowcase?.description" class="*:lg:px-0">
        <UPageGrid class="gap-12">
            <div v-for="(item, index) in props.item.items" :key="index" class="flex flex-col items-center text-center">
                <img
                    :src="`${directusUrl}/assets/${item.item.image}`"
                    :alt="item.alt_text || localizedShowcase?.title || 'Showcase Image'"
                    class="w-full aspect-[1/1] min-w-32 rounded-full object-cover"
                />
                <p class="font-semibold text-muted">{{ getLocalizedContent(item.item).subheader }}</p>
                <p class="text-xl text-elevated">{{ getLocalizedContent(item.item).name }}</p>
            </div>
        </UPageGrid>
    </UPageSection>
</template>

<script lang="ts" setup>
const props = defineProps<{
    item: any;
}>();

const directusUrl = useRuntimeConfig().public.directusUrl;
const { fullLocale } = useLanguage();

const localizedShowcase = computed(() => {
    if (!props.item) { console.log('No item data available'); return null; }
    const translations = props.item.translations || [];
    const translation = translations.find((t: { languages_code: string }) => t.languages_code === fullLocale.value);
    return translation || props.item;
});

const getLocalizedContent = (item: any) => {
    return item.content.find((c: { languages_code: any; }) => c.languages_code === fullLocale.value) || '';
}
</script>