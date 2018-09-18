<template>
  <v-card color="white"
          hover
          @click.native.stop="toPath(`/catalog/series/${series.slug}`)">
    <v-card-title>
      <h4 class="caption grey--text">
        {{ series.content.name }} SERIES
      </h4>
    </v-card-title>
    <v-responsive v-if="photoUrls.length"
                  class="pb-2">
      <v-img :src="photoUrls[0]"
             height="100"
             max-width="100"
             contain
             class="ma-auto"/>
    </v-responsive>
  </v-card>
</template>

<script>
import ProductCard from '@/components/cards/Product'
import preRouting from '@/mixins/preRouting'
import storyVersion from '@/mixins/storyVersion'
export default {
  name: 'SeriesCard',
  components: {ProductCard},
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
