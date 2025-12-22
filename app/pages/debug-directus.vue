<template>
  <UContainer class="py-8">
    <h1 class="text-5xl">Directus Debug Page</h1>
    
    <div v-if="loading">Loading...</div>
    
    <div v-else>
      <h2 class="text-3xl">All Pages (first 5):</h2>
      <pre>{{ allPages }}</pre>

      <h2 class="text-3xl">Current Route Params:</h2>
      <pre>{{ route.params }}</pre>

      <h2 class="text-3xl">Filtered Result:</h2>
      <pre>{{ filteredPage }}</pre>

      <h2 class="text-3xl">Manual Test:</h2>
      <UInput v-model="testSlug" placeholder="Enter slug to test (try: kontkat)" />
      <UButton @click="testFilter">Test Filter</UButton>
      <UButton @click="testAllFilters" class="ml-2">Test All Filter Types</UButton>
      
      <div v-if="testResult">
        <h3 class="text-xl mt-4">Test Result:</h3>
        <pre>{{ testResult }}</pre>
      </div>
      
      <div v-if="allFilterResults && allFilterResults.length > 0">
        <h3 class="text-xl mt-4">All Filter Test Results:</h3>
        <div v-for="(result, index) in allFilterResults" :key="index" class="mb-4">
          <h4 class="text-lg font-bold">{{ result.name }}:</h4>
          <pre>{{ result.data }}</pre>
        </div>
      </div>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
const { $directus, $readItems } = useNuxtApp()
const route = useRoute()

const loading = ref(true)
const allPages = ref<any>(null)
const filteredPage = ref<any>(null)
const testSlug = ref('kontkat')
const testResult = ref<any>(null)
const allFilterResults = ref<any[]>([])

onMounted(async () => {
  try {
    // Get all pages
    allPages.value = await $directus.request($readItems('pages', {
      fields: ['*'],
      limit: 5,
    }))
    
    // Try to filter by current slug
    const currentSlug = Array.isArray(route.params.slug) ? route.params.slug[0] : route.params.slug
    if (currentSlug) {
      filteredPage.value = await $directus.request($readItems('pages', {
        fields: ['*'],
        filter: { slug: { _eq: currentSlug } },
        limit: 1,
      }))
    }
  } catch (error) {
    console.error('Debug error:', error)
  } finally {
    loading.value = false
  }
})

const testFilter = async () => {
  if (!testSlug.value) return
  
  try {
    testResult.value = await $directus.request($readItems('pages', {
      fields: ['*'],
      filter: { slug: { _eq: testSlug.value } },
      limit: 1,
    }))
  } catch (error: any) {
    testResult.value = { error: error.message }
  }
}

const testAllFilters = async () => {
  if (!testSlug.value) return
  
  allFilterResults.value = []
  
  const filterTests = [
    {
      name: 'Standard _eq filter',
      filter: { slug: { _eq: testSlug.value } }
    },
    {
      name: 'Direct value filter',
      filter: { slug: testSlug.value }
    },
    {
      name: 'Contains filter',
      filter: { slug: { _contains: testSlug.value } }
    },
    {
      name: 'Starts with filter',
      filter: { slug: { _starts_with: testSlug.value } }
    },
    {
      name: 'Case insensitive _eq',
      filter: { slug: { _iequals: testSlug.value } }
    },
    {
      name: 'In array filter',
      filter: { slug: { _in: [testSlug.value] } }
    }
  ]
  
  for (const test of filterTests) {
    try {
      console.log(`Testing filter: ${test.name}`, test.filter)
      const result = await $directus.request($readItems('pages', {
        fields: ['*'],
        filter: test.filter,
        limit: 1,
      }))
      
      allFilterResults.value.push({
        name: test.name,
        data: result,
        success: true,
        count: result?.length || 0
      })
    } catch (error: any) {
      allFilterResults.value.push({
        name: test.name,
        data: { error: error.message },
        success: false,
        count: 0
      })
    }
  }
}
</script>
