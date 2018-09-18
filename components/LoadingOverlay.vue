<template>
  <v-dialog v-model="active"
            transition="false"
            fullscreen
            persistent>
    <v-card color="black"
            style="opacity:0.4;">
      <v-card-text>
        <v-progress-circular
          color="white"
          size="70"
          indeterminate/>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'LoadingOverlay',
  data() {
    return {
      active: false,
    }
  },
  computed: {
    ...mapState({routingInProgress: 'routingInProgress'}),
  },
  watch: {
    routingInProgress(inProgress) {
      this.active = inProgress
    },
  },
}
</script>
