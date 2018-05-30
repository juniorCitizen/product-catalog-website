<template>
  <div :class="classBinding">
    <home-menu-item/>
    <!-- <catalog-end-menu-item v-if="!mobileMenuEnabled||$route.name!=='catalog'"/> -->
    <!-- <catalog-start-menu-item v-else/> -->
    <catalog-menu-item/>
    <contact-menu-item/>
  </div>
</template>

<script>
import vuexMappers from 'vuex'
import HomeMenuItem from './HomeMenuItem'
// import CatalogStartMenuItem from './CatalogNavbarStartMenuItem'
// import CatalogEndMenuItem from './CatalogNavbarEndMenuItem'
import CatalogMenuItem from './CatalogMenuItem'
import ContactMenuItem from './ContactMenuItem'

export default {
  name: 'NavbarStart',
  components: {
    HomeMenuItem,
    // CatalogStartMenuItem,
    // CatalogEndMenuItem,
    CatalogMenuItem,
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
  mounted() {
    console.log('mobileMenuEnabled: ', this.mobileMenuEnabled)
    console.log('route name: ', this.$route.name)
    console.log(this.$route.name === 'catalog')
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
