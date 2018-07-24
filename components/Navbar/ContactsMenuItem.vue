<template>
  <nuxt-link
    :class="classBinding"
    class="navbar-item"
    to="/contacts"
    tag="a">
    <span>CONTACTS</span>
  </nuxt-link>
</template>

<script>
export default {
  name: 'ContactsMenuItem',
  computed: {
    classBinding() {
      return {
        'is-active': this.$route.path === '/contacts',
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
