export default {
  namespaced: true,
  state: () => {
    return {
      rootCategories: [],
    }
  },
  getters: {},
  actions: {},
  mutations: {
    register(state, payload) {
      state.rootCategories.splice(0, state.rootCategories.length, ...payload)
    },
  },
}
