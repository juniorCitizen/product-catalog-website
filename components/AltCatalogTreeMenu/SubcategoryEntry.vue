<template>
  <a :class="{'is-active':isActive&&!hasActiveSubcategory}"
     @click="handleSelection">
    <span :class="{'has-text-light':isActive&&!hasActiveSubcategory}"
          class="submenu-label">
      {{ category.name }}
    </span>
    <transition name="fade">
      <span v-show="category.isLoading"
            class="icon is-small">
        <i class="fas fa-spinner fa-pulse"/>
      </span>
    </transition>
  </a>
</template>

<script>
import vuexMappers from 'vuex'
export default {
  name: 'SubcategoryEntry',
  props: {
    parentCategory: {
      type: Object,
      default() {
        return {}
      },
    },
    category: {
      type: Object,
      default() {
        return {}
      },
    },
    categoryIndex: {
      type: Number,
      default: null,
    },
  },
  computed: {
    ...vuexMappers.mapGetters('altCatalog', {
      breadcrumb: 'breadcrumb',
    }),
    isActive() {
      return this.category.isActive
    },
    hasActiveSubcategory() {
      if (!this.isActive) return false
      let subcategories = this.category.subcategories
      return (
        subcategories.findIndex(subcategory => {
          return subcategory.isActive
        }) !== -1
      )
    },
    activeSiblingCategoryIndex() {
      if (this.isActive) return this.categoryIndex
      let activeIndex = this.parentCategory.subcategories.findIndex(
        category => {
          return category.isActive === true
        }
      )
      return activeIndex === -1 ? null : activeIndex
    },
  },
  methods: {
    ...vuexMappers.mapActions('altCatalog', {
      fetchCategory: 'fetchCategory',
      fetchProducts: 'fetchProducts',
    }),
    ...vuexMappers.mapMutations('altCatalog', {
      deactivateSubcategories: 'deactivateSubcategories',
    }),
    handleSelection() {
      if (this.activeSiblingCategoryIndex === null) {
        this.fetchCategory({category: this.category})
      } else if (this.category.isActive) {
        this.deactivateSubcategories({category: this.parentCategory})
        this.fetchCategory({category: this.parentCategory})
      } else {
        this.deactivateSubcategories({category: this.parentCategory})
        this.fetchCategory({category: this.category})
      }
    },
  },
}
</script>

<style scoped>
li,
a {
  cursor: default;
}
span.submenu-label {
  color: darkgray;
  font-size: 75%;
  white-space: normal;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
