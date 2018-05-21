<template>
  <transition name="layout"
              mode="out-in">
    <div id="default-layout">
      <div id="header-grid-pane">
        <nav-header/>
      </div>
      <div id="content-grid-pane">
        <nuxt/>
      </div>
      <div id="footer-grid-pane">
        <copyright-text/>
      </div>
    </div>
  </transition>
</template>

<script>
import vuexMappers from 'vuex'
import MobileDetect from 'mobile-detect'
import CopyrightText from '~/components/CopyrightText'
import NavHeader from '~/components/NavHeader'

export default {
  name: 'DefaultLayout',
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
#default-layout {
  height: 100vh;
  width: 100vw;
  display: grid;
  grid-gap: 0;
  grid-template-columns: 100%;
  grid-template-rows: min-content auto min-content;
}

#header-grid-pane {
  padding: 0;
}

#content-grid-pane {
  padding: 0;
  overflow-y: scroll;
  overflow-x: hidden;
}

#content-grid-pane::-webkit-scrollbar {
  width: 0;
}

#footer-grid-pane {
  padding: 0;
  display: flex;
}
</style>
