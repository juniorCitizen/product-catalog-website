<template>
  <div id="default-layout">
    <div id="header-grid-pane">
      header grid
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
import CopyrightText from '../components/CopyrightText'

export default {
  name: 'DefaultLayout',
  components: {CopyrightText},
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
      register: 'registerDetectionResults',
    }),
  },
}
</script>


<style>
html,
body {
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-text-size-adjust: 100%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow: hidden;
  box-sizing: border-box;
  height: 100vh;
  width: 100vw;
  padding: 0;
  margin: 0;
}

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
