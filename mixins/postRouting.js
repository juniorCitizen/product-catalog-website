export default {
  mounted() {
    this.$store.commit('routingFinish')
    this.$storyblok.init()
    this.$storyblok.on('change', () => {
      window.location.reload()
    })
  },
}
