import axios from 'axios'

const state = () => {
  return {
    companies: [],
  }
}

const getters = {
  companies(state) {
    return state.companies
  },
}

const actions = {
  fetch({commit}) {
    let isDevMode = process.env.NODE_ENV === 'development'
    let apiUrl = process.env.apiUrl
    let accessUrl = apiUrl + '/contacts'
    return axios({
      method: 'get',
      url: accessUrl,
      params: {
        version: isDevMode ? 'draft' : 'published',
        is_startpage: true,
        token: process.env.altApiToken,
      },
    })
      .then(res => {
        let companies = res.data.story.content.companies
        commit('register', {companies})
        return Promise.resolve()
      })
      .catch(error => Promise.reject(error))
  },
}

const mutations = {
  register(state, {companies}) {
    state.companies = companies
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
