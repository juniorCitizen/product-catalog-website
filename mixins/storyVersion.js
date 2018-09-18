export default {
  computed: {
    version() {
      return process.env.NODE_ENV === 'development' ? 'draft' : 'published'
    },
  },
}
