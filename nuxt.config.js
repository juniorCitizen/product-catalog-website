const inProdMode = process.env.NODE_ENV === 'production'
if (!inProdMode) require('dotenv-safe').config()

module.exports = {
  mode: 'universal',
  env: {
    apiUrl: 'https://api.storyblok.com/v1/cdn/stories',
    spaceId: process.env.STORYBLOK_SPACE_ID,
    apiToken: !inProdMode
      ? process.env.STORYBLOK_API_PREVIEW_TOKEN
      : process.env.STORYBLOK_API_PUBLIC_TOKEN,
    altSpaceId: process.env.ALT_STORYBLOK_SPACE_ID,
    altApiToken: !inProdMode
      ? process.env.ALT_STORYBLOK_API_PREVIEW_TOKEN
      : process.env.ALT_STORYBLOK_API_PUBLIC_TOKEN,
  },
  /* Headers of the page */
  head: {
    title: process.env.WEBSITE_NAME,
    meta: [
      {charset: 'utf-8'},
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        hid: 'description',
        name: 'description',
        content: process.env.WEBSITE_DESC,
      },
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico',
      },
      {
        rel: 'stylesheet',
        href: 'https://use.fontawesome.com/releases/v5.0.13/css/all.css',
        integrity:
          'sha384-DNOHZ68U8hZfKXOrtjWvjxusGo9WQnrNx2sqG0tfsghAvtVlRW3tvkXWZh58N9jp',
        crossorigin: 'anonymous',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Montserrat:300,400',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Anton',
      },
    ],
  },
  /* Customize the progress-bar color */
  loading: {color: '#FFFFFF'},
  /* Global CSS */
  css: [
    {src: 'bulma/bulma.sass', lang: 'sass'},
    {src: '~/assets/css/global.css'},
    {src: '~/assets/css/pageTransition.css'},
  ],
  /* Plugins to load before mounting the App */
  plugins: [{src: '~/plugins/vueMq', ssr: false}],
  /* Nuxt.js modules */
  modules: [],
  /* Build configuration */
  build: {
    vendor: ['axios', 'bluebird', 'mobile-detect', 'vue-mq'],
    postcss: {plugins: {'postcss-custom-properties': false}}, // rid of "emitted value instead of an instance" warning
    /* You can extend webpack config here */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
        })
      }
    },
  },
}
