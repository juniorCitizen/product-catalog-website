<template>
  <li :class="{'is-active':isFinalCrumb}">
    <a @click="clickHandler">
      <slot/>
      <span v-if="isFinalCrumb"
            class="final-crumb">
        &nbsp;({{ paginationInfo.totalProductCount }} ITEMS)
      </span>
    </a>
  </li>
</template>

<script>
import vuexMappers from 'vuex'
export default {
  name: 'CrumbSegment',
  props: {
    isFinalCrumb: {
      type: Boolean,
      default: false,
    },
    category: {
      type: Object,
      default() {
        return this.catalog
      },
    },
  },
  computed: {
    ...vuexMappers.mapState('altCatalog', {
      catalog: 'catalog',
    }),
    ...vuexMappers.mapGetters('altCatalog', {
      paginationInfo: 'paginationInfo',
    }),
  },
  methods: {
    ...vuexMappers.mapActions('altCatalog', {
      fetchCategory: 'fetchCategory',
    }),
    clickHandler() {
      this.fetchCategory({category: this.category})
        .then(() => Promise.resolve())
        .catch(console.error)
    },
  },
}
</script>
