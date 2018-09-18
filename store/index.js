export default {
  namespaced: true,
  state: () => {
    return {
      routingInProgress: false,
    }
  },
  getters: {},
  actions: {},
  mutations: {
    routingStart(state) {
      state.routingInProgress = true
    },
    routingFinish(state) {
      state.routingInProgress = false
    },
  },
}
