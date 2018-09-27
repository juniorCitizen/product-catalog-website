<template>
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
</template>

<script>
import {mapState} from 'vuex'

import postRouting from '@/mixins/postRouting'
import storyblokLivePreview from '@/mixins/storyblokLivePreview'

import ContactCard from '@/components/cards/ContactCard'

export default {
  name: 'ContactsPage',
  components: {ContactCard},
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
