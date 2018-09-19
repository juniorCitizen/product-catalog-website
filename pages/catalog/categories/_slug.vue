<template>
  <v-container fluid>
    <v-layout column>
      <v-flex>
        <v-container class="headline pa-0 pb-4"
                     fluid>
          {{ category.content.name }} Category
        </v-container>
        <v-container class="pa-0 mt-3 mb-3"
                     grid-list-lg
                     fluid>
          <v-layout fill-height
                    align-start
                    justify-start
                    wrap>
            <v-flex v-for="subcategory in subcategories"
                    :key="subcategory.uuid"
                    xs12
                    sm6
                    md4
                    lg3
                    xl2>
              <category-card :category="subcategory"/>
            </v-flex>
          </v-layout>
        </v-container>
        <v-container class="pa-0 mt-3 mb-3"
                     grid-list-lg
                     fluid>
          <v-layout fill-height
                    align-start
                    justify-start
                    wrap>
            <v-flex v-for="childSeries in childrenSeries"
                    :key="childSeries.uuid"
                    xs12
                    sm6
                    md4
                    lg3
                    xl2>
              <series-card :series="childSeries"/>
            </v-flex>
          </v-layout>
        </v-container>
        <v-container class="pa-0 mt-3"
                     grid-list-lg
                     fluid>
          <v-layout fill-height
                    align-start
                    justify-start
                    wrap>
            <v-flex v-for="product in products"
                    :key="product.uuid"
                    xs12
                    sm6
                    md4
                    lg3
                    xl2>
              <product-card :product="product"/>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import {mapState} from 'vuex'

import postRouting from '@/mixins/postRouting'
import storyVersion from '@/mixins/storyVersion'
import storyblokLivePreview from '@/mixins/storyblokLivePreview'

import CategoryCard from '@/components/cards/CategoryCard'
import ProductCard from '@/components/cards/ProductCard'
import SeriesCard from '@/components/cards/SeriesCard'

export default {
  name: 'CategoryPage',
  components: {
    CategoryCard,
    ProductCard,
    SeriesCard,
  },
  mixins: [postRouting, storyVersion, storyblokLivePreview],
  data() {
    return {
      childrenSeries: [],
      products: [],
      subcategories: [],
    }
  },
  computed: {
    ...mapState({routingInProgress: 'routingInProgress'}),
  },
  watch: {
    routingInProgress(inProgress) {
      if (inProgress) {
        const content = this.category.content
        content.subcategories.slice(0)
        content.childrenSeries.slice(0)
        content.products.slice(0)
        content.parentCategory = null
      }
    },
  },
  asyncData(context) {
    return context.app.$storyapi
      .get('cdn/stories', {
        starts_with: `categories/${context.params.slug}`,
        version: context.isDev ? 'draft' : 'published',
      })
      .then(res => {
        return {category: res.data.stories[0]}
      })
      .catch(error => {
        context.error({
          statusCode: error.response.status,
          message: error.response.data,
        })
      })
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
      const uuids = this.category.content.childrenSeries
      return !uuids.length
        ? Promise.resolve()
        : this.$storyapi
            .get('cdn/stories', {
              by_uuids: uuids.join(),
              sort_by: 'content.name:asc',
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
    getProducts() {
      const uuids = this.category.content.products
      return !uuids.length
        ? Promise.resolve()
        : this.$storyapi
            .get('cdn/stories', {
              by_uuids: uuids.join(),
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
    getSubcategories() {
      const uuids = this.category.content.subcategories
      return !uuids.length
        ? Promise.resolve()
        : this.$storyapi
            .get('cdn/stories', {
              by_uuids: uuids.join(),
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
  },
}
</script>
