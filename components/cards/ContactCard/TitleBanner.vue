<template>
  <v-card-title primary-title>
    <div class="ml-2">
      <div class="headline orange--text text--ligten-3 font-weight-thin">
        {{ company.content.name.toUpperCase() }}
      </div>
      <v-chip class="body-2 ml-0 pr-0 pl-0 lighten-1 font-weight-black"
              color="transparent"
              text-color="green darken-4"
              outline
              label
              disabled
              small>
        <flag-logo :src="country.content.flagUrl"
                   :alt="country.content.name"/>
        {{ country.content.name }}
      </v-chip>
    </div>
    <certifications :company="company"/>
  </v-card-title>
</template>

<script>
import {mapGetters} from 'vuex'

import FlagLogo from '@/components/cards/ContactCard/flagLogo'
import Certifications from '@/components/cards/ContactCard/Certifications'

export default {
  name: 'TitleBanner',
  components: {
    FlagLogo,
    Certifications,
  },
  props: {
    company: {
      type: Object,
      default() {
        return {
          content: {
            name: 'Loading...',
            certifications: [],
          },
        }
      },
    },
  },
  computed: {
    ...mapGetters('contacts', {getCountryByUuid: 'getCountryByUuid'}),
    countryUuid() {
      return this.company.content.country
    },
    country() {
      return this.getCountryByUuid(this.countryUuid)
    },
  },
}
</script>
