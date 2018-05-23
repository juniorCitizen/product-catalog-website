<template>
  <section id="catalog-view"
           :class="classBinding">
    <aside>
      catalog menu
    </aside>
    <header>
      breadcrumbs
    </header>
    <article>
      product browser
    </article>
    <footer>
      pagination
    </footer>
  </section>
</template>

<script>
import vuexMappers from 'vuex'
export default {
  name: 'CatalogView',
  layout: 'default',
  computed: {
    ...vuexMappers.mapGetters('mobileDetect', {isMobile: 'isMobile'}),
    classBinding() {
      return {
        'desktop-layout': !this.isMobile && this.$mq !== 'mobile',
        'mobile-layout': this.isMobile || this.$mq === 'mobile',
      }
    },
  },
}
</script>

<style scoped>
#catalog-view,
aside,
header,
article,
footer {
  border: 1px solid blue;
  box-sizing: border-box;
}
#catalog-view {
  width: 100%;
  height: 100%;
  display: grid;
}
#catalog-view.desktop-layout {
  grid-column-gap: 5px;
  grid-row-gap: 5px;
  grid-template-columns: max-content min-content auto;
  grid-template-rows: min-content auto min-content;
}
#catalog-view.mobile-layout {
  grid-template-columns: auto;
  grid-template-rows: min-content auto min-content;
}
#catalog-view.desktop-layout aside {
  grid-column: 1/2;
  grid-row: 1/-1;
}
#catalog-view.mobile-layout aside {
  display: none;
}
header {
  grid-column: -2/-1;
  grid-row: 1/2;
}
article {
  grid-column: -2/-1;
  grid-row: 2/3;
}
footer {
  grid-column: -2/-1;
  grid-row: 3/4;
}
</style>
