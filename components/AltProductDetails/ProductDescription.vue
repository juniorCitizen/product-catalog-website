<template>
  <div class="product-description">
    <div class="section-caption">Description</div>
    {{ product.description }}
    <!-- <ol>
      <li v-for="(line,index) in description"
          :key="index">{{ line }}</li>
    </ol> -->
  </div>
</template>

<script>
import vuexMappers from 'vuex'
export default {
  name: 'ProductDescription',
  computed: {
    ...vuexMappers.mapGetters('altCatalog', {
      product: 'activeProduct',
    }),
    // description() {
    //   return this.product.description.split('\n')
    // },
  },
}
</script>

<style scoped>
div.product-description {
  border-bottom: 1px solid lightgray;
  margin: 20px 10px;
}
div.section-caption {
  text-align: center;
  /* font-size: 75%; */
  color: rgb(200, 33, 33);
  margin-bottom: 5px;
}
ol {
  list-style-position: inside;
}
li {
  font-size: 75%;
  line-height: 2em;
}
</style>
