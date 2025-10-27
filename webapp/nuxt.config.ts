// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/image', '@nuxt/ui'],
  css: ['~/assets/css/main.css'],

  ui: {
    theme: {
      colors: ['magenta'],
    },
  },

  colorMode: {
    preference: 'dark',
    fallback: 'dark',
    dataValue: 'dark',
    classSuffix: '',
    storageKey: 'nuxt-color-mode'
  }
})