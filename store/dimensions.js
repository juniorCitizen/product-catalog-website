const state = () => {
  return {
    pageFooter: {
      offsetTop: null,
      offsetHeight: null,
    },
    navHeader: {
      offsetTop: null,
      offsetHeight: null,
    },
  }
}
const getters = {
  pageFooter(state) {
    return state.pageFooter
  },
  navHeader(state) {
    return state.navHeader
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
  resetNavHeaderDimensions(state) {
    state.navHeader = {
      offsetTop: null,
      offsetHeight: null,
    }
  },
  registerNavHeaderDimensions(state, {offsetTop = null, offsetHeight = null}) {
    state.navHeader.offsetHeight = offsetHeight
    state.navHeader.offsetTop = offsetTop
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
