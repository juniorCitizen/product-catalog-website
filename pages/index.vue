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
      <section-content :section="section"/>
    </parallax-section>
  </section>
</template>

<script>
import vuexMappers from 'vuex'
import ParallaxSection from '~/components/ParallaxSection'
import SectionContent from '~/components/parallaxSection/SectionContent'
export default {
  name: 'HomeView',
  layout: 'default',
  components: {
    ParallaxSection,
    SectionContent,
  },
  fetch({store}) {
    let carouselSlides = store.getters['carousel/carouselSlides']
    let catalog = store.getters['catalog/catalog']
    if (carouselSlides.length === 0) {
      return store
        .dispatch('carousel/fetch')
        .then(() => {
          return store.dispatch('catalog/fetchCategory', {
            category: catalog,
          })
        })
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
    }
  },
  computed: {
    ...vuexMappers.mapGetters('carousel', {
      parallaxSections: 'carouselSlides',
    }),
    ...vuexMappers.mapGetters('catalog', {
      catalog: 'catalog',
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
    this.fetchRootCategories()
      .then(res => {
        console.log(res)
        return Promise.resolve()
      })
      .catch(error => Promise.reject(error))
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
    ...vuexMappers.mapActions('catalog', {
      fetchRootCategories: 'fetchRootCategories',
    }),
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
