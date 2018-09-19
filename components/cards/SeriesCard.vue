<template>
  <v-card color="white"
          hover
          raised
          height="320"
          @click.native.stop="toPath(`/catalog/${series.full_slug}`)">
    <v-card-title>
      <h4 class="caption font-weight-black text-truncate">
        {{ series.content.name }} Series
      </h4>
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
import preRouting from '@/mixins/preRouting'
import storyVersion from '@/mixins/storyVersion'

export default {
  name: 'SeriesCard',
  mixins: [preRouting, storyVersion],
  props: {
    series: {
      type: Object,
      default() {
        return {
          content: {
            name: 'unnamed series',
            parentCategory: null,
            products: [],
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
      products: [],
    }
  },
  computed: {
    photoUrls() {
      const photoUrls = this.photos.content.photoUrls
      return photoUrls.map(photoUrl => photoUrl.url)
    },
  },
  mounted() {
    return Promise.all([this.getPhotos(), this.getProducts()])
      .then(() => Promise.resolve())
      .catch(error => {
        console.log(error)
        return Promise.reject()
      })
  },
  methods: {
    getPhotos() {
      const id = this.series.content.photos
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
