<template>
  <span id="hamburger-button"
        :class="{'is-active':isActive}"
        class="navbar-burger burger"
        data-target="header-menu"
        @click="$emit('clicked')">
    <span/>
    <span/>
    <span/>
  </span>
</template>

<script>
export default {
  name: 'HamburgerButton',
  props: {
    isActive: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
