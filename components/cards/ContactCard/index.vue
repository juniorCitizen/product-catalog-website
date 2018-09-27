<template>
  <v-card :height="'auto'"
          raised
          hover>
    <title-banner :company="company"/>
    <location :company="company"/>
    <company-info :company="company"/>
    <v-divider/>
    <certifications :company="company"/>
    <v-divider/>
    <staffs :company="company"/>
  </v-card>
</template>

<script>
import gentryLogo from '@/assets/logo.png'

import TitleBanner from '@/components/cards/ContactCard/TitleBanner'
import Location from '@/components/cards/ContactCard/Location'
import CompanyInfo from '@/components/cards/ContactCard/CompanyInfo'
import Certifications from '@/components/cards/ContactCard/Certifications'
import Staffs from '@/components/cards/ContactCard/Staffs'

export default {
  name: 'ContactCard',
  components: {
    TitleBanner,
    Location,
    CompanyInfo,
    Certifications,
    Staffs,
  },
  props: {
    company: {
      type: Object,
      default() {
        return {
          content: {
            name: 'Loading...',
            country: {
              contents: {
                name: 'Loading...',
                flagUrl: gentryLogo,
              },
            },
            latitude: 0,
            longitude: 0,
            address: 'Loading...',
            email: 'Loading...',
            telephone: 'Loading...',
            fax: 'Loading...',
            certifications: [],
            staffs: [],
          },
        }
      },
    },
  },
}
</script>
