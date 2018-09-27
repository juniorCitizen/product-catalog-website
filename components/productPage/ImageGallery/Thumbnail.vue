<template>
  <v-flex xs2>
    <v-card class="pa-2"
            raised
            hover
            @click.native.stop="$emit('click')">
      <v-responsive>
        <v-img :src="url"
               :lazy-src="lazyImage"
               :height="height"
               :max-width="maxWidth"
               class="ma-auto"
               contain/>
      </v-responsive>
    </v-card>
  </v-flex>
</template>

<script>
const placeholder = {
  logo: require('@/assets/logo.png'),
  missing: require('@/assets/placeholder.svg'),
}
export default {
  name: 'Thumbnail',
  props: {
    url: {
      type: String,
      default: placeholder.missing,
    },
  },
  data() {
    return {
      lazyImage: placeholder.logo,
      height: 100,
      maxWidth: 100,
    }
  },
}
</script>
