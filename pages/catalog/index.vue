<template>
  <v-container fluid
               fill-height>
    <v-layout column>
      <v-flex>
        <v-container class="headline pa-0"
                     fluid>
          Main Product Categories
        </v-container>
        <v-container class="pa-0"
                     fluid>
          <breadcrumbs large/>
        </v-container>
        <v-container class="pa-0 mt-3"
                     grid-list-lg
                     fluid>
          <v-layout fill-height
                    align-start
                    justify-start
                    wrap>
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
        </v-container>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import {mapState} from 'vuex'

import postRouting from '@/mixins/postRouting'
import storyblokLivePreview from '@/mixins/storyblokLivePreview'

import Breadcrumbs from '@/components/Breadcrumbs'
import CategoryCard from '@/components/cards/CategoryCard'

export default {
  name: 'CatalogPage',
  components: {Breadcrumbs, CategoryCard},
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
