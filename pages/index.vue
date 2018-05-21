<template>
  <div>
    <div>index page</div>
    <div>index page</div>
    <div>index page</div>
    <div>index page</div>
    <div>index page</div>
    <div>index page</div>
    <div>index page</div>
    <div>index page</div>
    <div>index page</div>
    <div>index page</div>
    <div>index page</div>
    <div>index page</div>
    <div>index page</div>
    <div>index page</div>
    <div>index page</div>
    <div>index page</div>
    <div>index page</div>
    <div>index page</div>
    <div>index page</div>
    <div>index page</div>
    <div>index page</div>
    <div>index page</div>
    <div>index page</div>
    <div>index page</div>
    <div>index page</div>
    <div>index page</div>
    <div>index page</div>
    <div>index page</div>
    <div>index page</div>
    <div>index page</div>
    <div>index page</div>
    <div>index page</div>
    <div>index page</div>
    <div>index page</div>
    <div>index page</div>
    <div>index page</div>
    <div>index page</div>
    <div>index page</div>
    <div>index page</div>
    <div>index page</div>
    <div>index page</div>
    <div>index page</div>
    <div>index page</div>
    <div>index page</div>
    <div>index page</div>
    <div>index page</div>
    <div>index page</div>
    <div>index page</div>
    <div>index page</div>
    <div>index page</div>
    <div>index page</div>
    <div>index page</div>
    <div>index page</div>
    <div>index page</div>
    <div>index page</div>
    <div>index page</div>
    <div>index page</div>
    <div>index page</div>
    <div>index page</div>
    <div>index page</div>
    <div>index page</div>
    <div>index page</div>
    <div>index page</div>
    <div>index page</div>
    <div>index page</div>
    <div>index page</div>
    <div>index page</div>
    <div>index page</div>
    <div>index page</div>
    <div>index page</div>
    <div>index page</div>
    <div>index page</div>
    <div>index page</div>
    <div>index page</div>
    <div>index page</div>
    <div>index page</div>
    <div>index page</div>
    <div>index page</div>
    <div>index page</div>
    <div>index page</div>
    <div>index page</div>
    <div>index page</div>
    <div>index page</div>
    <div>index page</div>
    <div>index page</div>
    <div>index page</div>
    <div>index page</div>
    <div>index page</div>
    <div>index page</div>
    <div>index page</div>
    <div>index page</div>
    <div>index page</div>
    <div>index page</div>
    <div>index page</div>
    <div>index page</div>
    <div>index page</div>
    <div>index page</div>
    <div>index page</div>
    <div>index page</div>
    <div>index page</div>
  </div>
</template>

<script>
import MobileDetect from 'mobile-detect'

export default {
  name: 'IndexPage',
  layout: 'Default',
  components: {},
  mounted() {
    let md = new MobileDetect(window.navigator.userAgent)

    console.log(md.mobile())
    console.log(md.phone())
    console.log(md.tablet())
    console.log(md.os())
    console.log(md.userAgent())
  },
}
</script>

<style scoped>
</style>
