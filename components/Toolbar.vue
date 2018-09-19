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
      <v-btn :class="{'v-btn--active':$route.path==='/'}"
             flat
             small
             @click.stop="toPath('/')">
        <v-icon left
                small
                class="mr-1">
          home
        </v-icon>
        HOME
      </v-btn>
      <v-btn :class="{'v-btn--active':$route.path==='/catalog'}"
             flat
             small
             @click.stop="toPath('/catalog')">
        <v-icon left
                small
                class="mr-1">
          store
        </v-icon>
        CATALOG
      </v-btn>
      <v-btn :class="{'v-btn--active':$route.path==='/contacts'}"
             flat
             small
             @click.stop="toPath('/contacts')">
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
}
</script>

<style scoped>
.website-logo {
  width: 80px;
  background-color: #eeeeee;
}
</style>
