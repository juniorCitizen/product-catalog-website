<template>
  <v-card>
    <v-card-title>
      {{ product.content.model }}
    </v-card-title>
  </v-card>
</template>

<script>
export default {
  name: 'ProductCard',
  props: {
    product: {
      type: Object,
      default() {
        return {
          content: {
            compatibleAcessories: [],
            compatibleProducts: [],
            description: 'no description',
            features: null,
            model: 'unnamed model',
            name: 'unnamed product',
            parentCategory: null,
            parentSeries: null,
            photos: null,
            specifications: null,
          },
        }
      },
    },
  },
  data() {
    return {
      data: {},
    }
  },
  computed: {
    version() {
      return process.env.NODE_ENV === 'development' ? 'draft' : 'published'
    },
    content() {
      return this.product.content
    },
  },
}
</script>
