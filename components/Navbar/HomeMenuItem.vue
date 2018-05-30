<template>
  <nuxt-link
    :class="{'is-active':$route.name==='home'}"
    class="navbar-item"
    to="/home"
    tag="a">
    <span>HOME</span>
  </nuxt-link>
</template>

<script>
export default {
  name: 'HomeMenuItem',
}
</script>
