<template>
  <header id="nav-header">
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
    $route() {
      this.mobileMenuIsActive = false
    },
  },
}
</script>
