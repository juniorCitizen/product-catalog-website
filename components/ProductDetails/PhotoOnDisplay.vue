<template>
  <div :style="styleBinding"
       class="photo-on-display"/>
</template>

<script>
export default {
  name: 'PhotoOnDisplay',
  props: {
    photoOnDisplay: {
      type: String,
      default() {
        return null
      },
    },
  },
  computed: {
    processedUrl() {
      if (!this.photoOnDisplay) return null
      return this.photoOnDisplay.replace(
        '//a.storyblok.com',
        `//img2.storyblok.com/filters:quality\\(100\\):format\\(jpg\\):fill\\(whitesmoke\\)`
      )
    },
    styleBinding() {
      return this.photoOnDisplay
        ? {'background-image': `url(${this.processedUrl})`}
        : {'background-image': `url(${require('~/assets/placeholder.svg')})`}
    },
  },
}
</script>

<style scoped>
.photo-on-display {
  min-height: 60%;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}
@media only screen and (max-width: 460px) {
  .photo-on-display {
    border: 1px solid lightgray;
    min-height: 50%;
    margin: 5px 5px 0 5px;
    background-color: white;
  }
}
</style>
