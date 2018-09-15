<template>
  <div class="company">
    <div class="flag-container">
      <img :src="country.flagUrl"
           :alt="country.name"
           class="flag">
    </div>
    <div>
      <fa :icon="['fas', 'building']" />
      <span class="company-name-text">
        {{ name }}
      </span>
    </div>
    <div class="company-address-container">
      <fa :icon="['fas', 'location-arrow']" />
      <span class="company-address-text">
        {{ address }}
      </span>
    </div>
    <div>
      <fa :icon="['fas', 'phone']" />
      <span class="company-telephone-text">
        {{ telephone }}
      </span>
    </div>
    <div>
      <fa :icon="['fas', 'fax']" />
      <span class="company-fax-text">
        {{ fax }}
      </span>
    </div>
  </div>
</template>

<script>
const placeholder = require('~/assets/placeholder.svg')
export default {
  name: 'Company',
  props: {
    name: {
      type: String,
      default: 'company',
    },
    country: {
      type: Object,
      default() {
        return {
          name: 'country',
          flagUrl: placeholder,
        }
      },
    },
    address: {
      type: String,
      default: 'addresss',
    },
    telephone: {
      type: String,
      default: 'telephone',
    },
    fax: {
      type: String,
      default: 'fax',
    },
  },
}
</script>

<style scoped>
svg {
  color: rgba(0, 0, 0, 0.5);
}

.flag-container {
  margin-bottom: 15px;
}

.company {
  margin-top: 10px;
  margin-left: 10px;
}

img.flag {
  width: 100px;
}

.company-name-text,
.company-telephone-text,
.company-fax-text {
  font-weight: 900;
  line-height: 2em;
  padding-left: 0.4em;
}

.company-address-container {
  display: flex;
  align-items: center;
  margin-top: 0.3em;
  margin-bottom: 0.3em;
}

.company-address-text {
  font-weight: 900;
  padding-left: 0.6em;
}
</style>
