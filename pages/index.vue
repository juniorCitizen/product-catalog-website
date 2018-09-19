<template>
  <v-container fluid
               fill-height
               class="grey">
    <v-layout align-center
              justify-center
              fill-height
              class="red">
      <v-btn class="blue">
        Home Page
      </v-btn>
      <v-btn nuxt
             to="/catalog">
        Catalog Page
      </v-btn>
      <v-btn nuxt
             to="/contacts">
        Contact Page
      </v-btn>
    </v-layout>
  </v-container>
</template>

<script>
import postRouting from '@/mixins/postRouting'
import storyblokLivePreview from '@/mixins/storyblokLivePreview'

export default {
  name: 'HomePage',
  mixins: [postRouting, storyblokLivePreview],
}
</script>
