<template>
  <ul :class="{'menu-list':!isSubmenu}">
    <template v-for="(category,index) in categories">
      <li :key="category.slug">
        <subcategory-entry :key="category.slug"
                           :parent-category="parentCategory"
                           :category="category"
                           :category-index="index"/>
        <subcategory-section v-if="category.isActive&&category.subcategories.length>0"
                             :parent-category="category"
                             :categories="category.subcategories"
                             :is-submenu="true"/>
      </li>
    </template>
  </ul>
</template>

<script>
import SubcategoryEntry from './SubcategoryEntry'
import SubcategorySection from './SubcategorySection'
export default {
  name: 'SubcategorySection',
  components: {
    SubcategoryEntry,
    SubcategorySection,
  },
  props: {
    parentCategory: {
      type: Object,
      default() {
        return {}
      },
    },
    categories: {
      type: Array,
      default() {
        return []
      },
    },
    isSubmenu: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style scoped>
li,
a {
  cursor: default;
}
li:hover > a:not(.is-active) > span:not(.icon) {
  text-shadow: 1px 1px lightgray;
}
ul.menu-list {
  margin-left: 15px;
}
</style>
