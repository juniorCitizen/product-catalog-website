<template>
  <v-container class="ma-0 pa-0"
               fill-height
               fluid>
    <v-layout class="ma-0 pa-0"
              fill-height
              column>
      <v-flex class="ma-0 pa-0"
              xs12>
        <page-title title="Contact Us"/>
        <v-container class="ma-0 pa-0"
                     grid-list-lg
                     fluid>
          <v-layout class="ma-0 pa-0"
                    wrap>
            <v-flex v-for="company in companies"
                    :key="company.uuid"
                    sm12
                    md6
                    lg4>
              <contact-card :company="company"/>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import {mapState} from 'vuex'

import postRouting from '@/mixins/postRouting'
import storyblokLivePreview from '@/mixins/storyblokLivePreview'

import ContactCard from '@/components/cards/ContactCard'
import PageTitle from '@/components/PageTitle'

export default {
  name: 'ContactsPage',
  components: {ContactCard, PageTitle},
  mixins: [postRouting, storyblokLivePreview],
  fetch({store}) {
    const {dispatch} = store
    return Promise.all([
      dispatch('contacts/fetchAllCountries'),
      dispatch('contacts/fetchAllCertifications'),
      dispatch('contacts/fetchAllStaffs'),
    ])
      .then(() => Promise.resolve())
      .catch(error => this.$nuxt.error(error))
  },
  computed: {
    ...mapState('contacts', {companies: 'companies'}),
  },
}
</script>
