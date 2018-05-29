<template>
  <nuxt-link
    :class="{'is-active':$route.name==='index'}"
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
