<template>
  <v-layout class="ma-0 pa-0"
            wrap>
    <v-flex xs4>
      <v-btn class="blue">
        Home Page
      </v-btn>
    </v-flex>
    <v-flex xs4>
      <v-btn nuxt
             to="/catalog">
        Catalog Page
      </v-btn>
    </v-flex>
    <v-flex xs4>
      <v-btn nuxt
             to="/contacts">
        Contact Page
      </v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
import postRouting from '@/mixins/postRouting'
import storyblokLivePreview from '@/mixins/storyblokLivePreview'

export default {
  name: 'HomePage',
  mixins: [postRouting, storyblokLivePreview],
}
</script>
