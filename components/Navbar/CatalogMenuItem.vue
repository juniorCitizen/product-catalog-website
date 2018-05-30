<template>
  <nuxt-link
    :class="classBinding"
    class="navbar-item"
    to="/catalog"
    tag="a">
    <template v-if="isAtCatalogPage&&mobileMenuEnabled">
      <a class="navbar-link">CATALOG</a>
      <div class="navbar-dropdown is-paddingless">
        <div class="navbar-item dropdown-catalog-frame is-paddingless">
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
      return this.$route.name === 'catalog'
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
.dropdown-catalog-frame {
  margin-left: 10px;
}
</style>
