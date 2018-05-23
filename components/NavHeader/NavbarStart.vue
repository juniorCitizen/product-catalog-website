<template>
  <div class="navbar-start">
    <nuxt-link
      :class="{'is-active':$route.name==='index'}"
      class="navbar-item"
      to="/"
      tag="a">
      <span>HOME</span>
    </nuxt-link>
    <nuxt-link v-if="$route.name!=='catalog'"
               class="navbar-item"
               to="/catalog"
               tag="a">
      <span>CATALOG</span>
    </nuxt-link>
    <div v-else
         class="navbar-item has-dropdown is-active">
      <a class="navbar-link">
        CATALOG
      </a>
      <div class="navbar-dropdown">
        <div class="navbar-item dropdown-catalog-frame">
          category menu placeholder
          <!-- <category-menu/> -->
        </div>
      </div>
    </div>
    <nuxt-link
      :class="{'is-active':$route.name==='contact'}"
      class="navbar-item"
      to="/contact"
      tag="a">
      <span>CONTACT</span>
    </nuxt-link>
  </div>
</template>

<script>
// import CategoryMenu from '~/components/catalog/CategoryMenu'

export default {
  name: 'NavbarStart',
  components: {
    // CategoryMenu,
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
