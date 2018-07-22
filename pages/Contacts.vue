<template>

  <section id="contacts">
    <alt-contact-card v-for="contact in contacts"
                      :key="contact._uid"
                      :contact="contact"/>
  </section>
</template>

<script>
import vuexMappers from 'vuex'
import AltContactCard from '~/components/AltContactCard'

export default {
  name: 'Contacts',
  layout: 'default',
  components: {AltContactCard},
  fetch({store}) {
    let contacts = store.getters['contacts/contacts']
    if (contacts.length === 0) {
      return store.dispatch('contacts/fetch').catch(console.error)
    }
  },
  computed: {
    ...vuexMappers.mapGetters('contacts', {contacts: 'contacts'}),
  },
}
</script>
