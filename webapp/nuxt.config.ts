// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/image', '@nuxt/ui'],
  css: ['~/assets/css/main.css'],

  ui: {
    theme: {
      colors: ['magenta', 'lintekblack'],
    },
  },

  runtimeConfig: {
    public: {
      directusUrl: process.env.DIRECTUS_URL || 'https://cms.lintek.lysator.liu.se',
    },
  },
})