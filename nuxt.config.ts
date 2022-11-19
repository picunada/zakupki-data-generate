// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  head: {
    link: [
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap',
      },
    ],
  },
  nitro: {
    plugins: ['~/server/index.ts'],
    preset: 'node-server',
  },

  css: ['~/assets/sass/app.scss'],

  runtimeConfig: {
    mongoUri: process.env.MONGO_URI,
    db: process.env.DB_NAME,
    collection223: process.env.COLLECTION233_NAME,
    collection44: process.env.COLLECTION44_NAME,
    collection615: process.env.COLLECTION615_NAME,
    public: {
      apiBase: '/api',
    },
  },

  modules: ['@unocss/nuxt'],

  unocss: {
    // presets
    uno: true, // enabled `@unocss/preset-uno`
    icons: true,
    preflight: true,
  },
})
