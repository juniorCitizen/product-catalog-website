<template>
  <div :style="styleBinding"
       class="parallax-section">
    <slot/>
  </div>
</template>

<script>
import vuexMappers from 'vuex'
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
    ...vuexMappers.mapGetters('mobileDetect', {isMobile: 'isMobile'}),
    pixelsPerVSlice() {
      return this.totalHeight / this.screenVSlices
    },
    shiftBoundaries() {
      let start = this.pixelsPerVSlice * this.leadingVSlices
      let end = this.pixelsPerVSlice * (this.leadingVSlices + this.heightRatio)
      return {
        start,
        end,
        proximityTopEdge: start - 100,
        proximityBottomEdge: start + 250,
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
        'background-position': this.isMobile
          ? 'center'
          : `50% -${this.shiftAmount}px`,
        'background-attachment': this.isMobile ? 'scroll' : 'fixed',
      }
      if (this.background.imageUrl)
        style['background-image'] = `url(${this.background.imageUrl})`
      if (this.background.grayscaleLevel)
        style.filter = `grayscale(${this.background.grayscaleLevel}%)`
      return style
    },
  },
  watch: {
    yOffset(a, b) {
      if (
        a >= this.shiftBoundaries.proximityTopEdge &&
        a <= this.shiftBoundaries.start &&
        a > b
      ) {
        window.scrollTo(0, this.shiftBoundaries.start)
      }
      if (
        a >= this.shiftBoundaries.start &&
        a <= this.shiftBoundaries.proximityBottomEdge &&
        a < b
      ) {
        window.scrollTo(0, this.shiftBoundaries.start)
      }
    },
  },
}
</script>


<style scoped>
.parallax-section {
  background-repeat: no-repeat;
  display: grid;
  align-content: center;
  justify-content: center;
}
</style>
