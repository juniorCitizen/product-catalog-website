<template>
  <v-layout class="ma-0 pa-0"
            wrap>
    <v-flex xs12>
      <breadcrumbs large/>
    </v-flex>
    <v-flex v-for="category in catalog"
            :key="category.uuid"
            xs12
            sm6
            md4
            lg3
            xl2>
      <category-card :category="category"/>
    </v-flex>
  </v-layout>
</template>

<script>
import {mapState} from 'vuex'

import postRouting from '@/mixins/postRouting'
import storyblokLivePreview from '@/mixins/storyblokLivePreview'

import PageTitle from '@/components/PageTitle'
import Breadcrumbs from '@/components/Breadcrumbs'
import CategoryCard from '@/components/cards/CategoryCard'

export default {
  name: 'CatalogPage',
  components: {PageTitle, Breadcrumbs, CategoryCard},
  mixins: [postRouting, storyblokLivePreview],
  fetch({store}) {
    const {dispatch} = store
    return Promise.all([
      dispatch('catalog/fetchAllSeries'),
      dispatch('catalog/fetchAllPhotos'),
      dispatch('catalog/fetchAllProducts'),
      dispatch('catalog/fetchAllFeatures'),
    ])
      .then(() => Promise.resolve())
      .catch(error => this.$nuxt.error(error))
  },
  computed: {
    ...mapState('catalog', {catalog: 'catalog'}),
    ...mapState({routingInProgress: 'routingInProgress'}),
  },
}
</script>
