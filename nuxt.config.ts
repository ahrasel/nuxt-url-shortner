// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  ssr: true,

  modules: ["@nuxtjs/tailwindcss"],
  dev: true,
  devServer: {
    port: Number(process.env.PORT) || 6000,
    host: process.env.HOST || "localhost",
  },
});
