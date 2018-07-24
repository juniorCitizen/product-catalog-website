<template>
  <div class="product-specifications">
    <div class="section-caption">Specifications</div>
    <ul>
      <li>
        <div class="heading-column">weight</div>
        <div class="data-column">
          {{ specifications.weight||'n/a' }}
        </div>
      </li>
      <li>
        <div class="heading-column">weight cap</div>
        <div class="data-column">
          {{ specifications.weightCap||'n/a' }}
        </div>
      </li>
      <li>
        <div class="heading-column">adj. height</div>
        <div class="data-column">
          {{ specifications.maxHeight||'n/a' }} ~ {{ specifications.minHeight||'n/a' }}
        </div>
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

<style scoped>
.product-specifications {
  margin: 20px 10px;
}
div.section-caption {
  text-align: center;
  /* font-size: 75%; */
  color: rgb(200, 33, 33);
  margin-bottom: 5px;
}
ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}
li {
  border-bottom: 1px solid lightgray;
  padding: 0;
  margin: 0;
  font-size: 75%;
  line-height: 2em;
  display: flex;
}
li > div.heading-column {
  flex: 0 0 35%;
  font-weight: bold;
}
</style>
