const state = () => {
  return {
    pageFooter: {
      offsetTop: null,
      offsetHeight: null,
    },
  }
}
const getters = {
  pageFooter(state) {
    return state.pageFooter
  },
}
const actions = {}
const mutations = {
  resetPageFooterDimensions(state) {
    state.pageFooter = {
      offsetTop: null,
      offsetHeight: null,
    }
  },
  registerPageFooterDimensions(state, {offsetTop = null, offsetHeight = null}) {
    state.pageFooter.offsetHeight = offsetHeight
    state.pageFooter.offsetTop = offsetTop
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
