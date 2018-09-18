<template>
  <div>series page (dynamic)</div>
</template>

<script>
import {mapState} from 'vuex'
import postRouting from '@/mixins/postRouting'
import storyblokLivePreview from '@/mixins/storyblokLivePreview'
export default {
  name: 'SeriesPage',
  mixins: [postRouting, storyblokLivePreview],
  computed: {
    ...mapState({routingInProgress: 'routingInProgress'}),
  },
  watch: {
    routingInProgress(inProgress) {
      if (inProgress) {
        this.series = {
          content: {
            name: 'unnamed series',
            parentCategory: null,
            products: [],
          },
        }
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
}
</script>
