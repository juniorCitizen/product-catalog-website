<template>
  <v-breadcrumbs>
    <v-icon slot="divider">chevron_right</v-icon>
    <v-breadcrumbs-item v-for="(item,index) in breadcrumbItems"
                        :key="index"
                        :disabled="item.disabled"
                        class="font-weight-black subheading">
      {{ item.text }}
    </v-breadcrumbs-item>
  </v-breadcrumbs>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'Breadcrumbs',
  computed: {
    ...mapState('catalog', {breadcrumbItems: 'breadcrumbItems'}),
  },
}
</script>
