<template>
  <v-card color="white"
          hover
          raised
          height="320"
          @click.native.stop="toPath(`/catalog/categories/${category.slug}`)">
    <v-card-title class="caption font-weight-black text-truncate">
      <div>
        <h4>PRODUCT CATEGORY</h4>
        <h2 class="grey--text font-weight-black">
          {{ category.content.name }}
          <template v-if="itemCount">
            ({{ itemCount }})
          </template>
        </h2>
      </div>
    </v-card-title>
    <v-responsive v-if="photoUrls.length"
                  class="pb-3">
      <v-img :src="photoUrls[0]"
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
    </v-responsive>
  </v-card>
</template>

<script>
import preRouting from '@/mixins/preRouting'
import storyVersion from '@/mixins/storyVersion'

export default {
  name: 'CategoryCard',
  mixins: [preRouting, storyVersion],
  props: {
    category: {
      type: Object,
      default() {
        return {
          content: {
            childrenSeries: [],
            name: 'unnamed category',
            parentCategory: null,
            products: [],
            subcategories: [],
          },
        }
      },
    },
  },
  data() {
    return {
      childrenSeries: [],
      photos: {
        content: {
          photoUrls: [],
        },
      },
      placeholder: require('@/assets/logo.png'),
      products: [],
      subcategories: [],
    }
  },
  computed: {
    itemCount() {
      return (
        this.category.content.childrenSeries.length +
        this.category.content.products.length +
        this.category.content.subcategories.length
      )
    },
    photoUrls() {
      const photoUrls = this.photos.content.photoUrls
      return photoUrls.map(photoUrl => photoUrl.url)
    },
  },
  mounted() {
    return this.getPhotos()
      .then(() => {
        return Promise.all([
          this.getSubcategories(),
          this.getChildrenSeries(),
          this.getProducts(),
        ])
      })
      .then(() => Promise.resolve())
      .catch(error => {
        console.log(error)
        return Promise.reject()
      })
  },
  methods: {
    getChildrenSeries() {
      const uuids = this.category.content.childrenSeries
      return !uuids.length
        ? Promise.resolve()
        : this.$storyapi
            .get('cdn/stories', {
              by_uuids: uuids.join(),
              sort_by: 'content.name:asc',
              starts_with: 'series',
              version: this.version,
            })
            .then(res => {
              this.childrenSeries = res.data.stories
              return Promise.resolve()
            })
            .catch(error => {
              console.log(error)
              return Promise.reject()
            })
    },
    getPhotos() {
      const id = this.category.content.photos
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
      const uuids = this.category.content.products
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
    getSubcategories() {
      const uuids = this.category.content.subcategories
      return !uuids.length
        ? Promise.resolve()
        : this.$storyapi
            .get('cdn/stories', {
              by_uuids: uuids.join(),
              sort_by: 'position:asc',
              starts_with: 'categories',
              version: this.version,
            })
            .then(res => {
              this.subcategories = res.data.stories
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
