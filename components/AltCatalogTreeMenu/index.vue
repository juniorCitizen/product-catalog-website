<template>
  <div class="menu-container">
    <aside class="menu">
      <template v-for="category in catalog.subcategories">
        <root-category-entry :key="category.slug+'-root-category'"
                             :category="category"/>
        <subcategory-section v-if="category.isActive&&category.subcategories.length>0"
                             :key="category.slug+'-subcategories'"
                             :parent-category="category"
                             :categories="category.subcategories"/>
      </template>
      <template v-if="!isUnderBulmaNavLimit">
        <p class="menu-label">&nbsp;</p>
        <p class="menu-label">&nbsp;</p>
      </template>
    </aside>
  </div>
</template>

<script>
import vuexMappers from 'vuex'
import RootCategoryEntry from './RootCategoryEntry'
import SubcategorySection from './SubcategorySection'
export default {
  name: 'AltCatalogTreeMenu',
  components: {
    RootCategoryEntry,
    SubcategorySection,
  },
  computed: {
    ...vuexMappers.mapGetters('altCatalog', {catalog: 'catalog'}),
    ...vuexMappers.mapGetters('mobileDetect', {
      isUnderBulmaNavLimit: 'isUnderBulmaNavLimit',
    }),
  },
}
</script>

<style scoped>
div.menu-container {
  box-sizing: border-box;
  grid-area: tree-menu;
  max-width: 300px;
  /* width: max-content; */
  justify-self: start;
  overflow-y: scroll;
  padding: 20px 20px 0px 20px;
}
@media only screen and (max-width: 1087px) {
  div.menu-container {
    max-height: 50vh;
    padding: 5px 0 5px 10px;
  }
}
div.menu-container::-webkit-scrollbar {
  width: 0;
}
aside.menu {
  box-sizing: border-box;
  margin: 0;
}
</style>
