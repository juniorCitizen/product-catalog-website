<template>
  <GmapMap
    :center="coordinate"
    :zoom="zoom"
    class="google-maps"
    map-type-id="terrain">
    <GmapMarker :position="coordinate"/>
  </GmapMap>
</template>

<script>
export default {
  name: 'Location',
  props: {
    coordinate: {
      type: Object,
      default() {
        return {lat: 0, lng: 0}
      },
    },
  },
  data() {
    return {
      zoom: parseFloat(process.env.defaultMapZoom),
    }
  },
}
</script>

<style scoped>
.google-maps {
  height: 300px;
}
</style>
