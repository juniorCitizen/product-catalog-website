<template>
  <nuxt-link
    :class="classBinding"
    :tag="isAtCatalogPage&&mobileMenuEnabled?'div':'a'"
    class="nuxt-link-container navbar-item"
    to="/catalog">
    <template v-if="isAtCatalogPage&&mobileMenuEnabled">
      <a class="navbar-link">
        CATALOG
      </a>
      <div class="navbar-dropdown is-paddingless">
        <div class="navbar-item is-paddingless">
          <catalog-tree-menu/>
        </div>
      </div>
    </template>
    <span v-else>CATALOG</span>
  </nuxt-link>
</template>

<script>
import vuexMappers from 'vuex'
import CatalogTreeMenu from '~/components/CatalogTreeMenu'
export default {
  name: 'CatalogMenuItem',
  components: {
    CatalogTreeMenu,
  },
  computed: {
    ...vuexMappers.mapGetters('mobileDetect', {
      isMobile: 'isMobile',
      isUnderBulmaNavLimit: 'isUnderBulmaNavLimit',
    }),
    mobileMenuEnabled() {
      return this.isMobile || this.isUnderBulmaNavLimit
    },
    isAtCatalogPage() {
      return this.$route.name.toLowerCase() === 'catalog'
    },
    classBinding() {
      return {
        'is-active': this.isAtCatalogPage,
        'has-dropdown': this.isAtCatalogPage && this.mobileMenuEnabled,
      }
    },
  },
}
</script>

<style scoped>
.navbar-dropdown div.navbar-item {
  margin-left: 10px;
}
.nuxt-link-container {
  font-weight: 900;
  font-size: 14.4px;
}
.nuxt-link-container.is-active span {
  color: #3273dc;
}
a.navbar-link {
  color: #3273dc;
  background-color: #fafafa;
}
</style>
