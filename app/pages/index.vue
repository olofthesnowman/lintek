<template></template>
<script setup lang="ts">
    // Redirect to /locale/index
    const { locale } = useLanguage();
    navigateTo(`/${locale.value}`, { redirectCode: 302 });
</script>