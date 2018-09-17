<template>
  <v-card>
    <v-card-title>
      {{ series.content.name }}
    </v-card-title>
    <template v-if="productUuids.length">
      <v-responsive v-for="product in products"
                    :key="product.id">
        <product-card :product="product"
                      :product-id="product.id"/>
      </v-responsive>
    </template>
  </v-card>
</template>

<script>
import ProductCard from '@/components/cards/Product'
export default {
  name: 'SeriesCard',
  components: {ProductCard},
  props: {
    series: {
      type: Object,
      default() {
        return {
          content: {
            name: 'unnamed series',
            parentCategory: null,
            products: [],
          },
        }
      },
    },
  },
  data() {
    return {
      products: [],
    }
  },
  computed: {
    content() {
      return this.series.content
    },
    productUuids() {
      return this.content.products
    },
    version() {
      return process.env.NODE_ENV === 'development' ? 'draft' : 'published'
    },
  },
  mounted() {
    return this.getProducts()
  },
  methods: {
    getProducts() {
      if (!this.productUuids.length) return Promise.resolve()
      return this.$storyapi
        .get('cdn/stories', {
          by_uuids: this.productUuids.join(),
          per_page: 1000,
          sort_by: 'content.model:asc',
          starts_with: 'products',
          version: this.version,
        })
        .then(res => {
          this.products = res.data.stories
          return Promise.resolve()
        })
        .catch(error => {
          console.log(error)
          return Promise.reject()
        })
    },
  },
}
</script>
