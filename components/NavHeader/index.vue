<template>
  <div id="navbar-container"
       :class="classBinding">
    <header>
      <nav class="navbar"
           role="navigation">
        <div class="navbar-brand">
          <company-logo/>
          <hamburger-button :is-active="mobileMenuIsActive"
                            @clicked="mobileMenuIsActive=!mobileMenuIsActive"/>
        </div>
        <navbar-menu :mobile-menu-is-active="mobileMenuIsActive"/>
      </nav>
    </header>
  </div>
</template>

<script>
import CompanyLogo from './CompanyLogo'
import HamburgerButton from './HamburgerButton'
import NavbarMenu from './NavbarMenu'

export default {
  name: 'NavHeader',
  components: {
    CompanyLogo,
    HamburgerButton,
    NavbarMenu,
  },
  data() {
    return {
      mobileMenuIsActive: false,
    }
  },
  computed: {
    classBinding() {
      return {fixed: this.$route.name === 'index'}
    },
  },
  watch: {
    $mq(newSize, prevSize) {
      let wasUnderLimit =
        prevSize === 'mobile' ||
        prevSize === 'tablet' ||
        prevSize === 'bulmaNavLimit'
      let isOverLimit =
        newSize === 'desktop' ||
        newSize === 'widescreen' ||
        newSize === 'fullhd'
      if (wasUnderLimit && isOverLimit) {
        this.mobileMenuIsActive = false
      }
    },
    $route(newRoute) {
      if (newRoute.name !== 'catalog') {
        this.mobileMenuIsActive = false
      }
    },
  },
}
</script>

<style scoped>
#navbar-container {
  width: 100vw;
}

#navbar-container.fixed {
  position: fixed;
  top: 0;
  z-index: 1;
}
</style>
