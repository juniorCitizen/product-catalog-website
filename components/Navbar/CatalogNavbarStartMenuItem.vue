<template>
  <nuxt-link
    :class="{'is-active':$route.name==='catalog'}"
    class="navbar-item has-dropdown"
    to="/catalog"
    tag="div">
    <a class="navbar-link">
      CATALOG
    </a>
    <div class="navbar-dropdown is-paddingless">
      <div class="navbar-item dropdown-catalog-frame is-paddingless">
        <catalog-tree-menu/>
      </div>
    </div>
  </nuxt-link>
</template>

<script>
import CatalogTreeMenu from '~/components/CatalogTreeMenu'
export default {
  name: 'CatalogNavbarStartMenuItem',
  components: {
    CatalogTreeMenu,
  },
}
</script>

<style scoped>
.dropdown-catalog-frame {
  margin-left: 10px;
}
</style>
