<template>
  <v-card-actions>
    <v-list three-line
            subheader>
      <template v-for="(uuid,index) in staffUuids">
        <v-divider v-if="index>0"
                   :key="index"
                   inset/>
        <staff :key="uuid"
               :uuid="uuid"/>
      </template>
    </v-list>
  </v-card-actions>
</template>

<script>
import Staff from '@/components/cards/ContactCard/Staff'

export default {
  name: 'Staffs',
  components: {Staff},
  props: {
    company: {
      type: Object,
      default() {
        return {
          content: {staffs: []},
        }
      },
    },
  },
  computed: {
    staffUuids() {
      return this.company.content.staffs
    },
  },
}
</script>
