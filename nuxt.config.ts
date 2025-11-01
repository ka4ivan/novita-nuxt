// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
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
})
