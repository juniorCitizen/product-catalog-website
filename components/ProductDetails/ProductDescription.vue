<template>
  <div class="product-description">
    <ol>
      <li v-for="(line,index) in description"
          :key="index">{{ line }}</li>
    </ol>
  </div>
</template>

<script>
import vuexMappers from 'vuex'
export default {
  name: 'ProductDescription',
  computed: {
    ...vuexMappers.mapGetters('catalog', {
      product: 'activeProduct',
    }),
    description() {
      return this.product.description.split('\n')
    },
  },
}
</script>

<style scoped>
ol {
  list-style-position: inside;
}
</style>
