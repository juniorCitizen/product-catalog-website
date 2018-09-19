export default {
  namespaced: true,
  state: () => {
    return {
      companies: [],
    }
  },
  getters: {},
  actions: {},
  mutations: {
    register(state, payload) {
      state.companies.splice(0, state.companies.length, ...payload)
    },
  },
}
