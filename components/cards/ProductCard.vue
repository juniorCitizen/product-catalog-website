<template>
  <v-card color="white"
          hover
          @click.native.stop="toPath(`/catalog/products/${product.slug}`)">
    <v-card-title class="caption font-weight-black">
      <div>
        <h4>PRODUCT MODEL: {{ product.content.model }}</h4>
        <h3 class="grey--text font-weight-black text-truncate">
          {{ product.content.name }}
        </h3>
      </div>
    </v-card-title>
    <v-responsive v-if="photoUrls.length"
                  class="pb-4">
      <v-img :src="photoUrls[0]"
             height="200"
             max-width="200"
             contain
             class="ma-auto"/>
    </v-responsive>
  </v-card>
</template>

<script>
import preRouting from '@/mixins/preRouting'
import storyVersion from '@/mixins/storyVersion'

export default {
  name: 'ProductCard',
  mixins: [preRouting, storyVersion],
  props: {
    product: {
      type: Object,
      default() {
        return {
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
      },
    },
  },
  data() {
    return {
      photos: {
        content: {
          photoUrls: [],
        },
      },
    }
  },
  computed: {
    photoUrls() {
      const photoUrls = this.photos.content.photoUrls
      return photoUrls.map(photoUrl => photoUrl.url)
    },
  },
  mounted() {
    return this.getPhotos()
      .then(() => Promise.resolve())
      .catch(error => {
        console.log(error)
        return Promise.reject()
      })
  },
  methods: {
    getPhotos() {
      const id = this.product.content.photos
      return !id
        ? Promise.resolve()
        : this.$storyapi
            .get(`cdn/stories/${id}`, {
              starts_with: 'photos',
              version: this.version,
            })
            .then(res => {
              this.photos = res.data.story
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
