<template>
  <div :style="styleBinding"
       class="certification"/>
</template>

<script>
const placeholder = require('~/assets/placeholder.svg')
export default {
  name: 'Certification',
  props: {
    name: {
      type: String,
      default: 'certification',
    },
    logoUrl: {
      type: String,
      default: '',
    },
  },
  computed: {
    styleBinding() {
      return !this.logoUrl
        ? {'background-image': `url(${placeholder})`}
        : {'background-image': `url(${this.urlHelper(this.logoUrl)})`}
    },
  },
  methods: {
    urlHelper(url) {
      return url.replace(
        '//a.storyblok.com',
        `//img2.storyblok.com/fit-in/75x75/filters::format\\(jpg\\):fill\\(white\\)`
      )
    },
  },
}
</script>

<style scoped>
.certification {
  flex-basis: 65px;
  margin: 5px;
  border: 1px solid rgb(36, 145, 145);
  box-shadow: 3px 3px rgba(36, 145, 145, 0.2);
  width: 65px;
  height: 65px;
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
}
</style>
