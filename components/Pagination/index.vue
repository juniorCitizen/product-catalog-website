<template>
  <div :class="classBinding"
       class="pagination-container">
    <nav class="pagination is-small"
         role="navigation">
      <ul class="pagination-list">
        <li v-if="currentPage>2">
          <a :class="{'is-current':currentPage===1}"
             class="pagination-link"
             @click="toPage(1)">
            1
          </a>
        </li>
        <li v-if="currentPage>3">
          <span class="pagination-ellipsis">&hellip;</span>
        </li>
        <template v-for="page in totalPages">
          <li v-if="page>currentPage-2&&page<currentPage+2"
              :key="page">
            <a :class="{'is-current':currentPage===page}"
               class="pagination-link"
               @click="toPage(page)">
              {{ page }}
            </a>
          </li>
        </template>
        <li v-if="currentPage<totalPages-2">
          <span class="pagination-ellipsis">&hellip;</span>
        </li>
        <li v-if="currentPage<totalPages-1">
          <a :class="{'is-current':currentPage===totalPages}"
             class="pagination-link"
             @click="toPage(totalPages)">
            {{ totalPages }}
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import vuexMappers from 'vuex'
export default {
  name: 'Pagination',
  computed: {
    ...vuexMappers.mapGetters('mobileDetect', {
      isMobile: 'isMobile',
      mq: 'mq',
    }),
    ...vuexMappers.mapGetters('catalog', {
      paginationInfo: 'paginationInfo',
      breadcrumb: 'breadcrumb',
    }),
    currentPage() {
      return this.paginationInfo.currentPage
    },
    totalPages() {
      return this.paginationInfo.totalPages
    },
    activeCategory() {
      return this.breadcrumb[this.breadcrumb.length - 1]
    },
    classBinding() {
      return {
        'mobile-view': this.isMobile || this.mq === 'mobile',
      }
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
div.pagination-container {
  box-sizing: border-box;
  grid-area: pagination;
  align-self: end;
  justify-self: end;
  width: max-content;
  height: max-content;
}
div.pagination-container.mobile-view {
  justify-self: center;
}
nav.pagination {
  box-sizing: border-box;
  margin: 0;
}
</style>
