<template>
  <div>
    <h1>Dynamic Page</h1>
    <p>Slug: {{ slug }}</p>
  </div>
</template>
<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();
const slug = route.params.slug;
</script>