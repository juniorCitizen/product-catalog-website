<template>
  <p :class="{'is-active':category.isActive}"
     class="menu-label"
     @click="handleSelection">
    <span class="icon is-small">
      <fa :icon="classBinding" />
    </span>
    <span class="root-menu-label">
      {{ category.name }}
    </span>
    <transition name="fade">
      <span v-show="category.isLoading"
            class="icon is-small">
        <fa :icon="['fas', 'spinner']"
            spin />
      </span>
    </transition>
  </p>
</template>

<script>
import vuexMappers from 'vuex'
export default {
  name: 'RootCategoryEntry',
  props: {
    category: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  computed: {
    ...vuexMappers.mapGetters('altCatalog', {
      catalog: 'catalog',
      activeRootCategoryIndex: 'activeRootCategoryIndex',
    }),
    classBinding() {
      const caret = this.category.isActive ? 'caret-down' : 'caret-up'
      return ['fas', caret]
    },
  },
  methods: {
    ...vuexMappers.mapActions('altCatalog', {
      fetchCategory: 'fetchCategory',
    }),
    ...vuexMappers.mapMutations('altCatalog', {
      deactivateSubcategories: 'deactivateSubcategories',
    }),
    handleSelection() {
      if (this.activeRootCategoryIndex === null) {
        this.fetchCategory({category: this.category})
      } else if (this.category.isActive) {
        this.deactivateSubcategories({category: this.catalog})
        this.fetchCategory({category: this.catalog})
      } else {
        this.deactivateSubcategories({category: this.catalog})
        this.fetchCategory({category: this.category})
      }
    },
  },
}
</script>

<style>
span {
  white-space: nowrap;
  cursor: default;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
p.is-active > span:not(.icon),
p:not(.is-active):hover > span:not(.icon) {
  font-weight: 400;
  text-shadow: 1px 1px lightgray;
}
</style>
