<template>
  <v-card color="white"
          hover
          raised
          height="320"
          @click.native.stop="processProductSelection">
    <v-card-title class="caption font-weight-black text-truncate">
      <div>
        <h4>PRODUCT MODEL: {{ product.content.model }}</h4>
        <h3 class="grey--text font-weight-black">
          {{ product.content.name }}
        </h3>
      </div>
    </v-card-title>
    <v-img v-if="photoUrls.length"
           :src="photoUrls[0]"
           :lazy-src="placeholder"
           height="220"
           max-width="220"
           contain
           class="ma-auto">
      <v-layout slot="placeholder"
                fill-height
                align-center
                justify-center
                ma-0>
        <v-progress-circular indeterminate
                             color="black"/>
      </v-layout>
    </v-img>
    <v-img v-else
           :src="placeholder"
           height="220"
           max-width="220"
           contain
           class="ma-auto"/>
  </v-card>
</template>

<script>
import {mapMutations} from 'vuex'

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
      placeholder: require('@/assets/logo.png'),
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
    ...mapMutations('catalog', {
      registerBreadcrumb: 'registerBreadcrumb',
    }),
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
    processProductSelection() {
      this.registerBreadcrumb(this.product)
      this.toPath(`/catalog/${this.product.full_slug}`)
    },
  },
}
</script>
