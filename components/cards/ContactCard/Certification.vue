<template>
  <v-img :alt="certification.content.name"
         :src="certification.content.logoUrl"
         class="ma-0 mr-2"
         max-width="45px"
         max-height="45px"/>
</template>

<script>
export default {
  name: 'Certification',
  props: {
    certification: {
      type: Object,
      default() {
        return {
          content: {
            name: 'unnamed certification',
            logoUrl: require('~/assets/placeholder.svg'),
          },
        }
      },
    },
  },
}
</script>
