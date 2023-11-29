// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  serverDir: "server/",
  srcDir: "client/",
  buildDir: "dist/",
  ssr: true,
});
