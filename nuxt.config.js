// const pkg = require('./package')

const isDevMode = process.env.NODE_ENV === 'development'

module.exports = {
  mode: 'universal',
  env: {
    spaceId: process.env.STORYBLOK_SPACE_ID,
    apiUrl: 'https://api.storyblok.com/v1',
    apiToken: isDevMode
      ? process.env.STORYBLOK_API_PREVIEW_TOKEN
      : process.env.STORYBLOK_API_PUBLIC_TOKEN,
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
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [{src: '~/plugins/vueMq', ssr: false}],

  /*
  ** Nuxt.js modules
  */
  modules: [
    [
      'storyblok-nuxt',
      {
        accessToken: isDevMode
          ? process.env.STORYBLOK_API_PREVIEW_TOKEN
          : process.env.STORYBLOK_API_PUBLIC_TOKEN,
        cacheProvider: 'memory',
      },
    ],
  ],

  /*
  ** Build configuration
  */
  build: {
    vendor: ['axios', 'mobile-detect', 'vue-mq'],
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
