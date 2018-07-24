<template>
  <nuxt-link
    :class="classBinding"
    class="navbar-item"
    to="/"
    tag="a">
    <span>HOME</span>
  </nuxt-link>
</template>

<script>
export default {
  name: 'HomeMenuItem',
  computed: {
    classBinding() {
      return {
        'is-active': this.$route.path === '/',
      }
    },
  },
}
</script>

<style scoped>
a.is-active span {
  color: #3273dc;
}
</style>
