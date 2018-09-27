<template>
  <div style="border:1px black solid;">
    <breadcrumbs/>
    <div>model: {{ product.content.model }}</div>
    <div>name: {{ product.content.name }}</div>
    <div>description: {{ product.content.description }}</div>
    <v-img v-for="(photoUrl,index) in photoUrls"
           :key="index"
           :src="photoUrl"
           height="50"
           max-width="50"
           contain/>
    <div>
      <ol>
        <li v-for="(featureEntry,index) in featureEntries"
            :key="index">
          {{ featureEntry }}
        </li>
      </ol>
    </div>
  </div>
  <!-- <v-container fill-height
               fluid
               class="white">
    <v-layout column>
      <h1 class="text-xs-center mt-5 mb-5">
        {{ product.content.model }} - {{ product.content.name }}
      </h1>
      <p>{{ product.content.description }}</p>
      <div>
        <ol>
          <li v-for="(featureEntry,index) in featureEntries"
              :key="index">
            {{ featureEntry }}
          </li>
        </ol>
      </div>
      <v-flex class="white">
        <v-container grid-list-lg
                     fill-height
                     fluid>
          <v-layout fill-height>
            <v-spacer/>
            <v-flex class="white"
                    xs6>
              <v-container fill-height
                           fluid>
                <v-layout align-center
                          justify-center
                          wrap>
                  <thumbnail v-for="(photoUrl,index) in photoUrls"
                             :key="index"
                             :url="photoUrl"
                             @click="showcasingPhotoIndex=index"/>
                </v-layout>
              </v-container>
            </v-flex>
            <v-spacer/>
            <v-flex class="white"
                    xs4>
              <v-card class="pa-5"
                      flat>
                <v-responsive>
                  <v-img :src="photoUrls[showcasingPhotoIndex]"
                         class="ma-auto"
                         height="450"
                         max-width="450"
                         contain/>
                </v-responsive>
              </v-card>
            </v-flex>
            <v-spacer/>
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
  </v-container> -->
</template>

<script>
import {mapActions, mapGetters, mapMutations, mapState} from 'vuex'

import postRouting from '@/mixins/postRouting'
import storyVersion from '@/mixins/storyVersion'
import storyblokLivePreview from '@/mixins/storyblokLivePreview'

import Breadcrumbs from '@/components/Breadcrumbs'
import ImageGallery from '@/components/productPage/ImageGallery'
import Thumbnail from '@/components/productPage/ImageGallery/Thumbnail'

export default {
  name: 'ProductPage',
  components: {
    Breadcrumbs,
    ImageGallery,
    Thumbnail,
  },
  mixins: [postRouting, storyVersion, storyblokLivePreview],
  data() {
    return {
      showcasingPhotoIndex: 0,
    }
  },
  computed: {
    ...mapState({routingInProgress: 'routingInProgress'}),
    ...mapState('product', {product: 'product'}),
    ...mapGetters('product', {
      photoUrls: 'photoUrls',
      featureEntries: 'featureEntries',
    }),
  },
  watch: {
    routingInProgress(inProgress) {
      if (inProgress) {
        this.resetPhotos()
        this.resetProduct()
      }
    },
  },
  fetch({store, params}) {
    const {dispatch} = store
    return dispatch('product/getProduct', params.slug)
      .then(() => Promise.resolve())
      .catch(error => {
        console.log(error)
        return Promise.reject(error)
      })
  },
  mounted() {
    return Promise.all([this.getPhotos(), this.getFeatures()])
      .then(() => Promise.resolve())
      .catch(error => {
        console.log(error)
        return Promise.reject(error)
      })
  },
  methods: {
    ...mapActions('product', {
      getFeatures: 'getFeatures',
      getPhotos: 'getPhotos',
    }),
    ...mapMutations('product', {
      registerPhotos: 'registerPhotos',
      resetProduct: 'resetProduct',
      resetPhotos: 'resetPhotos',
    }),
  },
}
</script>
