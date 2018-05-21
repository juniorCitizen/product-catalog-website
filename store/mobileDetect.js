const state = () => {
  return {
    mobile: null,
    phone: null,
    tablet: null,
    os: null,
    userAgent: null,
  }
}
const getters = {
  isMobile(state) {
    return state.mobile !== null
  },
  isPhone(state) {
    return state.phone !== null
  },
  isTablet(state) {
    return state.tablet !== null
  },
}
// const actions = {}
const mutations = {
  registerDetectionResults(state, payload) {
    for (let key in state) {
      state[key] = payload[key] || null
    }
  },
}

export default {
  namespaced: true,
  state,
  getters,
  // actions,
  mutations,
}
