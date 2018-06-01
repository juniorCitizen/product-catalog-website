<template>
  <div id="product-browser-container"
       class="product-browser-container">
    <div class="product-browser">
      <product-card v-for="(product,index) in products"
                    :key="product.code"
                    :product="product"
                    :product-index="index"
                    @clicked="setActiveProductIndex(index)"/>
      <spacer/>
    </div>
  </div>
</template>

<script>
import vuexMappers from 'vuex'
import ProductCard from './ProductCard'
import Spacer from './Spacer'
export default {
  name: 'ProductBrowser',
  components: {
    ProductCard,
    Spacer,
  },
  computed: {
    ...vuexMappers.mapGetters('catalog', {
      products: 'products',
    }),
  },
  watch: {
    products() {
      let el = document.getElementById('product-browser-container')
      el.scroll({
        top: 0,
        behavior: 'instant',
      })
    },
  },
  methods: {
    ...vuexMappers.mapMutations('catalog', {
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
  width: 100%;
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
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  padding: 25px;
  width: 100%;
}
</style>
