<template>
  <v-card color="white"
          hover
          raised
          height="320"
          @click.native.stop="processSeriesSelection">
    <v-card-title>
      <h4 class="caption font-weight-black text-truncate">
        {{ series.content.name }} Series
      </h4>
    </v-card-title>
    <v-img :src="series.content.photoUrl"
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
  </v-card>
</template>

<script>
import {mapMutations} from 'vuex'

import preRouting from '@/mixins/preRouting'
import storyVersion from '@/mixins/storyVersion'

import gentryLogo from '@/assets/logo.png'

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
            photoUrl: gentryLogo,
            parentCategory: null,
            products: [],
          },
        }
      },
    },
  },
  data() {
    return {
      products: [],
    }
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
    ...mapMutations('catalog', {
      registerBreadcrumb: 'registerBreadcrumb',
    }),
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
    processSeriesSelection() {
      this.registerBreadcrumb(this.series)
      this.toPath(`/catalog/${this.series.full_slug}`)
    },
  },
}
</script>
