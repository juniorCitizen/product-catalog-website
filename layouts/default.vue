<template>
  <v-app id="default-layout">
    <v-navigation-drawer v-model="drawerIsVisible"
                         app
                         disable-resize-watcher
                         class="grey lighten-3">
      <drawer-list/>
    </v-navigation-drawer>
    <toolbar @sideIconClicked="drawerIsVisible=!drawerIsVisible"/>
    <v-content>
      <nuxt/>
    </v-content>
    <site-footer/>
  </v-app>
</template>

<script>
import DrawerList from '@/components/DrawerList'
import Toolbar from '@/components/Toolbar'
import SiteFooter from '@/components/SiteFooter'

export default {
  name: 'DefaultLayout',
  components: {
    DrawerList,
    Toolbar,
    SiteFooter,
  },
  data() {
    return {
      drawerIsVisible: false,
    }
  },
  watch: {
    $route() {
      if (this.drawerIsVisible) {
        this.drawerIsVisible = !this.drawerIsVisible
      }
    },
  },
}
</script>

<style scoped>
#default-layout {
  width: 100vw;
}
</style>
