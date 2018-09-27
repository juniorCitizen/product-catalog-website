<template>
  <v-list-tile avatar>
    <v-list-tile-avatar>
      <v-icon class="pa-0"
              color="green darken-4"
              x-large>
        person
      </v-icon>
    </v-list-tile-avatar>
    <v-list-tile-content>
      <v-list-tile-title class="title font-weight-thin orange--text text--darken-3">
        {{ staff.content.name }}
      </v-list-tile-title>
      <v-list-tile-sub-title>
        <a :href="`mailto:${staff.content.email}`">
          {{ staff.content.email }}
        </a>
        <template v-if="staff.content.mobile">
          <br>{{ staff.content.mobile }}
        </template>
      </v-list-tile-sub-title>
    </v-list-tile-content>
  </v-list-tile>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'Staff',
  props: {
    uuid: {
      type: String,
      default: null,
    },
  },
  computed: {
    ...mapGetters('contacts', {getStaffByUuid: 'getStaffByUuid'}),
    staff() {
      return this.getStaffByUuid(this.uuid)
    },
  },
}
</script>
