<template>
  <v-app id="default-layout">
    <v-navigation-drawer v-model="drawerIsVisible"
                         class="grey lighten-3"
                         stateless
                         clipped
                         app>
      <drawer-list/>
    </v-navigation-drawer>
    <toolbar @sideIconClicked="drawerIsVisible=!drawerIsVisible"/>
    <v-content>
      <nuxt/>
    </v-content>
    <site-footer/>
    <loading-overlay/>
  </v-app>
</template>

<script>
import {mapState} from 'vuex'

import DrawerList from '@/components/DrawerList'
import LoadingOverlay from '@/components/LoadingOverlay'
import SiteFooter from '@/components/SiteFooter'
import Toolbar from '@/components/Toolbar'

export default {
  name: 'DefaultLayout',
  components: {
    DrawerList,
    LoadingOverlay,
    SiteFooter,
    Toolbar,
  },
  data() {
    return {
      loadingOverlayVisible: false,
      drawerIsVisible: false,
    }
  },
  computed: {
    ...mapState({routingInProgress: 'routingInProgress'}),
  },
  watch: {
    $route() {
      if (this.drawerIsVisible) {
        this.drawerIsVisible = !this.drawerIsVisible
      }
    },
    routingInProgress(inProgress) {
      this.loadingOverlayVisible = inProgress
    },
  },
}
</script>

<style scoped>
#default-layout {
  width: 100vw;
}
</style>
