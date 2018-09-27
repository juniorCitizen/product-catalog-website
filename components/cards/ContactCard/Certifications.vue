<template>
  <v-card-actions>
    <certification v-for="uuid in certificationUuids"
                   :key="uuid"
                   :uuid="uuid"/>
  </v-card-actions>
</template>

<script>
import Certification from '@/components/cards/ContactCard/Certification'

export default {
  name: 'Certifications',
  components: {Certification},
  props: {
    company: {
      type: Object,
      default() {
        return {
          content: {certifications: []},
        }
      },
    },
  },
  computed: {
    certificationUuids() {
      return this.company.content.certifications
    },
  },
}
</script>
