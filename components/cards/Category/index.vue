<template>
  <v-card>
    <v-card-title>{{ content.name }}</v-card-title>
    <template v-if="subcategoryUuids.length">
      <v-responsive v-for="subcategory in subcategories"
                    :key="subcategory.uuid">
        <category-card :category="subcategory"/>
      </v-responsive>
    </template>
    <template v-if="childSeriesUuids.length">
      <v-responsive v-for="childSeries in childrenSeries"
                    :key="childSeries.uuid">
        <series-card :series="childSeries"/>
      </v-responsive>
    </template>
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
import CategoryCard from '@/components/cards/Category'
import SeriesCard from '@/components/cards/Series'
import ProductCard from '@/components/cards/Product'
export default {
  name: 'CategoryCard',
  components: {CategoryCard, SeriesCard, ProductCard},
  props: {
    category: {
      type: Object,
      default() {
        return {
          content: {
            name: 'unnamed category',
            parentCategory: null,
            subcategories: [],
            childrenSeries: [],
            products: [],
          },
        }
      },
    },
  },
  data() {
    return {
      subcategories: [],
      childrenSeries: [],
      products: [],
    }
  },
  computed: {
    version() {
      return process.env.NODE_ENV === 'development' ? 'draft' : 'published'
    },
    content() {
      return this.category.content
    },
    subcategoryUuids() {
      return this.content.subcategories
    },
    childSeriesUuids() {
      return this.content.childrenSeries
    },
    productUuids() {
      return this.content.products
    },
  },
  mounted() {
    return Promise.all([
      this.getSubcategories(),
      this.getChildrenSeries(),
      this.getProducts(),
    ])
      .then(() => Promise.resolve())
      .catch(error => {
        console.log(error)
        return Promise.reject()
      })
  },
  methods: {
    getSubcategories() {
      if (!this.subcategoryUuids.length) return []
      return this.$storyapi
        .get('cdn/stories', {
          version: this.version,
          starts_with: 'categories',
          sort_by: 'position:asc',
          by_uuids: this.subcategoryUuids.join(),
        })
        .then(res => {
          this.subcategories = res.data.stories
          return Promise.resolve()
        })
        .catch(error => {
          console.log(error)
          return Promise.reject()
        })
    },
    getChildrenSeries() {
      if (!this.childSeriesUuids.length) return []
      return this.$storyapi
        .get('cdn/stories', {
          version: this.version,
          starts_with: 'series',
          sort_by: 'position:asc',
          by_uuids: this.childSeriesUuids.join(),
        })
        .then(res => {
          this.childrenSeries = res.data.stories
          return Promise.resolve()
        })
        .catch(error => {
          console.log(error)
          return Promise.reject()
        })
    },
    getProducts() {
      if (!this.productUuids.length) return []
      return this.$storyapi
        .get('cdn/stories', {
          version: this.version,
          starts_with: 'products',
          sort_by: 'content.model:asc',
          by_uuids: this.productUuids.join(),
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
