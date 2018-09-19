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
        path: '/catalog/' + payload.full_slug,
        disabled: true,
      })
      const length = state.breadcrumbItems.length
      state.breadcrumbItems[length - 2].disabled = false
    },
    navigateToBreadcrumb(state, index) {
      state.breadcrumbItems.splice(index + 1)
      state.breadcrumbItems[index].disabled = true
    },
  },
}
