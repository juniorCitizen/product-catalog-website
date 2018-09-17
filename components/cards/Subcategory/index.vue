<template>
  <v-avatar>
    <v-img v-if="photoUrl"
           :src="photoUrl"
           contain
           height="50"
           width="50"/>
  </v-avatar>
</template>

<script>
export default {
  name: 'SubcategoryCard',
  components: {},
  props: {
    subcategory: {
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
      products: [],
      photoUrl: null,
    }
  },
  computed: {
    content() {
      return this.subcategory.content
    },
    version() {
      return process.env.NODE_ENV === 'development' ? 'draft' : 'published'
    },
  },
  mounted() {
    return this.getProducts()
      .then(() => Promise.resolve())
      .catch(error => {
        console.log(error)
        return Promise.reject()
      })
  },
  methods: {
    reduceProductsToPhotoIds(products) {
      return products.reduce((photoIds, product) => {
        const photoId = product.content.photos
        if (photoId) photoIds.push(photoId)
        return photoIds
      }, [])
    },
    mapPhotoIdToRequestFn(photoId) {
      return this.$storyapi
        .get(`cdn/stories/${photoId}`, {
          version: this.version,
        })
        .then(res => {
          return res.data.story.content.photoUrls.map(photoUrl => {
            return photoUrl.url
          })
        })
        .then(photoIds => photoIds[0])
        .catch(error => Promise.reject(error))
    },
    getProducts() {
      const id = this.subcategory.id
      return this.$storyapi
        .get(`cdn/stories`, {
          'filter_query[parentCategory][in]': id,
          per_page: 1000,
          sort_by: 'content.model:asc',
          starts_with: 'products',
          version: this.version,
        })
        .then(res => {
          this.products = res.data.stories
          return this.reduceProductsToPhotoIds(this.products)
        })
        .then(photoIds => {
          return Promise.race(photoIds.map(this.mapPhotoIdToRequestFn))
        })
        .then(photoUrl => {
          this.photoUrl = photoUrl
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
