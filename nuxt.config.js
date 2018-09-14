const inProdMode = process.env.NODE_ENV === 'production'
const inDevMode = process.env.NODE_ENV === 'development'
if (!inProdMode) require('dotenv-safe').config()

const googleFontUrls = {
  montserrat: 'https://fonts.googleapis.com/css?family=Montserrat:300,400',
  anton: 'https://fonts.googleapis.com/css?family=Anton',
}

module.exports = {
  mode: 'universal',
  env: {
    apiUrl: 'https://api.storyblok.com/v1/cdn/stories',
    spaceId: process.env.STORYBLOK_SPACE_ID,
    apiToken: inDevMode
      ? process.env.STORYBLOK_API_PREVIEW_TOKEN
      : process.env.STORYBLOK_API_PUBLIC_TOKEN,
    altSpaceId: process.env.ALT_STORYBLOK_SPACE_ID,
    altApiToken: inDevMode
      ? process.env.ALT_STORYBLOK_API_PREVIEW_TOKEN
      : process.env.ALT_STORYBLOK_API_PUBLIC_TOKEN,
  },
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
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
      {
        rel: 'stylesheet',
        href: 'https://use.fontawesome.com/releases/v5.0.13/css/all.css',
        integrity:
          'sha384-DNOHZ68U8hZfKXOrtjWvjxusGo9WQnrNx2sqG0tfsghAvtVlRW3tvkXWZh58N9jp',
        crossorigin: 'anonymous',
      },
      {rel: 'stylesheet', href: googleFontUrls.montserrat},
      {rel: 'stylesheet', href: googleFontUrls.anton},
    ],
  },
  loading: {color: '#FFFFFF'},
  css: [
    {src: '~/assets/css/customBulma.scss', lang: 'sass'},
    {src: '~/assets/css/global.css'},
    {src: '~/assets/css/pageTransition.css'},
  ],
  plugins: [{src: '~/plugins/vueMq', ssr: false}],
  modules: [],
  build: {
    vendor: ['axios', 'bluebird', 'mobile-detect', 'vue-mq'],
    postcss: {plugins: {'postcss-custom-properties': false}}, // https://github.com/nuxt/nuxt.js/issues/1670
    extend(config, ctx) {
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
