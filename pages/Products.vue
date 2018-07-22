<template>
  <section id="products"
           :class="classBinding">
    <alt-catalog-tree-menu v-if="!mobileLayouteEnabled"/>
    <alt-breadcrumb/>
    <alt-product-browser/>
    <alt-pagination v-if="paginationInfo.totalPages>1"/>
    <!-- <product-details v-if="activeProduct"/> -->
  </section>
</template>

<script>
import vuexMappers from 'vuex'
import AltCatalogTreeMenu from '~/components/AltCatalogTreeMenu'
import AltBreadcrumb from '~/components/AltBreadcrumb'
import AltProductBrowser from '~/components/AltProductBrowser'
import AltPagination from '~/components/AltPagination'
// import ProductDetails from '~/components/ProductDetails'
export default {
  name: 'Products',
  layout: 'default',
  components: {
    AltCatalogTreeMenu,
    AltBreadcrumb,
    AltProductBrowser,
    AltPagination,
    // ProductDetails,
  },
  fetch({store}) {
    let catalog = store.getters['altCatalog/catalog']
    return catalog.isActive
      ? Promise.resolve()
      : store
          .dispatch('altCatalog/fetchCategory', {category: catalog})
          .catch(console.error)
  },
  computed: {
    ...vuexMappers.mapGetters('mobileDetect', {
      isMobile: 'isMobile',
      isUnderBulmaNavLimit: 'isUnderBulmaNavLimit',
    }),
    ...vuexMappers.mapGetters('altCatalog', {
      activeProduct: 'activeProduct',
      paginationInfo: 'paginationInfo',
    }),
    mobileLayouteEnabled() {
      return this.isMobile || this.isUnderBulmaNavLimit
    },
    classBinding() {
      return {
        'desktop-layout': !this.mobileLayouteEnabled,
        'mobile-layout': this.mobileLayouteEnabled,
      }
    },
  },
}
</script>

<style scoped>
#products {
  box-sizing: border-box;
  padding: 0;
  width: 100%;
  height: 100%;
  display: grid;
}
#products.desktop-layout {
  grid-column-gap: 5px;
  grid-row-gap: 5px;
  grid-template-columns: max-content min-content auto;
  grid-template-rows: auto auto auto;
  grid-template-areas:
    'tree-menu . breadcrumb'
    'tree-menu . product-browser'
    'tree-menu . pagination';
}
#products.mobile-layout {
  grid-template-columns: auto;
  grid-template-rows: min-content auto min-content;
  grid-template-areas:
    'breadcrumb'
    'product-browser'
    'pagination';
}
</style>
