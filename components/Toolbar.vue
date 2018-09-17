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
      <v-btn nuxt
             to="/"
             flat
             small>
        <v-icon left
                small
                class="mr-1">
          home
        </v-icon>
        HOME
      </v-btn>
      <v-btn nuxt
             to="/catalog"
             flat
             small>
        <v-icon left
                small
                class="mr-1">
          store
        </v-icon>
        CATALOG
      </v-btn>
      <v-btn nuxt
             to="/contacts"
             flat
             small>
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
export default {
  name: 'Toolbar',
  data() {
    return {
      logoImage: require('@/assets/logo.png'),
      websiteTitle: process.env.websiteTitle,
      drawerIsVisible: false,
    }
  },
}
</script>

<style scoped>
.website-logo {
  width: 105px;
  background-color: #eeeeee;
}
</style>
