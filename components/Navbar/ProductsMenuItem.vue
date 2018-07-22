<template>
  <nuxt-link
    :class="classBinding"
    :tag="isAtAltCatalogPage&&mobileMenuEnabled?'div':'a'"
    class="nuxt-link-container navbar-item"
    to="/products">
    <template v-if="isAtAltCatalogPage&&mobileMenuEnabled">
      <a class="navbar-link">
        PRODUCTS
      </a>
      <div class="navbar-dropdown is-paddingless">
        <div class="navbar-item is-paddingless">
          <alt-catalog-tree-menu/>
        </div>
      </div>
    </template>
    <span v-else>PRODUCTS</span>
  </nuxt-link>
</template>

<script>
import vuexMappers from 'vuex'
import AltCatalogTreeMenu from '~/components/AltCatalogTreeMenu'
export default {
  name: 'ProductsMenuItem',
  components: {
    AltCatalogTreeMenu,
  },
  computed: {
    ...vuexMappers.mapGetters('mobileDetect', {
      isMobile: 'isMobile',
      isUnderBulmaNavLimit: 'isUnderBulmaNavLimit',
    }),
    mobileMenuEnabled() {
      return this.isMobile || this.isUnderBulmaNavLimit
    },
    isAtAltCatalogPage() {
      return this.$route.name.toLowerCase() === 'products'
    },
    classBinding() {
      return {
        'is-active': this.isAtAltCatalogPage,
        'has-dropdown': this.isAtAltCatalogPage && this.mobileMenuEnabled,
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
