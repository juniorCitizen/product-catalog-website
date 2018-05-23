<template>
  <div class="product-browser-container">
    <div class="product-browser">
      <product-card v-for="product in products"
                    :key="product.code"
                    :product="product"/>
      <div class="spacer"/>
    </div>
  </div>
</template>

<script>
import vuexMappers from 'vuex'
import ProductCard from './ProductCard'
export default {
  name: 'ProductBrowser',
  components: {ProductCard},
  computed: {
    ...vuexMappers.mapGetters('catalog', {
      products: 'products',
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
  grid-auto-rows: 300px;
  padding: 25px;
  width: 100%;
}
.spacer {
  border: 1px solid whitesmoke;
  height: 1px;
  grid-column: 1/-1;
}
</style>
