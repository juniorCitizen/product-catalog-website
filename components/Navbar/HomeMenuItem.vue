<template>
  <nuxt-link
    :class="{'is-active':$route.name.toLowerCase()==='index'}"
    class="navbar-item"
    to="/"
    tag="a">
    <span>HOME</span>
  </nuxt-link>
</template>

<script>
export default {
  name: 'HomeMenuItem',
}
</script>

<style scoped>
a.is-active span {
  color: #3273dc;
}
</style>
