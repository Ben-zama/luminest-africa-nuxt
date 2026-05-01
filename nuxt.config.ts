// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  runtimeConfig: {
      public: {
        apiKey: process.env.API_KEY,
      }
  },
  modules: [
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxtjs/color-mode',
    '@vite-pwa/nuxt'
  ],
  colorMode: {
    classSuffix: '',
    preference: 'dark',
    fallback: 'light'
  },
  css: ['~/assets/scss/main.scss'],
  postcss: {
    plugins: {
      autoprefixer: {}
    }
  },
  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'Luminest Africa',
      short_name: 'LumAfr',
      theme_color: '#ffffff'
    },
    workbox: {
      navigateFallback: '/'
    }
  },
})