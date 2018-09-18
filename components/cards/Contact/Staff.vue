<template>
  <v-card color="blue lighten-4">
    <v-card-title class="pa-2"
                  primary-title>
      <v-avatar class="mr-3"
                color="shade white">
        <v-icon x-large>person</v-icon>
      </v-avatar>
      <div>
        <div class="headline font-weight-black">
          {{ staff.content.name }}
        </div>
        <div class="caption grey--text">
          {{ staff.content.mobile }}
        </div>
        <div class="caption">
          <a :href="`mailto:${staff.content.email}`">
            {{ staff.content.email }}
          </a>
        </div>
      </div>
    </v-card-title>
  </v-card>
</template>

<script>
export default {
  name: 'Staff',
  props: {
    staff: {
      type: Object,
      default() {
        return {
          content: {
            name: 'unnamed staff',
            email: process.env.adminEmail,
            mobile: 'unspecified mobile',
          },
        }
      },
    },
  },
}
</script>
