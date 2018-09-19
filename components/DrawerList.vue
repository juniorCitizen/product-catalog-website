<template>
  <v-list dense>
    <v-list-tile :class="classBinding('/')"
                 @click.stop="toPath('/')">
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
                 @click.stop="toPath('/catalog')">
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
                 @click.stop="toPath('/contacts')">
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
import preRouting from '@/mixins/preRouting'

export default {
  name: 'DrawerList',
  mixins: [preRouting],
  methods: {
    classBinding(path) {
      return {
        'primary--text': this.$route.path === path,
        'font-weight-black': this.$route.path === path,
        subheading: this.$route.path === path,
      }
    },
  },
}
</script>
