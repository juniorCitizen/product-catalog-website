<template>
  <v-avatar tile>
    <v-img :src="src"
           :alt="alt"
           :height="'21px'"/>
  </v-avatar>
</template>

<script>
import gentryLogo from '@/assets/logo.png'

export default {
  name: 'FlagLogo',
  props: {
    alt: {
      type: String,
      default: 'undefined',
    },
    src: {
      type: String,
      default: gentryLogo,
    },
    size: {
      type: Number,
      default: null,
    },
  },
}
</script>
