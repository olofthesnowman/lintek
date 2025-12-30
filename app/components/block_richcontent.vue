<template>
    <div v-html="content" class="prose dark:prose-invert max-w-[75ch]" />
</template>

<script lang="ts" setup>
const props = defineProps<{
    content: string;
}>();
</script>