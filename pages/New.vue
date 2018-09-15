<template>
  <section>
    <div class="google-maps-container">
      <GmapMap :center="mapCenter"
               :zoom="mapZoom"
               map-type-id="terrain"
               class="google-maps-element">
        <GmapMarker v-for="(mapMarker,index) in mapMarkers"
                    :key="index"
                    :position="mapMarker"
                    :clickable="false" />
      </GmapMap>
    </div>
    <div class="contact-cards">
      <contact-card v-for="company in companies"
                    :key="company.uuid"
                    :company="company.content"
                    @located="mapMarkers.push($event)"
                    @inFocus="focusedCompanyId=company.id"
                    @outOfFocus="focusedCompanyId=null"/>
    </div>
  </section>
</template>

<script>
import livePreview from '@/mixins/storyblok/livePreview'
import ContactCard from '@/components/contacts/ContactCard'
export default {
  layout: 'blank',
  components: {ContactCard},
  mixins: [livePreview],
  data() {
    return {
      companies: [],
      mapMarkers: [],
      focusedCompanyId: null,
    }
  },
  computed: {
    mapZoom() {
      return parseInt(process.env.defaultMapZoom)
    },
    mapMarkerArray() {
      return this.mapMarkers.reduce((array, mapMarker) => {
        array.push([mapMarker.lat, mapMarker.lng])
        return array
      }, [])
    },
    mapCenter() {
      if (this.focusedCompanyId) {
        const filterFn = company => company.id === this.focusedCompanyId
        const focusedCompany = this.companies.filter(filterFn)[0]
        return {
          lat: parseFloat(focusedCompany.content.latitude),
          lng: parseFloat(focusedCompany.content.longitude),
        }
      }
      const coordinateCount = this.mapMarkers.length
      if (coordinateCount === 0) return {lat: 22.930048, lng: 117.0834543}
      let sumX = 0.0
      let sumY = 0.0
      let sumZ = 0.0
      for (let counter = 0; counter < coordinateCount; counter++) {
        const lat = (this.mapMarkerArray[counter][0] * Math.PI) / 180
        const lon = (this.mapMarkerArray[counter][1] * Math.PI) / 180
        sumX += Math.cos(lat) * Math.cos(lon)
        sumY += Math.cos(lat) * Math.sin(lon)
        sumZ += Math.sin(lat)
      }
      sumX /= coordinateCount
      sumY /= coordinateCount
      sumZ /= coordinateCount
      const lon = Math.atan2(sumY, sumX)
      const hyp = Math.sqrt(sumX * sumX + sumY * sumY)
      const lat = Math.atan2(sumZ, hyp)
      return {
        lat: (lat * 180) / Math.PI,
        lng: (lon * 180) / Math.PI,
      }
    },
  },
  mounted() {
    this.$storyblok.init()
    this.$storyblok.on('change', function() {
      window.location.reload()
    })
  },
  asyncData(context) {
    const version =
      context.query._storyblok || context.isDev ? 'draft' : 'published'
    return context.app.$storyapi
      .get('cdn/stories', {
        starts_with: 'companies',
        version,
      })
      .then(res => {
        return {companies: res.data.stories}
      })
      .catch(error => {
        context.error({
          statusCode: error.response.status,
          message: error.response.data,
        })
      })
  },
}
</script>

<style scoped>
.google-maps-container {
  height: 400px;
  margin: 10px;
}

.google-maps-element {
  width: 100%;
  height: 100%;
}

@media screen and (max-width: 640px) {
  .google-maps-container {
    display: none;
  }
}

div.contact-cards {
  margin-left: 10px;
  margin-right: 10px;
}

@media screen and (min-width: 1024px) {
  div.contact-cards {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
}
</style>
