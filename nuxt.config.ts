// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      API_BASE_URL: process.env.NUXT_APP_API_URL || "",
      FRONT_DOMAIN: process.env.NUXT_FRONT_DOMAIN || "",
    },
  },

  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  ssr: true,
  srcDir: "src/",

  alias: {
    "@": "src/",
  },

  css: [
    "~/assets/scss/common.scss"
  ],


  app: {
    // pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      title: "NOVITA",
      titleTemplate: "%s",
    },
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          // api: "modern-compiler",
          // additionalData: `
          //   @use "@/assets/scss/base/variables" as *;
          // `,
        },
      },
    },
  },

  modules: [
    '@pinia/nuxt',
    '@nuxt/image',
    "nuxt-schema-org",
  ],

  pinia: {
    autoImports: ["defineStore", ["defineStore", "definePiniaStore"]],
  },

  //-- SEO
  site: {
    name: 'NOVITA',
    url: process.env.NUXT_FRONT_DOMAIN,
    indexable: process.env.NUXT_APP_MODE !== 'develop',
  },
})