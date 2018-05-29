<template>
  <nuxt-link
    :class="{'is-active':$route.name==='catalog'}"
    class="navbar-item has-dropdown"
    to="/catalog"
    tag="div">
    <a class="navbar-link">
      CATALOG
    </a>
    <div class="navbar-dropdown">
      <div class="navbar-item dropdown-catalog-frame">
        category menu placeholder
        <!-- <category-menu/> -->
      </div>
    </div>
  </nuxt-link>
</template>

<script>
export default {
  name: 'CatalogNavbarStartMenuItem',
}
</script>

<style scoped>
.dropdown-catalog-frame {
  margin-left: 10px;
}
</style>
