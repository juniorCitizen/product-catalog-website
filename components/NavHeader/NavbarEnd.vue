<template>
  <div id="navbar-end"
       class="navbar-end">
    <div class="navbar-item">
      <ul class="tabs is-right">
        <nuxt-link
          :class="{'is-active':$route.name==='index'}"
          to="/"
          tag="li"
          @click.native="null/*activateInProgressOverlay*/">
          <a>HOME</a>
        </nuxt-link>
        <nuxt-link
          :class="{'is-active':$route.name==='catalog'}"
          to="/catalog"
          tag="li"
          @click.native="null/*activateInProgressOverlay*/">
          <a>CATALOG</a>
        </nuxt-link>
        <nuxt-link
          :class="{'is-active':$route.name==='contact'}"
          to="/contact"
          tag="li"
          @click.native="null/*activateInProgressOverlay*/">
          <a>CONTACT</a>
        </nuxt-link>
      </ul>
    </div>
  </div>
</template>

<script>
// import vuexMappers from 'vuex'

export default {
  name: 'NavbarEnd',
  // methods: {
  //   ...vuexMappers.mapMutations('inProgress', {
  //     activateInProgressOverlay: 'activateInProgressOverlay',
  //   }),
  // },
}
</script>

<style scoped>
@media only screen and (max-width: 1087px) {
  #navbar-end {
    display: none;
  }
}

ul.tabs {
  padding-bottom: 1px;
}

li {
  margin-left: 25px;
  border-bottom-width: 5px;
}

li.is-active {
  pointer-events: none;
}
</style>
