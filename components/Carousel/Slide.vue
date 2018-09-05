<template>
  <img :src="imageSource"
       class="slide">
</template>

<script>
export default {
  name: 'Slide',
  props: {
    imgSrc: {
      type: String,
      default: '',
    },
    // thumbSrc: {
    //   type: String,
    //   default: '',
    // },
  },
  data() {
    return {
      imageSource: this.imgSrc,
      // imageSource: this.thumbSrc,
    }
  },
  // mounted() {
  //   let image = new Image()
  //   image.onload = () => {
  //     this.imageSource = this.imgSrc
  //   }
  //   image.src = this.imgSrc
  // },
}
</script>

<style scoped>
.slide {
  width: 100%;
  height: 100%;
}
</style>
