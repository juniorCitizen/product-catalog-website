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
      <v-container class="ma-0 pa-0"
                   fill-height
                   fluid>
        <v-layout class="ma-0 pa-0"
                  fill-height
                  column>
          <v-flex class="ma-0 pa-0"
                  xs12>
            <transition name="retract">
              <page-title v-if="showPageTitle"/>
            </transition>
            <v-container class="ma-0 pa-0"
                         grid-list-lg
                         fluid>
              <nuxt/>
            </v-container>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <site-footer/>
    <loading-overlay/>
  </v-app>
</template>

<script>
import {mapState} from 'vuex'

import DrawerList from '@/components/DrawerList'
import Toolbar from '@/components/Toolbar'
import PageTitle from '@/components/PageTitle'
import SiteFooter from '@/components/SiteFooter'
import LoadingOverlay from '@/components/LoadingOverlay'

export default {
  name: 'DefaultLayout',
  components: {
    DrawerList,
    Toolbar,
    PageTitle,
    SiteFooter,
    LoadingOverlay,
  },
  data() {
    return {
      loadingOverlayVisible: false,
      drawerIsVisible: false,
      prevHeight: 0,
    }
  },
  computed: {
    ...mapState({routingInProgress: 'routingInProgress'}),
    showPageTitle() {
      const atHomePage = this.$route.path === '/'
      return !atHomePage || (this.routingInProgress && atHomePage)
    },
  },
  watch: {
    routingInProgress(inProgress) {
      this.loadingOverlayVisible = inProgress
      if (inProgress) this.drawerIsVisible = false
    },
  },
}
</script>

<style scoped>
#default-layout {
  width: 100vw;
}

.retract-enter-active {
  transition: all 1s ease-in-out;
}

.retract-leave-active {
  transition: all 0.5s ease-out;
  position: absolute;
}

.retract-enter,
.retract-leave-to {
  transform: translateY(-100%);
}
</style>
