<template>
  <div :class="classBinding"
       class="menu-container">
    <aside
      class="menu">
      <template v-for="category in catalog.subcategories">
        <root-category-entry :key="category.slug+'-root-category'"
                             :category="category"/>
        <subcategory-section v-if="category.isActive&&category.subcategories.length>0"
                             :key="category.slug+'-subcategories'"
                             :parent-category="category"
                             :categories="category.subcategories"/>
      </template>
      <p class="menu-label">&nbsp;</p>
      <p class="menu-label">&nbsp;</p>
    </aside>
  </div>
</template>

<script>
import vuexMappers from 'vuex'
import RootCategoryEntry from './RootCategoryEntry'
import SubcategorySection from './SubcategorySection'
export default {
  name: 'CatalogTreeMenu',
  components: {
    RootCategoryEntry,
    SubcategorySection,
  },
  computed: {
    ...vuexMappers.mapGetters('catalog', {
      catalog: 'catalog',
    }),
    ...vuexMappers.mapGetters('mobileDetect', {
      isMobile: 'isMobile',
      mq: 'mq',
    }),
    classBinding() {
      return {
        invisible: this.isMobile || this.mq === 'mobile',
      }
    },
  },
}
</script>

<style scoped>
div.menu-container {
  box-sizing: border-box;
  grid-area: tree-menu;
  width: max-content;
  justify-self: start;
  overflow-y: scroll;
  padding: 20px 20px 0px 5px;
}
div.menu-container::-webkit-scrollbar {
  width: 0;
}
div.menu-container.invisible {
  display: none;
}
aside.menu {
  box-sizing: border-box;
  margin: 0;
}
</style>
