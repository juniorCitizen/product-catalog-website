<template>
  <nuxt-link
    :class="{'is-active':$route.name==='contact'}"
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
