require('dotenv-safe').config()

const isDevMode = process.env.NODE_ENV === 'development'

module.exports = {
  mode: 'universal',
  env: {
    apiUrl: 'https://api.storyblok.com/v1/cdn/stories',
    spaceId: process.env.STORYBLOK_SPACE_ID,
    apiToken: isDevMode
      ? process.env.STORYBLOK_API_PREVIEW_TOKEN
      : process.env.STORYBLOK_API_PUBLIC_TOKEN,
    altSpaceId: process.env.ALT_STORYBLOK_SPACE_ID,
    altApiToken: isDevMode
      ? process.env.ALT_STORYBLOK_API_PREVIEW_TOKEN
      : process.env.ALT_STORYBLOK_API_PUBLIC_TOKEN,
  },
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.WEBSITE_NAME,
    meta: [
      {
        charset: 'utf-8',
      },
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
        href:
          'https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.1/css/bulma.min.css',
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

  /*
  ** Customize the progress-bar color
  */
  loading: {color: '#FFFFFF'},

  /*
  ** Global CSS
  */
  css: [
    {src: '~/assets/css/global.css'},
    {src: '~/assets/css/pageTransition.css'},
    {src: 'aos/dist/aos.css'},
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    {src: '~/plugins/aos', ssr: false},
    {src: '~/plugins/vueMq', ssr: false},
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [],

  /*
  ** Build configuration
  */
  build: {
    vendor: ['aos', 'axios', 'bluebird', 'mobile-detect', 'vue-mq'],
    /*
    ** You can extend webpack config here
    */
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
