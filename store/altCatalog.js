import axios from 'axios'
import Promise from 'bluebird'

const productsPerPage = 10
const catalogRootSlug = 'product-catalog/'

const state = () => {
  return {
    catalog: {
      name: null,
      description: null,
      photo: null,
      accessUrl: process.env.apiUrl + '/' + catalogRootSlug,
      slug: catalogRootSlug,
      subcategories: [],
      isActive: false,
      isLoading: false,
    },
    products: {
      data: [],
      activeProductIndex: null,
      currentPage: 1,
      perPage: productsPerPage,
      totalProductCount: 0,
    },
  }
}
const getters = {
  activeRootCategoryIndex(state) {
    let rootCategories = state.catalog.subcategories
    if (rootCategories.length === 0) return null
    let index = rootCategories.findIndex(subcategory => {
      return subcategory.isActive === true
    })
    return index === -1 ? null : index
  },
  activeProduct(state) {
    let products = state.products
    if (products.activeProductIndex === null) return null
    else return products.data[products.activeProductIndex]
  },
  activeProductIndex(state) {
    return state.products.activeProductIndex
  },
  breadcrumb(state) {
    let breadcrumb = []
    breadcrumb.push(state.catalog)
    if (!state.catalog.subcategories) return breadcrumb
    do {
      let subcategories = breadcrumb[breadcrumb.length - 1].subcategories
      let activeSubcategoryIndex = subcategories.findIndex(subcategory => {
        return subcategory.isActive
      })
      if (activeSubcategoryIndex !== -1) {
        breadcrumb.push(subcategories[activeSubcategoryIndex])
      } else break
    } while (breadcrumb[breadcrumb.length - 1].subcategories.length !== 0)
    return breadcrumb
  },
  catalog(state) {
    return state.catalog
  },
  paginationInfo(state) {
    let products = state.products
    return {
      currentPage: products.currentPage,
      totalPages: Math.ceil(products.totalProductCount / products.perPage),
      perPage: products.perPage,
      totalProductCount: products.totalProductCount,
    }
  },
  products(state) {
    return state.products.data
  },
}
const actions = {
  fetchCategory(context, {category = context.state.catalog}) {
    context.commit('setLoadingState', {
      category,
      isLoading: true,
    })
    let isDevMode = process.env.NODE_ENV === 'development'
    return axios({
      method: 'get',
      url: category.accessUrl,
      params: {
        version: isDevMode ? 'draft' : 'published',
        is_startpage: true,
        token: process.env.altApiToken,
      },
    })
      .then(res => {
        context.commit('registerCategory', {category, data: res.data})
        return context.dispatch('fetchProducts', {category})
      })
      .then(products => {
        context.commit('setLoadingState', {
          category,
          isLoading: false,
        })
        return Promise.resolve({category, products})
      })
      .catch(error => Promise.reject(error))
  },
  fetchProducts(context, {category = context.state.catalog, page = 1}) {
    let isDevMode = process.env.NODE_ENV === 'development'
    return axios({
      method: 'get',
      url: process.env.apiUrl,
      params: {
        version: isDevMode ? 'draft' : 'published',
        is_startpage: false,
        starts_with: category.slug,
        sort_by: 'content.model:asc',
        per_page: productsPerPage,
        token: process.env.altApiToken,
        page,
      },
    })
      .then(res => {
        context.commit('registerProducts', res)
        return Promise.resolve()
      })
      .then(() => {
        let products = context.getters['products']
        return Promise.resolve(products)
      })
      .catch(error => Promise.reject(error))
  },
  fetchSubcatagories({commit, dispatch, state}, {category = state.catalog}) {
    commit('setLoadingState', {category, isLoading: true})
    let subcategories = category.subcategories
    return Promise.mapSeries(subcategories, subcategory => {
      return dispatch('fetchCategory', {category: subcategory})
    })
      .then(res => {
        commit('setLoadingState', {category, isLoading: false})
        return Promise.resolve(res)
      })
      .catch(error => Promise.reject(error))
  },
}
const mutations = {
  clearProductList(state) {
    state.products = {
      data: [],
      activeProductIndex: null,
      currentPage: 1,
      perPage: productsPerPage,
      totalProductCount: 0,
    }
  },
  deactivateCategory(state, {category = state.catalog}) {
    category.isActive = false
    category.subcategories = []
  },
  deactivateSubcategories(state, {category = state.catalog}) {
    let activeIndex = category.subcategories.findIndex(subcategory => {
      return subcategory.isActive === true
    })
    if (activeIndex !== -1) {
      category.subcategories[activeIndex].isActive = false
      category.subcategories[activeIndex].subcategories = []
    }
  },
  registerCategory(state, {category = state.catalog, data}) {
    let fullSlug = data.story.full_slug
    let content = data.story.content
    let subcategories = content.subcategories
    category.name = content.name
    category.description = content.description || 'unavailable'
    category.accessUrl = process.env.apiUrl + '/' + fullSlug
    category.slug = fullSlug
    category.subcategories = subcategories.map(subcategory => {
      return {
        name: subcategory.name,
        accessUrl: `${category.accessUrl}${subcategory.slug}`,
        slug: `${fullSlug}${subcategory.slug}`,
        subcategories: [],
        isActive: false,
        isLoading: false,
      }
    })
    category.isActive = true
  },
  registerProducts(state, payload) {
    // deal with pagination
    state.products.activeProductIndex = null
    state.products.currentPage = parseInt(payload.config.params.page)
    state.products.perPage = parseInt(payload.headers['per-page'])
    state.products.totalProductCount = parseInt(payload.headers.total)
    // deal with product data retrieval
    state.products.data = payload.data.stories.map(story => {
      let content = story.content
      return {
        name: content.name || content.model,
        model: content.model,
        description: content.description || 'unavailable',
        features: content.features || 'unavailable',
        photos: content.photos,
      }
    })
  },
  setActiveProductIndex(state, productIndex = null) {
    state.products.activeProductIndex = productIndex
  },
  setLoadingState(state, {category = state.catalog, isLoading = false}) {
    category.isLoading = isLoading
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
