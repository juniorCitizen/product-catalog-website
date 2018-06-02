<template>
  <div class="backdrop">
    <div :style="styleBinding"
         class="photo-on-display"/>
  </div>
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
.backdrop {
  min-height: 60%;
  display: flex;
  justify-content: center;
  align-items: stretch;
  /* background-image: url(~/assets/background_blend.jpg); */
  /* background-size: cover; */
  /* background-position: center; */
  /* background-repeat: repeat; */
}
.photo-on-display {
  flex: 0 0 100%;
  background-color: white;
  /* background-color: transparent; */
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}
@media only screen and (max-width: 460px) {
  .backdrop {
    border-top: 1px solid lightgray;
    border-left: 1px solid lightgray;
    border-right: 1px solid lightgray;
    margin: 5px 5px 0 5px;
    min-height: 50%;
    display: flex;
    justify-content: center;
    align-items: stretch;
    /* background-image: url(~/assets/background_colorful.jpg); */
    /* background-size: cover; */
    /* background-position: center; */
    /* background-repeat: repeat; */
  }
  .photo-on-display {
    flex: 0 0 100%;
    background-color: white;
    /* background-color: transparent; */
  }
}
</style>
