<template>
  <v-card-text>
    <div>
      <div class="mt-1 mb-1">
        <v-icon class="mr-1"
                color="orange darken-3">
          location_on
        </v-icon>
        <span class="body-2 green--text text--darken-4 font-weight-thin">
          {{ company.content.address }}
        </span>
      </div>
      <div class="mt-1 mb-1">
        <v-icon class="mr-1"
                color="orange darken-3">
          phone
        </v-icon>
        <span class="body-2 green--text text--darken-4 font-weight-thin">
          {{ company.content.telephone }}
        </span>
      </div>
      <div class="mt-1 mb-1">
        <v-icon class="mr-1"
                color="orange darken-3">
          print
        </v-icon>
        <span class="body-2 green--text text--darken-4 font-weight-thin">
          {{ company.content.fax }}
        </span>
      </div>
      <div class="mt-1 mb-1">
        <v-icon class="mr-2"
                color="orange darken-3">
          email
        </v-icon>
        <a :href="`mailto:${company.content.email}`"
           class="body-2 font-weight-thin">{{ company.content.email }}</a>
      </div>
    </div>
  </v-card-text>
</template>

<script>
export default {
  name: 'CompanyInfo',
  props: {
    company: {
      type: Object,
      default() {
        return {
          content: {
            address: 'Loading...',
            email: 'Loading...',
            telephone: 'Loading...',
            fax: 'Loading...',
          },
        }
      },
    },
  },
}
</script>
