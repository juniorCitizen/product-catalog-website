<template>
  <div class="contact-card"
       @mouseover="$emit('inFocus')"
       @mouseout="$emit('outOfFocus')">
    <company :name="company.name"
             :country="country"
             :address="company.address"
             :telephone="company.telephone"
             :fax="company.fax"/>
    <div class="certifications">
      <certification v-for="certification in certifications"
                     :key="certification.id"
                     :name="certification.content.name"
                     :logo-url="certification.content.logoUrl" />
    </div>
    <div class="staffs">
      <staff v-for="staff in staffs"
             :key="staff.id"
             :name="staff.content.name"
             :email="staff.content.email"
             :mobile="staff.content.mobile" />
    </div>
  </div>
</template>

<script>
import Company from '@/components/contacts/Company'
import Certification from '@/components/contacts/Certification'
import Staff from '@/components/contacts/Staff'
const placeholder = require('~/assets/placeholder.svg')
export default {
  name: 'ContactCard',
  components: {Certification, Company, Staff},
  props: {
    company: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  data() {
    return {
      country: {
        name: 'country',
        flagUrl: placeholder,
      },
      certifications: [],
      staffs: [],
    }
  },
  computed: {
    markerPosition() {
      return {
        lat: parseFloat(this.company.latitude),
        lng: parseFloat(this.company.longitude),
      }
    },
  },
  mounted() {
    this.$emit('located', this.markerPosition)
    const version =
      process.env.NODE_ENV === 'development' ? 'draft' : 'published'
    const sortFn = (a, b) => a.name > b.name
    return this.$storyapi
      .get(`cdn/stories/${this.company.country}`, {version})
      .then(res => {
        const country = res.data.story.content
        this.country.name = country.name
        this.country.flagUrl = country.flagUrl
        return this.$storyapi.get('cdn/stories', {
          version,
          starts_with: 'certifications',
          by_uuids: this.company.certifications.join(),
        })
      })
      .then(res => {
        const certifications = res.data.stories
        this.certifications = certifications
          .map(certification => certification)
          .sort(sortFn)
        return this.$storyapi.get('cdn/stories', {
          version,
          starts_with: 'staffs',
          by_uuids: this.company.staffs.join(),
        })
      })
      .then(res => {
        const staffs = res.data.stories
        this.staffs = staffs.map(staff => staff).sort(sortFn)
      })
      .catch(error => {
        console.log(error)
      })
  },
}
</script>

<style scoped>
.contact-card {
  border: 1px solid rgba(0, 0, 0, 0.1);
  background-color: whitesmoke;
  border-radius: 5px;
  margin-bottom: 10px;
  padding: 25px;
}

@media screen and (min-width: 1024px) {
  .contact-card {
    flex: 0 1 49.7%;
  }
}

.certifications {
  margin-top: 15px;
  display: flex;
  justify-content: flex-start;
}

.staffs {
  display: grid;
  grid-column-gap: 15px;
  grid-row-gap: 15px;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  grid-auto-rows: 1fr;
  margin-top: 15px;
  padding: 5px;
}
</style>
