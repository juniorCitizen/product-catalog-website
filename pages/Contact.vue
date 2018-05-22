<template>
  <section id="contact-view">
    <contact-card v-for="company in companies"
                  :key="company._uid"
                  :company="company"/>
  </section>
</template>

<script>
import vuexMappers from 'vuex'
import ContactCard from '~/components/ContactCard'
export default {
  name: 'ContactView',
  layout: 'default',
  components: {ContactCard},
  fetch({store}) {
    let contactList = store.getters['contactInfo/contactList']
    if (contactList.length === 0) {
      return store
        .dispatch('contactInfo/fetch')
        .then(() => Promise.resolve())
        .catch(error => {
          console.log(error)
          return Promise.reject(error)
        })
    }
  },
  computed: {
    ...vuexMappers.mapGetters('contactInfo', {companies: 'contactList'}),
  },
}
</script>

<style scoped>
#contact-view {
  background-color: whitesmoke;
}
</style>
