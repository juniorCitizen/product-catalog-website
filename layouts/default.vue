<template>
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
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-gap: 0;
  grid-template-columns: 100%;
  grid-template-rows: min-content auto min-content;
}

#header-grid-pane {
  position: -webkit-sticky;
  position: sticky;
  top: 0px;
}

#content-grid-pane {
  overflow-y: scroll;
  overflow-x: hidden;
}

#content-grid-pane::-webkit-scrollbar {
  width: 0;
}

#footer-grid-pane {
  display: flex;
  position: -webkit-sticky;
  position: sticky;
  bottom: 0px;
}
</style>
