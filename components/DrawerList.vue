<template>
  <v-list dense>
    <nuxt-link :to="{path:'/'}"
               tag="v-list-tile">
      <v-list-tile-action>
        <v-icon :color="vListIconColor('/')">
          home
        </v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>
          HOME
        </v-list-tile-title>
      </v-list-tile-content>
    </nuxt-link>
    <nuxt-link :to="{path:'/catalog'}"
               tag="v-list-tile">
      <v-list-tile-action>
        <v-icon :color="vListIconColor('/catalog')">
          store
        </v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>
          CATALOG
        </v-list-tile-title>
      </v-list-tile-content>
    </nuxt-link>
    <nuxt-link :to="{path:'/contacts'}"
               tag="v-list-tile">
      <v-list-tile-action>
        <v-icon :color="vListIconColor('/contacts')">
          phone
        </v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>
          CONTACTS
        </v-list-tile-title>
      </v-list-tile-content>
    </nuxt-link>
  </v-list>
</template>

<script>
export default {
  name: 'DrawerList',
  methods: {
    vListIconColor(path) {
      return this.$route.path === path ? 'primary' : 'grey lighten-2'
    },
  },
}
</script>
