<template>
  <div :class="classBinding">
    <home-menu-item/>
    <catalog-start-menu-item/>
    <!-- <catalog-start-menu-item v-if="$route.name==='catalog'&&mobileMenuEnabled"/> -->
    <!-- <catalog-end-menu-item v-else/> -->
    <contact-menu-item/>
  </div>
</template>

<script>
import vuexMappers from 'vuex'
import HomeMenuItem from './HomeMenuItem'
import CatalogStartMenuItem from './CatalogNavbarStartMenuItem'
import CatalogEndMenuItem from './CatalogNavbarEndMenuItem'
import ContactMenuItem from './ContactMenuItem'

export default {
  name: 'NavbarStart',
  components: {
    HomeMenuItem,
    CatalogStartMenuItem,
    CatalogEndMenuItem,
    ContactMenuItem,
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
