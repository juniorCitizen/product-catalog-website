<template>
  <div :class="classBinding"
       class="navbar-menu">
    <!-- DO NOT CHANGE TO 'v-if' -->
    <navbar-start v-show="isUnderBulmaNavLimit"/>
    <navbar-end/>
  </div>
</template>

<script>
import vuexMappers from 'vuex'
import NavbarStart from './NavbarStart'
import NavbarEnd from './NavbarEnd'

export default {
  name: 'NavbarMenu',
  components: {
    NavbarStart,
    NavbarEnd,
  },
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
    classBinding() {
      return {
        'mobile-layout': this.mobileMenuEnabled,
        'is-active': this.mobileMenuIsActive,
      }
    },
    mobileMenuEnabled() {
      return this.isMobile || this.isUnderBulmaNavLimit
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
