import axios from 'axios'

const state = () => {
  return {
    contactList: [],
  }
}
const getters = {
  contactList(state) {
    return state.contactList
  },
}
const actions = {
  fetch(context) {
    let apiUrl = process.env.apiUrl
    let accessUrl = apiUrl + '/cdn/stories/contact-page'
    return axios({
      method: 'get',
      url: accessUrl,
      params: {
        version: process.env.NODE_ENV === 'production' ? 'published' : 'draft',
        is_startpage: true,
        token: process.env.apiToken,
      },
    })
      .then(res => {
        let contactList = res.data.story.content.contactList
        context.commit('register', {contactList})
        return Promise.resolve(res.data.story.content)
      })
      .catch(error => Promise.reject(error))
  },
}
const mutations = {
  register(state, {contactList}) {
    state.contactList = []
    contactList.forEach(contact => {
      state.contactList.push(contact)
    })
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
