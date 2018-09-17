<template>
  <v-card color="shade transparent">
    <v-card-actions>
      <div v-for="subcategory in subcategories"
           :key="subcategory.uuid">
        <subcategory-card :subcategory="subcategory"/>
      </div>
    </v-card-actions>
    <v-card-title class="text-xs-center">
      <v-layout>
        <v-flex tag="h3">
          {{ content.name }} Category
        </v-flex>
      </v-layout>
    </v-card-title>
    <!-- <template v-if="subcategoryUuids.length">
      <v-responsive v-for="subcategory in subcategories"
                    :key="subcategory.uuid">
        <category-card :category="subcategory"/>
      </v-responsive>
    </template> -->
    <!-- <template v-if="childSeriesUuids.length">
      <v-responsive v-for="childSeries in childrenSeries"
                    :key="childSeries.uuid">
        <series-card :series="childSeries"/>
      </v-responsive>
    </template> -->
    <!-- <template v-if="productUuids.length">
      <v-responsive v-for="product in products"
                    :key="product.uuid">
        <product-card :product="product"/>
      </v-responsive>
    </template> -->
  </v-card>
</template>

<script>
import SubcategoryCard from '@/components/cards/Subcategory'
// import CategoryCard from '@/components/cards/Category'
// import ProductCard from '@/components/cards/Product'
// import SeriesCard from '@/components/cards/Series'
export default {
  name: 'CategoryCard',
  components: {
    // CategoryCard,
    // ProductCard,
    // SeriesCard,
    SubcategoryCard,
  },
  props: {
    category: {
      type: Object,
      default() {
        return {
          content: {
            childrenSeries: [],
            name: 'unnamed category',
            parentCategory: null,
            products: [],
            subcategories: [],
          },
        }
      },
    },
  },
  data() {
    return {
      childrenSeries: [],
      products: [],
      subcategories: [],
    }
  },
  computed: {
    childSeriesUuids() {
      return this.content.childrenSeries
    },
    content() {
      return this.category.content
    },
    productUuids() {
      return this.content.products
    },
    subcategoryUuids() {
      return this.content.subcategories
    },
    version() {
      return process.env.NODE_ENV === 'development' ? 'draft' : 'published'
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
    getChildrenSeries() {
      if (!this.childSeriesUuids.length) return Promise.resolve()
      return this.$storyapi
        .get('cdn/stories', {
          by_uuids: this.childSeriesUuids.join(),
          sort_by: 'position:asc',
          starts_with: 'series',
          version: this.version,
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
    getSubcategories() {
      if (!this.subcategoryUuids.length) return Promise.resolve()
      return this.$storyapi
        .get('cdn/stories', {
          by_uuids: this.subcategoryUuids.join(),
          sort_by: 'position:asc',
          starts_with: 'categories',
          version: this.version,
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
