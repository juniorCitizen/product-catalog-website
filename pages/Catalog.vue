<template>
  <section id="catalog-view"
           :class="classBinding">
    <catalog-tree-menu/>
    <breadcrumb/>
    <product-browser/>
    <pagination/>
  </section>
</template>

<script>
import vuexMappers from 'vuex'
import CatalogTreeMenu from '~/components/CatalogTreeMenu'
import Breadcrumb from '~/components/Breadcrumb'
import ProductBrowser from '~/components/ProductBrowser'
import Pagination from '~/components/Pagination'
export default {
  name: 'CatalogView',
  layout: 'default',
  components: {
    CatalogTreeMenu,
    Breadcrumb,
    ProductBrowser,
    Pagination,
  },
  fetch({store}) {
    let catalog = store.getters['catalog/catalog']
    if (!catalog.isActive) {
      return store
        .dispatch('catalog/fetchCategory', {
          category: catalog,
        })
        .catch(error => {
          console.log(error)
          return Promise.reject(error)
        })
    } else {
      return Promise.resolve()
    }
  },
  computed: {
    ...vuexMappers.mapGetters('mobileDetect', {
      isMobile: 'isMobile',
      mq: 'mq',
    }),
    ...vuexMappers.mapGetters('catalog', {catalog: 'catalog'}),
    mobileLayouteEnabled() {
      return this.isMobile || this.mq === 'mobile'
    },
    classBinding() {
      return {
        'desktop-layout': !this.mobileLayouteEnabled,
        'mobile-layout': this.mobileLayouteEnabled,
      }
    },
  },
  methods: {
    ...vuexMappers.mapActions('catalog', {
      fetchCategory: 'fetchCategory',
    }),
  },
}
</script>

<style scoped>
#catalog-view {
  box-sizing: border-box;
  padding: 0;
  width: 100%;
  height: 100%;
  display: grid;
}
#catalog-view.desktop-layout {
  grid-column-gap: 5px;
  grid-row-gap: 5px;
  grid-template-columns: max-content min-content auto;
  grid-template-rows: auto auto auto;
  grid-template-areas:
    'tree-menu . breadcrumb'
    'tree-menu . product-browser'
    'tree-menu . pagination';
}
#catalog-view.mobile-layout {
  grid-template-columns: auto;
  grid-template-rows: min-content auto min-content;
  grid-template-areas:
    'breadcrumb'
    'product-browser'
    'pagination';
}
</style>
