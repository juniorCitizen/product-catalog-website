<template>
  <div id="product-browser-container"
       class="product-browser-container">
    <div class="product-browser">
      <product-card v-for="(product,index) in products"
                    :key="product.model"
                    :product="product"
                    :product-index="index"
                    @clicked="setActiveProductIndex(index)"/>
      <page-indicator/>
    </div>
  </div>
</template>

<script>
import vuexMappers from 'vuex'
import ProductCard from './ProductCard'
import PageIndicator from './PageIndicator'
export default {
  name: 'AltProductBrowser',
  components: {
    ProductCard,
    PageIndicator,
  },
  computed: {
    ...vuexMappers.mapGetters('altCatalog', {
      products: 'products',
    }),
  },
  watch: {
    products() {
      this.$el.scroll({
        top: 0,
        behavior: 'smooth',
      })
    },
  },
  methods: {
    ...vuexMappers.mapMutations('altCatalog', {
      setActiveProductIndex: 'setActiveProductIndex',
    }),
  },
}
</script>

<style scoped>
div.product-browser-container {
  box-sizing: border-box;
  grid-area: product-browser;
  align-self: stretch;
  justify-self: stretch;
  width: 99.5%;
  overflow-y: scroll;
}
div.product-browser-container::-webkit-scrollbar {
  width: 0;
}
div.product-browser {
  box-sizing: border-box;
  margin: 0;
  display: grid;
  grid-gap: 25px;
  grid-template-columns: repeat(auto-fill, minmax(256px, 1fr));
  padding: 25px;
  width: 100%;
}
</style>
