<template>
  <div class="product-features">
    <div class="section-caption">Features</div>
    <p>{{ product.features }}</p>
  </div>
</template>

<script>
import vuexMappers from 'vuex'
export default {
  name: 'Features',
  computed: {
    ...vuexMappers.mapGetters('altCatalog', {
      product: 'activeProduct',
    }),
  },
}
</script>

<style scoped>
.product-features {
  border-bottom: 1px solid lightgray;
  margin: 20px 10px;
}
div.section-caption {
  text-align: center;
  /* font-size: 75%; */
  color: rgb(200, 33, 33);
  margin-bottom: 5px;
}
p {
  white-space: pre-line;
  font-size: 75%;
  line-height: 2em;
}
</style>
