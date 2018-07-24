<template>
  <section id="contacts">
    <alt-contact-card v-for="company in companies"
                      :key="company._uid"
                      :company="company"/>
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
    let companies = store.getters['contacts/companies']
    if (companies.length === 0) {
      return store.dispatch('contacts/fetch').catch(console.error)
    }
  },
  computed: {
    ...vuexMappers.mapGetters('contacts', {companies: 'companies'}),
  },
}
</script>
