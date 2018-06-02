<template>
  <div class="spacer">
    <div class="buttons has-addons is-centered">
      <button :disabled="isFirstPage"
              class="button is-small"
              @click="toPage(paginationInfo.currentPage-1)">
        <span class="icon is-small"
              @click.prevent>
          <i class="fas fa-angle-left"/>
        </span>
        <span class="direction-button-text"
              @click.prevent>
          GO TO PREVIOUS PAGE
        </span>
      </button>
      <a v-if="isFirstPage&&!isOnlyPage"
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
      <button :disabled="isLastPage"
              class="button is-small"
              @click="toPage(paginationInfo.currentPage+1)">
        <span class="direction-button-text">
          GO TO NEXT PAGE
        </span>
        <span class="icon is-small">
          <i class="fas fa-angle-right"/>
        </span>
      </button>
    </div>
  </div>
</template>

<script>
import vuexMappers from 'vuex'
export default {
  name: 'Spacer',
  computed: {
    ...vuexMappers.mapGetters('catalog', {
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
    ...vuexMappers.mapActions('catalog', {
      fetchProducts: 'fetchProducts',
    }),
    toPage(pageNumber) {
      if (pageNumber !== this.currentPage) {
        return this.fetchProducts({
          category: this.activeCategory,
          page: pageNumber,
        })
      }
    },
  },
}
</script>

<style scoped>
.spacer {
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
