const inProdMode = process.env.NODE_ENV === 'production'
const inDevMode = process.env.NODE_ENV === 'development'
if (!inProdMode) require('dotenv-safe').config()

const storyblokTokens = {
  development: process.env.DEVELOPMENT_STORYBLOK_PREVIEW_TOKEN,
  staging: process.env.STAGING_STORYBLOK_PUBLIC_TOKEN,
  production: process.env.PRODUCTION_STORYBLOK_PUBLIC_TOKEN,
}

const webfontUrls = {
  materialIcons: 'https://fonts.googleapis.com/icon?family=Material+Icons',
  // montserrat: 'https://fonts.googleapis.com/css?family=Montserrat:300,400',
  roboto: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700',
}

const accessToken = inDevMode
  ? storyblokTokens.development
  : inProdMode
    ? storyblokTokens.production
    : storyblokTokens.staging

const modules = {
  storyblok: ['storyblok-nuxt', {accessToken, cacheProvider: 'memory'}],
}

module.exports = {
  mode: 'universal',
  env: {
    adminEmail: process.env.ADMIN_EMAIL,
    websiteTitle: process.env.WEBSITE_TITLE,
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
    defaultMapZoom: parseFloat(process.env.DEFAULT_MAP_ZOOM),
  },
  head: {
    title: process.env.WEBSITE_TITLE,
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {
        hid: 'description',
        name: 'description',
        content: process.env.WEBSITE_DESC,
      },
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
      {rel: 'stylesheet', type: 'text/css', href: webfontUrls.materialIcons},
      {rel: 'stylesheet', type: 'text/css', href: webfontUrls.roboto},
    ],
  },
  // https://nuxtjs.org/api/configuration-loading
  loading: false, // {color: '#3B8070'},
  css: [
    '@/assets/vuetify.styl',
    '@/assets/global.css',
    '@/assets/routingTransitions.css',
  ],
  router: {},
  plugins: [
    {src: '@/plugins/aos', ssr: false},
    {src: '@/plugins/googleMaps'},
    {src: '@/plugins/vuetify'},
  ],
  modules: [modules.storyblok],
  vendor: [
    'babel-polyfill', // ie11 & safari polyfill for using vuetify
    'vuetify',
    'vue2-google-maps',
  ],
  postcss: {
    plugins: {'postcss-custom-properties': false}, // https://github.com/nuxt/nuxt.js/issues/1670
  },
  build: {
    extend(config, ctx) {
      // for google maps (vue2-google-maps - https://www.npmjs.com/package/vue2-google-maps)
      if (!ctx.isClient) {
        // This instructs Webpack to include `vue2-google-maps`'s Vue files for server-side rendering
        config.externals.splice(0, 0, (context, request, callback) => {
          if (/^vue2-google-maps($|\/)/.test(request)) callback(null, false)
          else callback()
        })
      }
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
