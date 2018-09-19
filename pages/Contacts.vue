<template>
  <v-container fluid
               fill-height>
    <v-layout column>
      <v-flex>
        <v-container class="headline pa-0 pb-4"
                     fluid>
          Contact Us
        </v-container>
        <v-container class="pa-0"
                     grid-list-xl
                     fluid>
          <v-layout wrap>
            <v-flex v-for="company in companies"
                    :key="company.uuid"
                    sm6
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

export default {
  name: 'ContactsPage',
  components: {ContactCard},
  mixins: [postRouting, storyblokLivePreview],
  computed: {
    ...mapState('contacts', {companies: 'companies'}),
  },
}
</script>
