<template>
  <v-toolbar app
             dense
             fixed
             flat
             class="grey lighten-3">
    <v-toolbar-side-icon @click.stop="$emit('sideIconClicked')"/>
    <v-toolbar-title class="ml-0 title font-weight-bold text-uppercase font-italic">
      <img :src="logoImage"
           :alt="websiteTitle"
           class="website-logo">
    </v-toolbar-title>
    <v-spacer/>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn :class="classBinding('/')"
             flat
             small
             @click.stop="processRoutingMenuSelection('/')">
        <v-icon left
                small
                class="mr-1">
          home
        </v-icon>
        HOME
      </v-btn>
      <v-btn :class="classBinding('/catalog')"
             flat
             small
             @click.stop="processRoutingMenuSelection('/catalog')">
        <v-icon left
                small
                class="mr-1">
          store
        </v-icon>
        CATALOG
      </v-btn>
      <v-btn :class="classBinding('/contacts')"
             flat
             small
             @click.stop="processRoutingMenuSelection('/contacts')">
        <v-icon left
                small
                class="mr-1">
          phone
        </v-icon>
        CONTACTS
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import {mapMutations} from 'vuex'

import preRouting from '@/mixins/preRouting'

export default {
  name: 'Toolbar',
  mixins: [preRouting],
  data() {
    return {
      logoImage: require('@/assets/logo.png'),
      websiteTitle: process.env.websiteTitle,
      drawerIsVisible: false,
    }
  },
  methods: {
    ...mapMutations('catalog', {resetBreadcrumbs: 'resetBreadcrumbs'}),
    classBinding(path) {
      const fullMatch = this.$route.path === path
      const partialMatch = this.$route.path.lastIndexOf(path) === 0
      return path !== '/catalog'
        ? {'v-btn--active': fullMatch}
        : {'v-btn--active': partialMatch}
    },
    processRoutingMenuSelection(path) {
      this.resetBreadcrumbs()
      this.toPath(path)
    },
  },
}
</script>

<style scoped>
.website-logo {
  width: 80px;
}
</style>
