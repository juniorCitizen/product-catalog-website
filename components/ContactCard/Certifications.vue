<template>
  <div class="certifications">
    <div v-for="(certification,index) in certifications"
         :key="index"
         :style="logos[index]"
         class="wrapper"/>
  </div>
</template>

<script>
export default {
  name: 'Certifications',
  props: {
    certifications: {
      type: Array,
      default() {
        return []
      },
    },
  },
  computed: {
    logos() {
      return this.certifications.map(certification => {
        return {
          'background-image': `url(${this.urlHelper(certification.logo)})`,
        }
      })
    },
  },
  methods: {
    urlHelper(url) {
      return url.replace(
        '//a.storyblok.com',
        `//img2.storyblok.com/fit-in/50x50/filters:quality\\(60\\):format\\(jpg\\):fill\\(white\\)`
      )
    },
  },
}
</script>

<style scoped>
.certifications {
  display: flex;
  align-items: center;
  align-content: flex-start;
  flex-wrap: wrap;
  margin-top: 15px;
}

.wrapper {
  display: inline-block;
  border: 1px solid lightgray;
  margin-right: 5px;
  width: 50px;
  height: 50px;
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
}

/* .logo {
  width: 100%;
  height: 100%;
} */
</style>
