<template>
    <UMarquee class="w-full">
        <ULink
            v-for="(item, index) in props.items"
            :key="index"
            :to="item.item.link || '#'"
            target="_blank"
            class="marquee-content flex items-center space-x-4"
        >
            <img 
                v-if="item.item.image" 
                :src="`${directusUrl}/assets/${item.item.image}`" 
                :alt="item.item.title || 'Marquee item'"
                class="h-16 w-auto"
            />
            <span v-if="item.item.title" class="text-xl font-semibold">{{ item.item.title }}</span>
        </ULink>
    </UMarquee>
</template>

<script lang="ts" setup>
const props = defineProps<{
    items: any;
}>();

const directusUrl = useRuntimeConfig().public.directusUrl;
</script>