<template>
  <div class="contact-card">
    <icon-info>
      <template slot="fa-icon">
        <i class="fas fa-globe"/>
      </template>
      <template slot="text">
        <span class="country-text">
          {{ company.country }}
        </span>
      </template>
    </icon-info>
    <company-info :company="company"/>
    <staffs :staffs="company.staffs"/>
  </div>
</template>

<script>
import IconInfo from './IconInfo'
import CompanyInfo from './CompanyInfo'
import Staffs from './Staffs'

export default {
  name: 'ContactCard',
  components: {
    IconInfo,
    CompanyInfo,
    Staffs,
  },
  props: {
    company: {
      type: Object,
      default() {
        return {}
      },
    },
  },
}
</script>

<style scoped>
@import url(https://fonts.googleapis.com/css?family=Anton);

.contact-card {
  margin: 15px;
}

.country-text {
  font-size: 110%;
  font-weight: bold;
}
</style>
