<template>
  <div class="page-indicator">
    <div class="buttons has-addons is-centered">
      <button v-if="paginationInfo.totalProductCount>0"
              :disabled="isFirstPage"
              class="button is-small"
              @click="toPage(paginationInfo.currentPage-1)">
        <span class="icon is-small"
              @click.prevent>
          <fa :icon="['fas', 'angle-left']" />
        </span>
        <span class="direction-button-text"
              @click.prevent>
          GO TO PREVIOUS PAGE
        </span>
      </button>
      <a v-if="paginationInfo.totalProductCount===0"
         class="page-number-indicator button is-small">
        <span>NOTHING IN THIS CATEGORY</span>
      </a>
      <a v-else-if="isFirstPage&&!isOnlyPage"
         class="page-number-indicator button is-small">
        <span>FIRST PAGE</span>
      </a>
      <a v-else-if="isLastPage"
         class="page-number-indicator button is-small">
        <span>LAST PAGE</span>
      </a>
      <a v-else
         class="page-number-indicator button is-small">
        <span>
          PAGE {{ paginationInfo.currentPage }}
        </span>
      </a>
      <button v-if="paginationInfo.totalProductCount>0"
              :disabled="isLastPage"
              class="button is-small"
              @click="toPage(paginationInfo.currentPage+1)">
        <span class="direction-button-text">
          GO TO NEXT PAGE
        </span>
        <span class="icon is-small">
          <fa :icon="['fas', 'angle-right']" />
        </span>
      </button>
    </div>
  </div>
</template>

<script>
import vuexMappers from 'vuex'
export default {
  name: 'PageIndicator',
  computed: {
    ...vuexMappers.mapGetters('altCatalog', {
      paginationInfo: 'paginationInfo',
      breadcrumb: 'breadcrumb',
    }),
    activeCategory() {
      return this.breadcrumb[this.breadcrumb.length - 1]
    },
    isOnlyPage() {
      return this.paginationInfo.totalPages === 1
    },
    isFirstPage() {
      return this.paginationInfo.currentPage === 1
    },
    isLastPage() {
      return this.paginationInfo.currentPage === this.paginationInfo.totalPages
    },
  },
  methods: {
    ...vuexMappers.mapActions('altCatalog', {
      fetchProducts: 'fetchProducts',
    }),
    toPage(pageNumber) {
      if (pageNumber !== this.currentPage) {
        return this.fetchProducts({
          category: this.activeCategory,
          page: pageNumber,
        }).catch(console.error)
      }
    },
  },
}
</script>

<style scoped>
.page-indicator {
  height: min-content;
  grid-column: 1/-1;
  display: flex;
  justify-content: center;
}
a.page-number-indicator {
  pointer-events: none;
}
@media only screen and (max-width: 640px) {
  .direction-button-text {
    display: none;
  }
}
</style>
