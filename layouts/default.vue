<template>
  <div id="default-layout"
       :class="classBinding">
    <navbar/>
    <div id="content-grid-pane">
      <nuxt/>
    </div>
    <page-footer/>
  </div>
</template>

<script>
import vuexMappers from 'vuex'
import MobileDetect from 'mobile-detect'
import Navbar from '~/components/Navbar'
import PageFooter from '~/components/PageFooter'

export default {
  name: 'DefaultLayout',
  components: {
    Navbar,
    PageFooter,
  },
  computed: {
    ...vuexMappers.mapGetters('mobileDetect', {isMobile: 'isMobile'}),
    classBinding() {
      return {'grid-layout': this.$route.name !== 'index' || this.isMobile}
    },
  },
  watch: {
    $mq() {
      this.register({mq: this.$mq})
    },
  },
  mounted() {
    let md = new MobileDetect(window.navigator.userAgent)
    this.register({
      mobile: md.mobile(),
      phone: md.phone(),
      tablet: md.tablet(),
      os: md.os(),
      userAgent: md.userAgent(),
      mq: this.$mq,
    })
  },
  methods: {
    ...vuexMappers.mapMutations('mobileDetect', {
      register: 'register',
    }),
  },
}
</script>


<style scoped>
#default-layout {
  width: 100vw;
  height: 100vh;
}

#default-layout.grid-layout {
  display: grid;
  grid-template-rows: min-content auto min-content;
}

#content-grid-pane {
  overflow-y: scroll;
  overflow-x: hidden;
}

#content-grid-pane::-webkit-scrollbar {
  width: 0;
}
</style>
