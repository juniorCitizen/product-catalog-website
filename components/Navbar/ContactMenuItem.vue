<template>
  <nuxt-link
    :class="{'is-active':$route.name.toLowerCase()==='contact'}"
    class="navbar-item"
    to="/contact"
    tag="a">
    <span>CONTACT</span>
  </nuxt-link>
</template>

<script>
export default {
  name: 'ContactMenuItem',
}
</script>

<style scoped>
a.is-active span {
  color: #3273dc;
}
</style>
