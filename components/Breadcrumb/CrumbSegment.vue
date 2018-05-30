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
    ...vuexMappers.mapState('catalog', {
      catalog: 'catalog',
    }),
    ...vuexMappers.mapGetters('catalog', {
      paginationInfo: 'paginationInfo',
    }),
  },
  methods: {
    ...vuexMappers.mapActions('catalog', {
      fetchCategory: 'fetchCategory',
    }),
    clickHandler() {
      this.fetchCategory({category: this.category})
        .then(() => Promise.resolve())
        .catch(error => {
          console.log(error)
          return Promise.reject(error)
        })
    },
  },
}
</script>
