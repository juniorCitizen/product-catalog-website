<template>
  <v-img :src="certification.content.logoUrl"
         :lazy-src="gentryLogo"
         :alt="certification.content.name"
         :max-width="75"
         :max-height="75"
         class="ml-2"/>
</template>

<script>
import {mapGetters} from 'vuex'

import gentryLogo from '@/assets/logo.png'

export default {
  name: 'Certification',
  props: {
    uuid: {
      type: String,
      default: null,
    },
  },
  data() {
    return {gentryLogo}
  },
  computed: {
    ...mapGetters('contacts', {
      getCertificationByUuid: 'getCertificationByUuid',
    }),
    certification() {
      return this.getCertificationByUuid(this.uuid)
    },
  },
}
</script>
