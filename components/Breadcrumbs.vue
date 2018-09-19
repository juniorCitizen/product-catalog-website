<template>
  <v-breadcrumbs :large="large">
    <v-icon slot="divider">chevron_right</v-icon>
    <v-breadcrumbs-item :disabled="breadcrumbItems[0].disabled"
                        @click.native.stop="homeCrumbSelection">
      {{ breadcrumbItems[0].text }}
    </v-breadcrumbs-item>
    <template v-for="(item,index) in breadcrumbItems">
      <v-breadcrumbs-item v-if="index>0"
                          :key="index"
                          :disabled="item.disabled"
                          @click.native.stop="crumbSelection(index)">
        {{ item.text }}
      </v-breadcrumbs-item>
    </template>
  </v-breadcrumbs>
</template>

<script>
import {mapMutations, mapState} from 'vuex'

import preRouting from '@/mixins/preRouting'

export default {
  name: 'Breadcrumbs',
  mixins: [preRouting],
  props: {
    large: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapState('catalog', {breadcrumbItems: 'breadcrumbItems'}),
  },
  methods: {
    ...mapMutations('catalog', {
      navigateToBreadcrumb: 'navigateToBreadcrumb',
      resetBreadcrumbs: 'resetBreadcrumbs',
    }),
    homeCrumbSelection() {
      this.resetBreadcrumbs()
      this.toPath('/catalog')
    },
    crumbSelection(index) {
      this.navigateToBreadcrumb(index)
      this.toPath(this.breadcrumbItems[index].path)
    },
  },
}
</script>
