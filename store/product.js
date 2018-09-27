export default {
  namespaced: true,
  state: () => {
    return {
      product: {
        content: {
          compatibleAcessories: [],
          compatibleProducts: [],
          description: 'no description',
          features: null,
          model: 'unnamed model',
          name: 'unnamed product',
          parentCategory: null,
          parentSeries: null,
          photos: null,
          specifications: null,
        },
      },
      photos: {
        content: {
          photoUrls: [],
        },
      },
      features: {
        content: {
          features: [],
        },
      },
    }
  },
  getters: {
    photoUrls(state) {
      return state.photos.content.photoUrls.reduce((photoUrls, photoUrl) => {
        photoUrls.push(photoUrl.url)
        return photoUrls
      }, [])
    },
    featureEntries(state) {
      return state.features.content.features.reduce(
        (featureEntries, feature) => {
          featureEntries.push(feature.text)
          return featureEntries
        },
        []
      )
    },
  },
  actions: {
    getPhotos({state, commit}) {
      const id = state.product.content.photos
      const isDev = this.app.context.isDev
      return this.$storyapi
        .get(`cdn/stories/${id}`, {
          starts_with: 'photos',
          version: isDev ? 'draft' : 'published',
        })
        .then(res => {
          commit('registerPhotos', res.data.story)
          return Promise.resolve()
        })
        .catch(error => {
          console.log(error)
          return Promise.reject(error)
        })
    },
    getProduct({commit}, slug) {
      const isDev = this.app.context.isDev
      return this.$storyapi
        .get(`cdn/stories`, {
          starts_with: `products/${slug}`,
          version: isDev ? 'draft' : 'published',
        })
        .then(res => {
          commit('registerProduct', res.data.stories[0])
          return Promise.resolve()
        })
        .catch(error => {
          console.log(error)
          return Promise.reject(error)
        })
    },
    getFeatures({state, commit}) {
      const id = state.product.content.features
      const isDev = this.app.context.isDev
      return this.$storyapi
        .get(`cdn/stories/${id}`, {
          starts_with: 'features',
          version: isDev ? 'draft' : 'published',
        })
        .then(res => {
          commit('registerFeatures', res.data.story)
          return Promise.resolve()
        })
        .catch(error => {
          console.log(error)
          return Promise.reject(error)
        })
    },
  },
  mutations: {
    registerPhotos(state, payload) {
      state.photos = payload
    },
    registerProduct(state, payload) {
      state.product = payload
    },
    registerFeatures(state, payload) {
      state.features = payload
    },
    resetPhotos(state) {
      state.photos = {
        content: {
          photoUrls: [],
        },
      }
    },
    resetProduct(state) {
      state.product = {
        content: {
          compatibleAcessories: [],
          compatibleProducts: [],
          description: 'no description',
          features: null,
          model: 'unnamed model',
          name: 'unnamed product',
          parentCategory: null,
          parentSeries: null,
          photos: null,
          specifications: null,
        },
      }
    },
  },
}
