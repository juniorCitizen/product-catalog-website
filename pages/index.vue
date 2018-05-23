<template>
  <section id="home-view">
    <parallax-section v-for="(section,parallaxSectionIndex) in parallaxSections"
                      :key="section._uid"
                      :background="section.background[0]"
                      :shift-rate="section.shiftRate"
                      :height-ratio="section.heightRatio"
                      :screen-v-slices="screenVSlices"
                      :total-height="totalHeight"
                      :y-offset="yOffset"
                      :leading-v-slices="leadingVSlices(parallaxSectionIndex)">
      <template v-for="(contentItem,contentItemIndex) in section.content">
        <div :key="'a'+contentItemIndex">
          content {{ contentItemIndex+1 }}
        </div>
        <div :key="'b'+contentItemIndex">
          {{ contentItem.heading }}
        </div>
      </template>
    </parallax-section>
  </section>
</template>

<script>
import vuexMappers from 'vuex'
import ParallaxSection from '~/components/ParallaxSection'
import Carousel from '~/components/content/Carousel'
import List from '~/components/content/List'
import Paragraph from '~/components/content/Paragraph'
import Profile from '~/components/content/Profile'

export default {
  name: 'HomeView',
  layout: 'default',
  components: {
    ParallaxSection,
    Carousel,
    List,
    Paragraph,
    Profile,
  },
  fetch({store}) {
    let initJobs = []
    let catalog = store.getters['catalog/catalog']
    if (!catalog.isActive) {
      initJobs.push(
        store.dispatch('catalog/fetchCategory', {
          category: catalog,
        })
      )
    }
    let carouselSlides = store.getters['carousel/carouselSlides']
    if (carouselSlides.length === 0) {
      initJobs.push(store.dispatch('carousel/fetch'))
    }
    return Promise.all(initJobs).catch(error => {
      console.log(error)
      return Promise.reject(error)
    })
  },
  data() {
    return {
      yOffset: 0,
      windowHeight: 0,
      totalHeight: 0,
      rootCategories: [],
    }
  },
  computed: {
    ...vuexMappers.mapGetters('carousel', {
      parallaxSections: 'carouselSlides',
    }),
    ...vuexMappers.mapGetters('catalog', {
      catalog: 'catalog',
    }),
    carouselImages() {
      return this.parallaxSections.map(slide => {
        return slide.imageUrl
      })
    },
    captions() {
      return this.parallaxSections.map(slide => {
        return {
          titleText: slide.titleText,
          mobileTitleText: slide.mobileTitleText,
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
      .then(rootCategories => {
        this.rootCategories = rootCategories
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
