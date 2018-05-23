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
    let isDevMode = process.env.NODE_ENV === 'development'
    let apiUrl = process.env.apiUrl
    let accessUrl = apiUrl + '/home-page'
    return axios({
      method: 'get',
      url: accessUrl,
      params: {
        version: isDevMode ? 'draft' : 'published',
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
    state.carouselSlides[3].content = [
      {
        heading: 'Quality Product Manufactured with Experience:',
        paragraph:
          "<u>Gentry Way Co., Ltd</u> is a Taiwanese manufacturer of  aluminum alloy products since since 1980's, and it is fully invested in the home-care market sector for the last 30 years.  Tightly integrated production facility starting from aluminum extrusion, anodizing treatment to the final assembly and quality control provides efficient and consistent productions.\nSince the addition of its sister operation - <u>Gentry Hardware Products Co., Ltd.</u> at Zhongshen, Guangzhou, Gentry's output had greatly increased and its product range is broadened by the availability of steel and other plastic components.",
      },
      {
        heading: 'Our business scope:',
        list: `
              <li>Rehabilitation equipment, including crutches, canes, walkers, shower/bath seats, commode chairs, safty railing, patient-aids, etc...</li>
              <li>Aluminum extrusion parts and products</li>
              <li>Houseware & excercise equipment</li>`,
      },
    ]
    state.carouselSlides[4].heightRatio = 100
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
    state.carouselSlides.unshift({
      heightRatio: 100,
      shiftRate: 1,
      background: [
        {
          imageUrl: null,
          contained: false,
          grayscaleLevel: 0,
          color: 'white',
        },
      ],
      content: [
        {
          heading: '',
          carousel: JSON.parse(JSON.stringify(state.carouselSlides)),
        },
      ],
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
