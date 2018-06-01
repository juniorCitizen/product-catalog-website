<template>
  <div class="specifications">
    <ul>
      <li>
        weight: {{ specifications.weight||'n/a' }}
      </li>
      <li>
        weight cap: {{ specifications.weightCap||'n/a' }}
      </li>
      <li>
        adj. height: {{ specifications.maxHeight||'n/a' }} ~ {{ specifications.minHeight||'n/a' }}
      </li>
    </ul>
  </div>
</template>

<script>
import vuexMappers from 'vuex'
export default {
  name: 'Specifications',
  computed: {
    ...vuexMappers.mapGetters('catalog', {
      product: 'activeProduct',
    }),
    specifications() {
      return this.product.specification.details
    },
  },
}
</script>
