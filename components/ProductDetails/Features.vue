<template>
  <p class="features">{{ product.specification.text }}</p>
</template>

<script>
import vuexMappers from 'vuex'
export default {
  name: 'Features',
  computed: {
    ...vuexMappers.mapGetters('catalog', {
      product: 'activeProduct',
    }),
  },
}
</script>

<style scoped>
p {
  white-space: pre-line;
}
</style>
