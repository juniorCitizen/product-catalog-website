<template>
  <v-card color="white"
          hover
          raised
          height="320"
          @click.native.stop="processCategorySelection">
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
    <v-responsive class="pb-3">
      <v-img :src="category.content.photo"
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
import {mapMutations} from 'vuex'

import preRouting from '@/mixins/preRouting'
import storyVersion from '@/mixins/storyVersion'

import gentryLogo from '@/assets/logo.png'

export default {
  name: 'CategoryCard',
  mixins: [preRouting, storyVersion],
  props: {
    category: {
      type: Object,
      default() {
        return {
          content: {
            name: 'unnamed category',
            photo: gentryLogo,
            subcategories: [],
            childrenSeries: [],
            products: [],
            parentCategory: null,
          },
        }
      },
    },
  },
  data() {
    return {
      childrenSeries: [],
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
  },
  mounted() {
    return Promise.all([
      this.getSubcategories(),
      this.getChildrenSeries(),
      this.getProducts(),
    ])
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
    processCategorySelection() {
      this.registerBreadcrumb(this.category)
      this.toPath(`/catalog/${this.category.full_slug}`)
    },
  },
}
</script>
