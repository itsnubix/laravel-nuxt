import 'dotenv/config'
import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  ssr: false,

  mode: process.env.APP_ENV,

  srcDir: 'client',

  head: {
    //
  },

  runtimeConfig: {
    // private vars here

    public: {
      apiBase: '',
    },
  },
  modules: ['@nuxtjs/tailwindcss'],
})
