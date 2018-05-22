<template>
  <div id="page-footer">
    <copyright-text/>
  </div>
</template>

<script>
import vuexMapper from 'vuex'
import CopyrightText from './CopyrightText'
export default {
  name: 'PageFooter',
  components: {CopyrightText},
  props: {
    type: {
      type: String,
      default: 'grid',
      validator(stringValue) {
        return ['grid', 'fixed'].indexOf(stringValue) !== -1
      },
    },
  },
  mounted() {
    let el = window.document.getElementById('page-footer')
    this.register({
      offsetTop: el.offsetTop,
      offsetHeight: el.offsetHeight,
    })
    window.addEventListener('scroll', () => {
      this.register({
        offsetTop: el.offsetTop,
        offsetHeight: el.offsetHeight,
      })
    })
    window.addEventListener('resize', () => {
      this.register({
        offsetTop: el.offsetTop,
        offsetHeight: el.offsetHeight,
      })
    })
  },
  destroyed() {
    window.removeEventListener('scroll', () => {
      this.reset()
    })
    window.removeEventListener('resize', () => {
      this.reset()
    })
  },
  methods: {
    ...vuexMapper.mapMutations('dimensions', {
      register: 'registerPageFooterDimensions',
      reset: 'resetPageFooterDimensions',
    }),
  },
}
</script>

<style scoped>
div {
  box-sizing: border-box;
  width: 100%;
  margin: 0;
  padding: 0;
  background-color: whitesmoke;
  position: -webkit-sticky;
  position: sticky;
  bottom: 0;
}
</style>
