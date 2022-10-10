import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  ssr: false,

  telemetry: false,

  mode: process.env.APP_ENV,

  srcDir: 'client',

  head: {
    //
  },

  runtimeConfig: {
    // private vars here

    public: {
      home: '/home',
      appName: process.env.APP_NAME,
      apiBase: process.env.NUXT_PUBLIC_API_BASE,
    },
  },

  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt'],
})
