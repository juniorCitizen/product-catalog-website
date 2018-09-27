<template>
  <v-container fill-height
               fluid>
    <v-layout column>
      <v-flex>
        <v-container class="headline pa-0"
                     fluid>
          {{ series.content.name }} Series
        </v-container>
        <v-container class="pa-0"
                     fluid>
          <breadcrumbs/>
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

import Breadcrumbs from '@/components/Breadcrumbs'
import ProductCard from '@/components/cards/ProductCard'

export default {
  name: 'SeriesPage',
  components: {
    Breadcrumbs,
    ProductCard,
  },
  mixins: [postRouting, storyVersion, storyblokLivePreview],
  data() {
    return {
      products: [],
    }
  },
  computed: {
    ...mapState({routingInProgress: 'routingInProgress'}),
  },
  watch: {
    routingInProgress(inProgress) {
      if (inProgress) {
        this.series.content.products.splice(0)
      }
    },
  },
  asyncData(context) {
    return context.app.$storyapi
      .get('cdn/stories', {
        starts_with: `series/${context.params.slug}`,
        version: context.isDev ? 'draft' : 'published',
      })
      .then(res => {
        return {series: res.data.stories[0]}
      })
      .catch(error => {
        context.error({
          statusCode: error.response.status,
          message: error.response.data,
        })
      })
  },
  mounted() {
    return this.getProducts()
      .then(() => Promise.resolve())
      .catch(error => {
        console.log(error)
        return Promise.reject()
      })
  },
  methods: {
    getProducts() {
      const uuids = this.series.content.products
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
  },
}
</script>
