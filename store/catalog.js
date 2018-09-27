const initialState = [
  {
    data: {id: null, uuid: null, slug: '', full_slug: ''},
    disabled: true,
    path: '/catalog',
    text: 'Home',
  },
]

export default {
  namespaced: true,
  state: () => {
    return {
      catalog: [],
      categories: [],
      products: [],
      features: [],
      photos: [],
      breadcrumbs: JSON.parse(JSON.stringify(initialState)),
    }
  },
  getters: {},
  actions: {
    fetchAllCategories({commit}) {
      return this.$storyapi
        .get('cdn/stories', {
          starts_with: 'categories',
          per_page: 1000,
          sort_by: 'position:asc',
          version: version(this),
        })
        .then(res => {
          commit('registerCategories', res.data.stories)
          commit('resetBreadcrumbs')
          return Promise.resolve()
        })
        .catch(error => this.$nuxt.error(error))
    },
    fetchAllSeries({commit}) {
      return this.$storyapi
        .get('cdn/stories', {
          starts_with: 'series',
          per_page: 1000,
          sort_by: 'name:asc',
          version: version(this),
        })
        .then(res => {
          commit('registerSeries', res.data.stories)
          return Promise.resolve()
        })
        .catch(error => this.$nuxt.error(error))
    },
    fetchAllProducts({commit}) {
      return this.$storyapi
        .get('cdn/stories', {
          starts_with: 'products',
          per_page: 1000,
          sort_by: 'content.model:asc',
          version: version(this),
        })
        .then(res => {
          commit('registerProducts', res.data.stories)
          return Promise.resolve()
        })
        .catch(error => this.$nuxt.error(error))
    },
    fetchAllFeatures({commit}) {
      return this.$storyapi
        .get('cdn/stories', {
          starts_with: 'features',
          per_page: 1000,
          sort_by: 'name:asc',
          version: version(this),
        })
        .then(res => {
          commit('registerFeatures', res.data.stories)
          return Promise.resolve()
        })
        .catch(error => this.$nuxt.error(error))
    },
    fetchAllPhotos({commit}) {
      return this.$storyapi
        .get('cdn/stories', {
          starts_with: 'photos',
          per_page: 1000,
          sort_by: 'name:asc',
          version: version(this),
        })
        .then(res => {
          commit('registerPhotos', res.data.stories)
          return Promise.resolve()
        })
        .catch(error => this.$nuxt.error(error))
    },
  },
  mutations: {
    registerCategories(state, payload) {
      state.categories = payload
      const filterFn = category => !category.content.parentCategory
      state.catalog = state.categories.filter(filterFn)
    },
    registerSeries(state, payload) {
      state.series = payload
    },
    registerProducts(state, payload) {
      state.products = payload
    },
    registerFeatures(state, payload) {
      state.features = payload
    },
    registerPhotos(state, payload) {
      state.photos = payload
    },
    resetBreadcrumbs(state) {
      state.breadcrumbs = JSON.parse(JSON.stringify(initialState))
    },
    registerBreadcrumb(state, payload) {
      state.breadcrumbs.push({
        data: payload,
        disabled: true,
        path: '/catalog/' + payload.full_slug,
        text: payload.name,
      })
      const length = state.breadcrumbs.length
      state.breadcrumbs[length - 2].disabled = false
    },
    navigateToBreadcrumb(state, index) {
      state.breadcrumbs[index].disabled = true
      state.breadcrumbs.splice(index + 1)
    },
  },
}

function version(instance) {
  return instance.app.context.isDev ? 'draft' : 'published'
}
