<template>
    <div>
        <!-- Card Group Block Placeholder -->
        <p>Card Group Block Component - Collection: {{ props.collection }}, Item: {{ props.item }}</p>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
    collection: string;
    item: string;
    blockId?: number;
}>();
</script>
