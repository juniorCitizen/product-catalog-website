export default {
  namespaced: true,
  state: () => {
    return {
      routingInProgress: false,
    }
  },
  getters: {},
  actions: {
    nuxtServerInit({commit}, {isDev, $storyapi}) {
      const version = isDev ? 'draft' : 'published'
      return $storyapi
        .get('cdn/stories', {
          starts_with: 'companies',
          sort_by: 'position:asc',
          version,
        })
        .then(({data}) => {
          commit('contacts/register', data.stories)
          return Promise.resolve()
        })
        .catch(error => Promise.reject(error))
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
