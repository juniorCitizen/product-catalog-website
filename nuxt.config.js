const inProdMode = process.env.NODE_ENV === 'production'
const inDevMode = process.env.NODE_ENV === 'development'
if (!inProdMode) require('dotenv-safe').config()

const storyblokCredentials = {
  development: {
    spaceId: process.env.DEVELOPMENT_STORYBLOK_SPACE_ID,
    accessToken: process.env.DEVELOPMENT_STORYBLOK_PREVIEW_TOKEN,
  },
  staging: {
    spaceId: process.env.STAGING_STORYBLOK_SPACE_ID,
    accessToken: process.env.STAGING_STORYBLOK_PUBLIC_TOKEN,
  },
  production: {
    spaceId: process.env.PRODUCTION_STORYBLOK_SPACE_ID,
    accessToken: process.env.PRODUCTION_STORYBLOK_PUBLIC_TOKEN,
  },
}
const accessToken = inDevMode
  ? storyblokCredentials.development.accessToken
  : inProdMode
    ? storyblokCredentials.production.accessToken
    : storyblokCredentials.staging.accessToken

const googleFontUrls = {
  montserrat: 'https://fonts.googleapis.com/css?family=Montserrat:300,400',
  anton: 'https://fonts.googleapis.com/css?family=Anton',
}

const modules = {
  fontawesome: [
    'nuxt-fontawesome',
    {
      component: 'fa',
      imports: [
        //import whole sets
        // {set: '@fortawesome/free-brands-svg-icons', icons: ['fab']},
        // {set: '@fortawesome/free-regular-svg-icons', icons: ['far']},
        // {set: '@fortawesome/free-solid-svg-icons', icons: ['fas']},
        // import individual icons
        {set: '@fortawesome/free-regular-svg-icons', icons: ['faSmile']},
        {
          set: '@fortawesome/free-solid-svg-icons',
          icons: [
            'faAngleLeft',
            'faAngleRight',
            'faBuilding',
            'faCaretDown',
            'faCaretUp',
            'faEnvelope',
            'faFax',
            'faGlobe',
            'faHome',
            'faLocationArrow',
            'faMobile',
            'faPhone',
            'faSpinner',
            'faTimesCircle',
            'faUserCircle',
          ],
        },
      ],
    },
  ],
  storyblok: [
    'storyblok-nuxt',
    {accessToken: accessToken, cacheProvider: 'memory'},
  ],
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
    defaultMapZoom: process.env.DEFAULT_MAP_ZOOM,
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
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
  plugins: [
    {src: '~/plugins/vueMq', ssr: false},
    {src: '~/plugins/googleMaps'},
  ],
  modules: [modules.fontawesome, modules.storyblok],
  build: {
    vendor: [
      'axios',
      'bluebird',
      'mobile-detect',
      'vue-mq',
      'vue2-google-maps',
    ],
    postcss: {plugins: {'postcss-custom-properties': false}}, // https://github.com/nuxt/nuxt.js/issues/1670
    extend(config, ctx) {
      // for google maps (vue2-google-maps - https://www.npmjs.com/package/vue2-google-maps)
      if (!ctx.isClient) {
        // This instructs Webpack to include `vue2-google-maps`'s Vue files for server-side rendering
        config.externals.splice(0, 0, (context, request, callback) => {
          if (/^vue2-google-maps($|\/)/.test(request)) callback(null, false)
          else callback()
        })
      }
      // fontawesome tree shaking - https://samuelcoe.com/blog/fa-nuxt
      // doesn't seem to be making a difference
      config.resolve.alias['@fortawesome/fontawesome-free-brands$'] =
        '@fortawesome/fontawesome-free-brands/shakable.es.js'
      config.resolve.alias['@fortawesome/fontawesome-free-regular$'] =
        '@fortawesome/fontawesome-free-regular/shakable.es.js'
      config.resolve.alias['@fortawesome/fontawesome-free-solid$'] =
        '@fortawesome/fontawesome-free-solid/shakable.es.js'
      // run linting
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
