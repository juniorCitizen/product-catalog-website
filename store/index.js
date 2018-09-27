export default {
  namespaced: true,
  state: () => {
    return {
      routingInProgress: false,
    }
  },
  getters: {},
  actions: {
    nuxtServerInit({dispatch}) {
      return Promise.all([
        dispatch('catalog/fetchAllCategories'),
        dispatch('contacts/fetchAllCompanies'),
      ])
        .then(() => Promise.resolve())
        .catch(error => this.$nuxt.error(error))
    },
  },
  mutations: {
    routingStart(state) {
      state.routingInProgress = true
    },
    routingFinish(state) {
      state.routingInProgress = false
    },
  },
}
