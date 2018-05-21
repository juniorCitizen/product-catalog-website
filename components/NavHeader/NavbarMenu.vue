<template>
  <div id="navbar-menu"
       :class="{'is-active':mobileMenuIsActive}"
       class="navbar-menu">
    <navbar-start/>
    <navbar-end/>
  </div>
</template>

<script>
import NavbarStart from './NavbarStart'
import NavbarEnd from './NavbarEnd'
// import VerticalMenu from '~/components/catalogPage/VerticalMenu'

export default {
  name: 'NavbarMenu',
  components: {
    NavbarStart,
    NavbarEnd,
    // VerticalMenu,
  },
  props: {
    mobileMenuIsActive: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    mobileMenuEnabled() {
      return (
        this.$mq === 'mobile' ||
        this.$mq === 'tablet' ||
        this.$mq === 'bulmaNavLimit'
      )
    },
  },
}
</script>

<style scoped>
@media only screen and (max-width: 1087px) {
  #navbar-menu {
    position: absolute;
    width: 100%;
  }
}
</style>
