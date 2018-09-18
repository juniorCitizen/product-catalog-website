<template>
  <v-card class="contact-card">
    <v-card-title>
      <v-avatar class="mr-2"
                tile>
        <v-img :src="country.content.flagUrl"
               :alt="country.content.name"
               max-width="40"
               max-height="25"/>
      </v-avatar>
      <div>
        <div class="headline font-weight-black">
          {{ content.name }}
        </div>
        <div class="caption grey--text">
          {{ country.content.name }}
        </div>
      </div>
    </v-card-title>
    <v-responsive>
      <location :coordinate="coordinate"/>
    </v-responsive>
    <v-card-text>
      <div v-for="(entry,index) in companyInfo"
           :key="index"
           class="mt-1 mb-1">
        <v-icon class="pr-2"
                color="black"
                small>{{ entry.icon }}</v-icon>
        <span class="body-2">{{ entry.info }}</span>
      </div>
    </v-card-text>
    <v-card-actions class="ma-0 ml-2">
      <certification v-for="certification in certifications"
                     :key="certification.id"
                     :certification="certification"/>
    </v-card-actions>
    <v-responsive>
      <v-container fluid
                   grid-list-sm>
        <v-layout row
                  wrap>
          <v-flex v-for="staff in staffs"
                  :key="staff.key"
                  xs12>
            <staff :staff="staff"/>
          </v-flex>
        </v-layout>
      </v-container>
    </v-responsive>
  </v-card>
</template>

<script>
import Location from './Location'
import Certification from './Certification'
import Staff from './Staff'
import storyVersion from '@/mixins/storyVersion'
export default {
  name: 'ContactCard',
  components: {Location, Certification, Staff},
  mixins: [storyVersion],
  props: {
    company: {
      type: Object,
      default() {
        return {
          content: {
            name: 'unnamed company',
            country: null,
            latitude: '0',
            longitude: '0',
            address: 'unspecified address',
            email: 'unspecified email',
            telephone: 'unspecified telephone',
            fax: 'unspecified fax',
            certifications: [],
            staffs: [],
          },
        }
      },
    },
  },
  data() {
    const placeholder = require('~/assets/placeholder.svg')
    return {
      placeholder: placeholder,
      country: {
        content: {
          name: 'unnamed country',
          flagUrl: placeholder,
        },
      },
      certifications: [],
      staffs: [],
    }
  },
  computed: {
    content() {
      return this.company.content
    },
    companyInfo() {
      return [
        {
          icon: 'location_on',
          info: this.content.address,
        },
        {
          icon: 'email',
          info: this.content.email,
        },
        {
          icon: 'phone',
          info: this.content.telephone,
        },
        {
          icon: 'print',
          info: this.content.fax,
        },
      ]
    },
    countryId() {
      return this.content.country
    },
    certificationUuids() {
      return this.content.certifications
    },
    staffUuids() {
      return this.content.staffs
    },
    coordinate() {
      return {
        lat: parseFloat(this.content.latitude),
        lng: parseFloat(this.content.longitude),
      }
    },
  },
  mounted() {
    return Promise.all([
      this.getCountry(),
      this.getCertifications(),
      this.getStaffs(),
    ])
      .then(() => Promise.resolve())
      .catch(error => {
        console.log(error)
        return Promise.reject()
      })
  },
  methods: {
    getCountry() {
      if (!this.countryId) return
      return this.$storyapi
        .get(`cdn/stories/${this.countryId}`, {version: this.version})
        .then(res => {
          this.country = res.data.story
          return Promise.resolve()
        })
        .catch(error => {
          console.log(error)
          return Promise.reject()
        })
    },
    getCertifications() {
      if (!this.certificationUuids.length) return []
      return this.$storyapi
        .get('cdn/stories', {
          version: this.version,
          starts_with: 'certifications',
          sort_by: 'position:asc',
          by_uuids: this.certificationUuids.join(),
        })
        .then(res => {
          this.certifications = res.data.stories
          return Promise.resolve()
        })
        .catch(error => {
          console.log(error)
          return Promise.reject()
        })
    },
    getStaffs() {
      if (!this.staffUuids.length) return []
      return this.$storyapi
        .get('cdn/stories', {
          version: this.version,
          starts_with: 'staffs',
          sort_by: 'position:asc',
          by_uuids: this.staffUuids.join(),
        })
        .then(res => {
          this.staffs = res.data.stories
          return Promise.resolve()
        })
        .catch(error => {
          console.log(error)
          return Promise.reject()
        })
    },
  },
}
</script>
