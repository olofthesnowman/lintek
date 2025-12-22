<template>
    <div v-html="content" class="prose dark:prose-invert" />
</template>

<script lang="ts" setup>
const props = defineProps<{
    content: string;
}>();
</script>