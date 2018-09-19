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
        const content = this.product.content
        content.compatibleAccessories.splice(0)
        content.compatibleProducts.splice(0)
      }
    },
  },
  asyncData(context) {
    return context.app.$storyapi
      .get('cdn/stories', {
        starts_with: `products/${context.params.slug}`,
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
