<template>
  <v-container fluid
               fill-height>
    <v-layout fill-height
              align-start
              justify-start
              wrap>
      <v-flex v-for="category in categories"
              :key="category.id"
              sm12
              md4
              lg3>
        <category-card :category="category"/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import storyblokLivePreview from '@/mixins/storyblokLivePreview'
import CategoryCard from '@/components/cards/Category'
export default {
  name: 'CatalogPage',
  components: {CategoryCard},
  mixins: [storyblokLivePreview],
  mounted() {
    this.$storyblok.init()
    this.$storyblok.on('change', function() {
      window.location.reload()
    })
  },
  asyncData(context) {
    const version = context.isDev ? 'draft' : 'published'
    return context.app.$storyapi
      .get('cdn/stories', {
        starts_with: 'categories',
        sort_by: 'position:asc',
        version,
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
