<template>
  <div class="product-title">
    {{ product.model }} - {{ product.name }}
  </div>
</template>

<script>
import vuexMappers from 'vuex'
export default {
  name: 'ProductTitle',
  computed: {
    ...vuexMappers.mapGetters('altCatalog', {
      product: 'activeProduct',
    }),
  },
}
</script>

<style scoped>
.product-title {
  text-align: center;
  background-color: whitesmoke;
  border-radius: 5px;
  padding: 5px;
  position: sticky;
  top: 0%;
}
@media only screen and (max-width: 460px) {
  .product-title {
    font-size: 75%;
  }
}
</style>
