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
      appName: '',
      apiBase: '',
      home: '/',
    },
  },

  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt'],
})
