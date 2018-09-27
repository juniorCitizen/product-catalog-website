<template>
  <v-container class="pa-0 ma-0"
               fluid>
    <v-layout>
      <v-flex>
        <v-card color="green darken-4"
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
    atHomePage() {
      return this.$route.path === '/'
    },
    browsingCatalog() {
      return this.$route.path.indexOf('/catalog') === 0
    },
    atContactPage() {
      return this.$route.path === '/contacts'
    },
    title() {
      if (this.routingInProgress) {
        return {
          key: 'routingInProgress',
          text: 'Loading...',
        }
      } else if (this.browsingCatalog) {
        return {
          key: 'browsingCatalog',
          text: 'Product Catalog',
        }
      } else if (this.atContactPage) {
        return {
          key: 'atContactPage',
          text: 'Contact Us',
        }
      } else {
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

/* .retract-enter-active {
  transition: transform 0.7s ease-out;
} */

/* .retract-leave-active {
  transition: transform 0.3s ease-in-out;
} */

/* .retract-enter,
.retract-leave-to {
  transform: translateY(-100%);
} */
</style>
