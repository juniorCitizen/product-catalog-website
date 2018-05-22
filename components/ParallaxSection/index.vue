<template>
  <div :style="styleBinding"
       class="parallax-section">
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'ParallaxSection',
  props: {
    background: {
      type: Object,
      default() {
        return {
          imageUrl: null,
          contained: false,
          grayscaleLevel: null,
          color: 'transparent',
        }
      },
    },
    shiftRate: {
      type: Number,
      default() {
        return 0
      },
    },
    heightRatio: {
      type: Number,
      default() {
        return 100
      },
    },
    screenVSlices: {
      type: Number,
      required: true,
    },
    totalHeight: {
      type: Number,
      required: true,
    },
    yOffset: {
      type: Number,
      required: true,
    },
    leadingVSlices: {
      type: Number,
      required: true,
    },
  },
  computed: {
    pixelsPerVSlice() {
      return this.totalHeight / this.screenVSlices
    },
    shiftBoundaries() {
      return {
        start: this.pixelsPerVSlice * this.leadingVSlices,
        end: this.pixelsPerVSlice * (this.leadingVSlices + this.heightRatio),
      }
    },
    shiftAmount() {
      let start = this.shiftBoundaries.start
      let end = this.shiftBoundaries.end
      if (this.yOffset >= start && this.yOffset < end) {
        return Math.round(this.yOffset - start) / this.shiftRate
      } else {
        return 0
      }
    },
    styleBinding() {
      let style = {
        height: `${this.heightRatio}vh`,
        'background-color': this.background.color,
        'background-size': this.background.contained ? 'contain' : 'cover',
        'background-position': `50% -${this.shiftAmount}px`,
      }
      if (this.background.imageUrl)
        style['background-image'] = `url(${this.background.imageUrl})`
      if (this.background.grayscaleLevel)
        style.filter = `grayscale(${this.background.grayscaleLevel}%)`
      return style
    },
  },
}
</script>


<style scoped>
.parallax-section {
  background-repeat: no-repeat;
  background-attachment: fixed;
  display: grid;
  align-content: center;
  justify-content: center;
}
/* @media screen and (orientation: portrait) {
  .parallax-section {
    background-position: center !important;
    background-attachment: scroll;
  }
} */
</style>
