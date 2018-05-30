<template>
  <div class="spacer">
    <div class="field has-addons">
      <p class="control">
        <a :disabled="isFirstPage"
           class="button is-small"
           @click="toPage(paginationInfo.currentPage-1)">
          <span class="icon is-small">
            <i class="fas fa-angle-left"/>
          </span>
          <span>GO TO PREVIOUS PAGE</span>
        </a>
      </p>
      <p v-if="isFirstPage"
         class="control">
        <a class="first-page button is-small">
          <span>YOU ARE AT THE FIRST PAGE</span>
        </a>
      </p>
      <p v-if="isLastPage"
         class="control">
        <a class="last-page button is-small">
          <span>YOU ARE AT THE LAST PAGE</span>
        </a>
      </p>
      <p class="control">
        <a :disabled="isLastPage"
           class="button is-small"
           @click="toPage(paginationInfo.currentPage+1)">
          <span>GO TO NEXT PAGE</span>
          <span class="icon is-small">
            <i class="fas fa-angle-right"/>
          </span>
        </a>
      </p>
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
div.pagination-nav-button-container {
  margin-left: 15px;
  margin-right: 15px;
}
a.first-page,
a.last-page {
  pointer-events: none;
}
</style>
