<template>
  <div>product page (dynamic)</div>
</template>

<script>
import {mapState} from 'vuex'
import postRouting from '@/mixins/postRouting'
import storyblokLivePreview from '@/mixins/storyblokLivePreview'
export default {
  name: 'ProductPage',
  mixins: [postRouting, storyblokLivePreview],
  computed: {
    ...mapState({routingInProgress: 'routingInProgress'}),
  },
  watch: {
    routingInProgress(inProgress) {
      if (inProgress) {
        this.product = {
          content: {
            compatibleAcessories: [],
            compatibleProducts: [],
            description: 'no description',
            features: null,
            model: 'unnamed model',
            name: 'unnamed product',
            parentCategory: null,
            parentSeries: null,
            photos: null,
            specifications: null,
          },
        }
      }
    },
  },
  asyncData(context) {
    return context.app.$storyapi
      .get('cdn/stories', {
        starts_with: `product/${context.params.slug}`,
        version: context.isDev ? 'draft' : 'published',
      })
      .then(res => {
        return {product: res.data.stories[0]}
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
