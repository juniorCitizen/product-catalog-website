<template>
  <v-container class="pa-0 mb-1"
               fluid>
    <v-layout>
      <v-flex>
        <v-card class="pa-0"
                color="green darken-4"
                flat>
          <v-card-title class="display-1 font-weight-black font-italic white--text">
            <transition name="fade"
                        mode="out-in">
              <span :key="title.key">
                {{ title.text }}
              </span>
            </transition>
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'PageTitle',
  computed: {
    ...mapState({routingInProgress: 'routingInProgress'}),
    title() {
      if (this.routingInProgress) {
        return {
          key: 'routingInProgress',
          text: 'Loading...',
        }
      }
      switch (this.$route.path) {
        case '/':
          return {
            key: 'atHomePage',
            text: 'Home',
          }
        case '/catalog':
          return {
            key: 'atCatalogPage',
            text: 'Product Catalog',
          }
        case '/contacts':
          return {
            key: 'atContactPage',
            text: 'Contact Us',
          }
        default:
          return {
            key: 'default',
            text: 'Loading...',
          }
      }
    },
  },
}
</script>

<style scoped>
.fade-enter-active {
  transition: opacity 0.5s;
}

.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
