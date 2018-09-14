const inProdMode = process.env.NODE_ENV === 'production'
const inDevMode = process.env.NODE_ENV === 'development'
if (!inProdMode) require('dotenv-safe').config()

const googleFontUrls = {
  montserrat: 'https://fonts.googleapis.com/css?family=Montserrat:300,400',
  anton: 'https://fonts.googleapis.com/css?family=Anton',
}

const nuxtFontawesomeModule = [
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
]

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
  modules: [nuxtFontawesomeModule],
  build: {
    vendor: ['axios', 'bluebird', 'mobile-detect', 'vue-mq'],
    postcss: {plugins: {'postcss-custom-properties': false}}, // https://github.com/nuxt/nuxt.js/issues/1670
    extend(config, ctx) {
      // fontawesome treeshaking - https://samuelcoe.com/blog/fa-nuxt
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
