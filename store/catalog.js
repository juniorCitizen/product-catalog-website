export default {
  namespaced: true,
  state: () => {
    return {
      rootCategories: [],
      breadcrumbItems: [],
    }
  },
  getters: {},
  actions: {},
  mutations: {
    register(state, payload) {
      state.rootCategories.splice(0, state.rootCategories.length, ...payload)
      state.breadcrumbItems.splice(0, state.breadcrumbItems.length, {
        text: 'Home',
        path: '/catalog',
        disabled: true,
      })
    },
    resetBreadcrumbs(state) {
      state.breadcrumbItems.splice(0, state.breadcrumbItems.length, {
        text: 'Home',
        path: '/catalog',
        disabled: true,
      })
    },
    addBreadcrumbItem(state, payload) {
      state.breadcrumbItems.push({
        text: payload.name,
        path: payload.full_slug,
        disabled: true,
      })
      const length = state.breadcrumbItems.length
      state.breadcrumbItems[length - 2].disabled = false
    },
    removeBreadcrumbItem(state) {
      state.breadcrumbItems.pop()
      if (state.breadcrumbItems.length > 1) {
        state.breadcrumbItems[length - 1].disabled = false
      }
    },
  },
}
