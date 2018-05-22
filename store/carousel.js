import axios from 'axios'

const state = () => {
  return {
    carouselSlides: [],
  }
}
const getters = {
  carouselSlides(state) {
    return state.carouselSlides
  },
}
const actions = {
  fetch(context) {
    let apiUrl = process.env.apiUrl
    let accessUrl = apiUrl + '/cdn/stories/home-page'
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
        let carouselSlides = res.data.story.content.carouselSlides
        context.commit('register', {carouselSlides})
        return Promise.resolve(res.data.story.content)
      })
      .catch(error => Promise.reject(error))
  },
}
const mutations = {
  register(state, {carouselSlides}) {
    state.carouselSlides = []
    carouselSlides.forEach(slide => {
      state.carouselSlides.push(slide)
    })
    // hardcoded parallax info
    state.carouselSlides[0].heightRatio = 100
    state.carouselSlides[0].shiftRate = 1
    state.carouselSlides[0].background = [
      {
        imageUrl: state.carouselSlides[0].imageUrl,
        contained: false,
        grayscaleLevel: 0,
        color: 'white',
      },
    ]
    state.carouselSlides[0].content = []
    state.carouselSlides[1].heightRatio = 100
    state.carouselSlides[1].shiftRate = 4
    state.carouselSlides[1].background = [
      {
        imageUrl: state.carouselSlides[1].imageUrl,
        contained: false,
        grayscaleLevel: 50,
        color: 'transparent',
      },
    ]
    state.carouselSlides[1].content = []
    state.carouselSlides[2].heightRatio = 100
    state.carouselSlides[2].shiftRate = 8
    state.carouselSlides[2].background = [
      {
        imageUrl: state.carouselSlides[2].imageUrl,
        contained: false,
        grayscaleLevel: 0,
        color: 'transparent',
      },
    ]
    state.carouselSlides[2].content = []
    state.carouselSlides[3].heightRatio = 100
    state.carouselSlides[3].shiftRate = 16
    state.carouselSlides[3].background = [
      {
        imageUrl: state.carouselSlides[3].imageUrl,
        contained: false,
        grayscaleLevel: 100,
        color: 'transparent',
      },
    ]
    state.carouselSlides[3].content = []
    state.carouselSlides[4].heightRatio = 50
    state.carouselSlides[4].shiftRate = 32
    state.carouselSlides[4].background = [
      {
        imageUrl: state.carouselSlides[4].imageUrl,
        contained: false,
        grayscaleLevel: 0,
        color: 'transparent',
      },
    ]
    state.carouselSlides[4].content = []
    state.carouselSlides.push({})
    state.carouselSlides[5].heightRatio = 75
    state.carouselSlides[5].shiftRate = 0
    state.carouselSlides[5].background = [
      {
        imageUrl: null,
        contained: false,
        color: 'white',
        grayscaleLevel: 100,
      },
    ]
    state.carouselSlides[5].content = []
    state.carouselSlides.push({})
    state.carouselSlides[6].heightRatio = 100
    state.carouselSlides[6].shiftRate = 0
    state.carouselSlides[6].background = [
      {
        imageUrl: null,
        contained: false,
        grayscaleLevel: 0,
        color: 'black',
      },
    ]
    state.carouselSlides[6].content = []
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
