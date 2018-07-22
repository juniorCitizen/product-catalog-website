<template>
  <div :class="classBinding">
    <home-menu-item/>
    <catalog-menu-item/>
    <!-- <contact-menu-item/> -->
    <contacts-menu-item/>
  </div>
</template>

<script>
import vuexMappers from 'vuex'
import HomeMenuItem from './HomeMenuItem'
import CatalogMenuItem from './CatalogMenuItem'
// import ContactMenuItem from './ContactMenuItem'
import ContactsMenuItem from './ContactsMenuItem'

export default {
  name: 'NavbarStart',
  components: {
    HomeMenuItem,
    CatalogMenuItem,
    // ContactMenuItem,
    ContactsMenuItem,
  },
  computed: {
    ...vuexMappers.mapGetters('mobileDetect', {
      isMobile: 'isMobile',
      isUnderBulmaNavLimit: 'isUnderBulmaNavLimit',
    }),
    mobileMenuEnabled() {
      return this.isMobile || this.isUnderBulmaNavLimit
    },
    classBinding() {
      return {
        'navbar-start': this.mobileMenuEnabled,
        'navbar-end': !this.mobileMenuEnabled,
      }
    },
  },
}
</script>

<style scoped>
a {
  font-size: 90%;
  font-weight: 900;
}
a.is-active {
  pointer-events: none;
}
.dropdown-catalog-frame {
  border-radius: 5px;
  margin-left: 10px;
  margin-right: 0px;
  padding: 5px;
}
</style>
