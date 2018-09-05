<template>
  <div id="carousel">
    <transition-group name="slide"
                      tag="div"
                      class="slide-container">
      <template v-for="(slide,index) in slides">
        <slide v-if="index===displayIndex"
               :key="index"
               :thumb-src="slides[index].thumbSrc"
               :img-src="slides[index].imgSrc"/>
      </template>
    </transition-group>
  </div>
</template>

<script>
import Slide from '@/components/Carousel/Slide'
import a from '@/assets/carousels/a.jpg'
import b from '@/assets/carousels/b.jpg'
import c from '@/assets/carousels/c.jpg'
import d from '@/assets/carousels/d.jpg'
import e from '@/assets/carousels/e.jpg'
import f from '@/assets/carousels/f.jpg'
import g from '@/assets/carousels/g.jpg'
import h from '@/assets/carousels/h.jpg'
export default {
  name: 'Carousel',
  components: {Slide},
  layout: 'default',
  data() {
    return {
      displayIndex: 0,
      iteratorHandle: null,
      slides: [
        {
          thumbSrc: require('@/assets/carousels/a.min.jpg'),
          imgSrc: a,
        },
        {
          thumbSrc: require('@/assets/carousels/b.min.jpg'),
          imgSrc: b,
        },
        {
          thumbSrc: require('@/assets/carousels/c.min.jpg'),
          imgSrc: c,
        },
        {
          thumbSrc: require('@/assets/carousels/d.min.jpg'),
          imgSrc: d,
        },
        {
          thumbSrc: require('@/assets/carousels/e.min.jpg'),
          imgSrc: e,
        },
        {
          thumbSrc: require('@/assets/carousels/f.min.jpg'),
          imgSrc: f,
        },
        {
          thumbSrc: require('@/assets/carousels/g.min.jpg'),
          imgSrc: g,
        },
        {
          thumbSrc: require('@/assets/carousels/h.min.jpg'),
          imgSrc: h,
        },
      ],
    }
  },
  computed: {
    slideCount() {
      return this.slides.length
    },
  },
  mounted() {
    this.iteratorHandle = setInterval(() => {
      if (this.displayIndex === this.slideCount - 1) {
        this.displayIndex = 0
      } else {
        this.displayIndex++
      }
    }, 10000)
  },
  beforeDestroy() {
    this.iteratorHandle = null
  },
}
</script>

<style scoped>
#carousel {
  width: 100%;
  height: 100%;
  display: flex;
  overflow: hidden;
}
.slide-container {
  margin: auto;
  width: 90%;
  overflow: hidden;
  display: flex;
}
.slide-leave-active {
  animation: slideOut 2s;
}
.slide-enter-active {
  animation: slideIn 2s;
}
@keyframes slideOut {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
}
@keyframes slideIn {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
}
</style>
