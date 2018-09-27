<template>
  <GmapMap
    :center="coordinate"
    :style="{height}"
    :zoom="parseFloat(company.content.zoom)"
    map-type-id="terrain">
    <GmapMarker :position="coordinate"/>
  </GmapMap>
</template>

<script>
export default {
  name: 'Location',
  props: {
    company: {
      type: Object,
      default() {
        return {
          content: {
            latitude: 0,
            longitude: 0,
            zoom: 5.5,
          },
        }
      },
    },
  },
  data() {
    return {
      height: '300px',
    }
  },
  computed: {
    coordinate() {
      const lat = this.company.content.latitude
      const lng = this.company.content.longitude
      return {lat, lng}
    },
  },
}
</script>
