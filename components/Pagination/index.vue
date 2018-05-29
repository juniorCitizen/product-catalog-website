<template>
  <div :class="classBinding"
       class="pagination-container">
    <nav class="pagination is-small"
         role="navigation">
      <a class="pagination-previous">PREVIOUS</a>
      <a class="pagination-next">NEXT PAGE</a>
      <ul class="pagination-list">
        <li><a class="pagination-link">1</a></li>
        <li><span class="pagination-ellipsis">&hellip;</span></li>
        <li><a class="pagination-link">45</a></li>
        <li><a class="pagination-link is-current"
               aria-label="Page 46">46</a></li>
        <li><a class="pagination-link">47</a></li>
        <li><span class="pagination-ellipsis">&hellip;</span></li>
        <li><a class="pagination-link">86</a></li>
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
    classBinding() {
      return {
        'mobile-view': this.isMobile || this.mq === 'mobile',
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
