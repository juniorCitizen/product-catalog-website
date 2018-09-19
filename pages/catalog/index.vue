<template>
  <v-container fluid>
    <v-layout column>
      <v-flex>
        <v-container class="headline pa-0 pb-4"
                     fluid>
          Main Product Categories
        </v-container>
        <v-container class="pa-0"
                     grid-list-lg
                     fluid>
          <v-layout fill-height
                    align-start
                    justify-start
                    wrap>
            <v-flex v-for="category in categories"
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

import CategoryCard from '@/components/cards/CategoryCard'

export default {
  name: 'CatalogPage',
  components: {CategoryCard},
  mixins: [postRouting, storyblokLivePreview],
  computed: {
    ...mapState({routingInProgress: 'routingInProgress'}),
  },
  watch: {
    routingInProgress(inProgress) {
      if (inProgress) this.categories = []
    },
  },
  asyncData(context) {
    return context.app.$storyapi
      .get('cdn/stories', {
        starts_with: 'categories',
        sort_by: 'position:asc',
        version: context.isDev ? 'draft' : 'published',
      })
      .then(res => {
        const filterFn = story => !story.content.parentCategory
        return {categories: res.data.stories.filter(filterFn)}
      })
      .catch(error => {
        context.error({
          statusCode: error.response.status,
          message: error.response.data,
        })
      })
  },
}
</script>
