<template>
  <v-list dense>
    <v-list-tile :class="classBinding('/')"
                 @click.stop="processRoutingMenuSelection('/')">
      <v-list-tile-action>
        <v-icon :class="classBinding('/')">
          home
        </v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title :class="classBinding('/')">
          HOME
        </v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
    <v-list-tile :class="classBinding('/catalog')"
                 @click.stop="processRoutingMenuSelection('/catalog')">
      <v-list-tile-action>
        <v-icon :class="classBinding('/catalog')">
          store
        </v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title :class="classBinding('/catalog')">
          CATALOG
        </v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
    <v-list-tile :class="classBinding('/contacts')"
                 @click.stop="processRoutingMenuSelection('/contacts')">
      <v-list-tile-action>
        <v-icon :class="classBinding('/contacts')">
          phone
        </v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title :class="classBinding('/contacts')">
          CONTACTS
        </v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
  </v-list>
</template>

<script>
import {mapMutations} from 'vuex'

import preRouting from '@/mixins/preRouting'

export default {
  name: 'DrawerList',
  mixins: [preRouting],
  methods: {
    ...mapMutations('catalog', {resetBreadcrumbs: 'resetBreadcrumbs'}),
    classBinding(path) {
      const fullMatch = this.$route.path === path
      const partialMatch = this.$route.path.lastIndexOf(path) === 0
      return path !== '/catalog'
        ? {
            'primary--text': fullMatch,
            'font-weight-black': fullMatch,
            subheading: fullMatch,
          }
        : {
            'primary--text': partialMatch,
            'font-weight-black': partialMatch,
            subheading: partialMatch,
          }
    },
    processRoutingMenuSelection(path) {
      this.resetBreadcrumbs()
      this.toPath(path)
    },
  },
}
</script>
