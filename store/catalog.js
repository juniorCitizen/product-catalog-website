import axios from 'axios'
import Promise from 'bluebird'

const productsPerPage = 40
const catalogRootSlug = 'product-catalog-page/'

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
      currentPage: null,
      perPage: productsPerPage,
      totalProductCount: 0,
    },
  }
}
const getters = {
  catalog(state) {
    return state.catalog
  },
  products(state) {
    return state.products.data
  },
}
const actions = {
  fetchCategory(context, {category = context.state.catalog}) {
    let isDevMode = process.env.NODE_ENV === 'development'
    return axios({
      method: 'get',
      url: category.accessUrl,
      params: {
        version: isDevMode ? 'draft' : 'published',
        is_startpage: true,
        token: process.env.apiToken,
      },
    })
      .then(res => {
        context.commit('registerCategory', {category, data: res.data})
        return context.dispatch('getProducts', {category})
      })
      .then(products => Promise.resolve({category, products}))
      .catch(error => Promise.reject(error))
  },
  fetchRootCategories(context) {
    let subcategories = context.state.catalog.subcategories
    return Promise.mapSeries(subcategories, subcategory => {
      return context.dispatch('fetchCategory', {category: subcategory})
    })
      .then(rootCategories => {
        return Promise.resolve(rootCategories)
      })
      .catch(error => Promise.reject(error))
  },
  fetchSubcatagories(context, {category = context.state.catalog}) {
    return Promise.mapSeries(category.subcategories, subcategory => {
      return context.dispatch('fetchCategory', {category: subcategory})
    })
      .then(subcategories => {
        return Promise.resolve(subcategories)
      })
      .catch(error => Promise.reject(error))
  },
  getProducts(context, {category = context.state.catalog, page = 1}) {
    let isDevMode = process.env.NODE_ENV === 'development'
    return axios({
      method: 'get',
      url: process.env.apiUrl,
      params: {
        version: isDevMode ? 'draft' : 'published',
        is_startpage: false,
        starts_with: category.slug,
        sort_by: 'content.code:asc',
        per_page: productsPerPage,
        token: process.env.apiToken,
        page,
      },
    })
      .then(res => {
        context.commit('registerProducts', res)
        return Promise.resolve()
      })
      .then(() => Promise.resolve(context.getters['products']))
      .catch(error => Promise.reject(error))
  },
}
const mutations = {
  registerCategory(state, {category = state.catalog, data}) {
    let fullSlug = data.story.full_slug
    let content = data.story.content
    let subcategories = content.subcategories
    category.name = content.name
    category.description =
      content.description ||
      `Category description placeholder for '${category.name}'`
    category.photo = content.photo || null
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
    category.isLoading = false
  },
  registerProducts(state, payload) {
    // deal with pagination
    state.products.activeProductIndex = null
    state.products.currentPage = parseInt(payload.config.params.page)
    state.products.perPage = parseInt(payload.headers['per-page'])
    state.products.totalProducts = parseInt(payload.headers.total)
    // deal with product data retrieval
    state.products.data = payload.data.stories.map(story => {
      let data = story.content
      return {
        name: data.name || `Product name placeholder for '${data.code}'`,
        code: data.code,
        description:
          data.description ||
          `Description for '${
            data.code
          }' is currently unavailable...\nDescription for '${
            data.code
          }' is currently unavailable...\nDescription for '${
            data.code
          }' is currently unavailable...\nDescription for '${
            data.code
          }' is currently unavailable...`,
        specification: {
          text:
            data.specification[0].text ||
            `Specification text for '${
              data.code
            }' is currently unavailable...\nSpecification text for '${
              data.code
            }' is currently unavailable...\nSpecification text for '${
              data.code
            }' is currently unavailable...\nSpecification text for '${
              data.code
            }' is currently unavailable...`,
          details: {
            weightCap: data.specification[0].details[0].weightCap || 'n/a',
            maxHeight: data.specification[0].details[0].maxHeight || 'n/a',
            minHeight: data.specification[0].details[0].minHeight || 'n/a',
            weight: data.specification[0].details[0].weight || 'n/a',
          },
        },
        primaryPhoto: data.primaryPhoto,
        secondaryPhotos: data.secondaryPhotos.map(photo => {
          return photo.url
        }),
      }
    })
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
