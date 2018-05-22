<template>
  <section id="home-view">
    <parallax-section v-for="(section,index) in parallaxSections"
                      :key="section._uid"
                      :background="section.background[0]"
                      :shift-rate="section.shiftRate"
                      :height-ratio="section.heightRatio"
                      :screen-v-slices="screenVSlices"
                      :total-height="totalHeight"
                      :y-offset="yOffset"
                      :leading-v-slices="leadingVSlices(index)">
      <span/>
    </parallax-section>
  </section>
</template>

<script>
import vuexMappers from 'vuex'
import ParallaxSection from '~/components/ParallaxSection'
export default {
  name: 'HomeView',
  layout: 'default',
  components: {ParallaxSection},
  fetch({store}) {
    let carouselSlides = store.getters['carousel/carouselSlides']
    if (carouselSlides.length === 0) {
      return store
        .dispatch('carousel/fetch')
        .then(() => Promise.resolve())
        .catch(error => {
          console.log(error)
          return Promise.reject(error)
        })
    }
  },
  data() {
    return {
      yOffset: 0,
      windowHeight: 0,
      totalHeight: 0,
      companyProfile: {
        title: 'COMPANY PROFILE',
        sections: [
          {
            heading: 'Affordable Quality and Service:',
            paragraph:
              "<u>Gentry Way Co., Ltd</u> is a Taiwanese manufacturer of  aluminum alloy products since since 1980's, and it is fully invested in the home-care market sector for the last 30 years.  Tightly integrated production facility starting from aluminum extrusion, anodizing treatment to the final assembly and quality control provides efficient and consistent productions.\nSince the addition of its sister operation - <u>Gentry Hardware Products Co., Ltd.</u> at Zhongshen, Guangzhou, Gentry's output had greatly increased and its product range is broadened by the availability of steel and other plastic components.",
            list: null,
          },
          {
            heading: 'Our business scope:',
            paragraph: null,
            list: `
              <li>Rehabilitation equipment, including crutches, canes, walkers, shower/bath seats, commode chairs, safty railing, patient-aids, etc...</li>
              <li>Aluminum extrusion parts and products</li>
              <li>Houseware & excercise equipment</li>`,
          },
        ],
      },
    }
  },
  computed: {
    ...vuexMappers.mapGetters('carousel', {
      parallaxSections: 'carouselSlides',
    }),
    imageUrls() {
      return this.parallaxSections.map(slide => {
        return slide.imageUrl
      })
    },
    captions() {
      return this.parallaxSections.map(slide => {
        return {
          titleText: slide.titleText,
          mottoText: slide.mottoText,
        }
      })
    },
    screenVSlices() {
      return this.parallaxSections.reduce((a, b) => {
        return a + b.heightRatio
      }, 0)
    },
  },
  watch: {
    windowHeight() {
      let originalPositionRatio = this.yOffset / this.totalHeight
      this.$nextTick(() => {
        let curTotalHeight = document.body.scrollHeight
        let newTargetPosition = Math.round(
          curTotalHeight * originalPositionRatio
        )
        window.scrollTo(0, newTargetPosition)
        this.yOffset = window.pageYOffset
        this.windowHeight = window.innerHeight
        this.totalHeight = document.body.scrollHeight
      })
    },
  },
  mounted() {
    this.yOffset = window.pageYOffset
    this.windowHeight = window.innerHeight
    this.totalHeight = document.body.scrollHeight
    window.addEventListener('scroll', () => {
      this.$nextTick(() => {
        this.yOffset = window.pageYOffset
      })
    })
    window.addEventListener('resize', () => {
      this.$nextTick(() => {
        this.windowHeight = window.innerHeight
      })
    })
  },
  destroyed() {
    window.removeEventListener('scroll', () => {
      this.yOffset = 0
    })
    window.removeEventListener('resize', () => {
      this.windowHeight = 0
    })
  },
  methods: {
    leadingVSlices(index) {
      return this.parallaxSections.reduce((a, b, c) => {
        return c < index ? a + b.heightRatio : a
      }, 0)
    },
    logoImageUrlHelper(url) {
      return url.replace(
        '//a.storyblok.com',
        `//img2.storyblok.com/fit-in/1920x1080/filters:fill\\(white\\)`
      )
    },
    // plaxImageUrlHelper(url) {
    //   return url.replace(
    //     '//a.storyblok.com',
    //     `//img2.storyblok.com/fit-in/1920x0/filters:quality\\(70\\):format\\(jpg\\):fill\\(whitesmoke\\)`
    //   )
    // },
  },
}
</script>
