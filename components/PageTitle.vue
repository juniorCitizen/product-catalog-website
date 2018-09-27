<template>
  <v-container class="pa-0 mb-1"
               fluid>
    <v-layout>
      <v-flex>
        <v-card class="pa-0"
                color="green darken-4"
                flat>
          <v-card-title class="display-1 font-weight-black font-italic white--text">
            {{ title }}
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'PageTitle',
  props: {
    title: {
      type: String,
      default: 'Loading...',
    },
  },
}
</script>
