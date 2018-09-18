export default {
  methods: {
    toPath(path) {
      if (this.$route.path !== path) {
        this.$store.commit('routingStart')
        this.$router.push(path)
      }
    },
  },
}
