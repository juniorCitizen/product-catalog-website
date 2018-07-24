<template>
  <div :class="classBinding"
       class="navbar-menu">
    <navbar-start-end/>
  </div>
</template>

<script>
import vuexMappers from 'vuex'
import NavbarStartEnd from './NavbarStartEnd'
export default {
  name: 'NavbarMenu',
  components: {NavbarStartEnd},
  props: {
    mobileMenuIsActive: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...vuexMappers.mapGetters('mobileDetect', {
      isMobile: 'isMobile',
      isUnderBulmaNavLimit: 'isUnderBulmaNavLimit',
    }),
    mobileMenuEnabled() {
      return this.isMobile || this.isUnderBulmaNavLimit
    },
    classBinding() {
      return {
        'mobile-layout': this.mobileMenuEnabled,
        'is-active': this.mobileMenuIsActive,
      }
    },
  },
}
</script>

<style scoped>
.navbar-menu.mobile-layout {
  position: absolute;
  width: 100%;
}
</style>
