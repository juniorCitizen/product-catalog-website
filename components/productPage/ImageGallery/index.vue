<template>
  <v-container :fill-height="rows>1"
               class="ma-0 pa-0"
               fluid>
    <v-layout class="ma-0 pa-0"
              fill-height>
      <v-flex class="ma-0 pa-0">
        <v-card :height="height+'%'"
                class="ma-0 pa-0"
                raised>
          <row-container v-for="rowNumber of rows"
                         :key="rowNumber"
                         :size="perRow"/>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import RowContainer from './RowContainer'
import Thumbnail from './Thumbnail'
export default {
  name: 'ImageGallary',
  components: {RowContainer, Thumbnail},
  props: {
    urls: {type: Array, default: () => []},
    multiRow: {type: Boolean, default: false},
    perRow: {type: Number, default: 3},
    height: {type: Number, default: 100},
  },
  computed: {
    rows() {
      return !this.multiRow ? 1 : Math.ceil(this.urls.length / this.perRow)
    },
  },
}
</script>
