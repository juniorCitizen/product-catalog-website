<template>
  <transition name="layout"
              mode="out-in">
    <div id="parallax-layout">
      <div id="header-grid-pane">
        <nav-header/>
      </div>
      <nuxt/>
      <copyright-text/>
    </div>
  </transition>
</template>

<script>
import vuexMappers from 'vuex'
import MobileDetect from 'mobile-detect'
import CopyrightText from '../components/CopyrightText'
import NavHeader from '../components/NavHeader'

export default {
  name: 'ParallaxLayout',
  components: {
    CopyrightText,
    NavHeader,
  },
  mounted() {
    let md = new MobileDetect(window.navigator.userAgent)
    this.register({
      mobile: md.mobile(),
      phone: md.phone(),
      tablet: md.tablet(),
      os: md.os(),
      userAgent: md.userAgent(),
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
#parallax-layout {
  width: 100vw;
}

#header-grid-pane {
  position: -webkit-sticky;
  position: sticky;
  top: 0px;
}
</style>
