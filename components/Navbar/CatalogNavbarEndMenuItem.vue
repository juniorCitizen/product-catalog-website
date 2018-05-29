<template>
  <nuxt-link
    :class="{'is-active':$route.name==='catalog'}"
    class="navbar-item"
    to="/catalog"
    tag="a">
    <span>CATALOG</span>
  </nuxt-link>
</template>

<script>
export default {
  name: 'CatalogNavbarEndMenuItem',
}
</script>
