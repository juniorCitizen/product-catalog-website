import axios from 'axios'

const state = () => {
  return {
    contacts: [],
  }
}

const getters = {
  contacts(state) {
    return state.contacts
  },
}

const actions = {
  fetch(context) {
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
        let contacts = res.data.story.content.contacts
        context.commit('register', {contacts})
        return Promise.resolve()
      })
      .catch(error => Promise.reject(error))
  },
}

const mutations = {
  register(state, {contacts}) {
    state.contacts = contacts
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
