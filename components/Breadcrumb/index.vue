<template>
  <!-- <nav class="breadcrumb is-centered">
    <ul>
      <crumb-segment v-for="(crumbSegment,index) in breadcrumb"
                     :key="index"
                     :is-final-crumb="index===breadcrumb.length-1"
                     :category="crumbSegment">
        {{ crumbSegment.name.toUpperCase() }}
      </crumb-segment>
    </ul>
  </nav> -->
  <div :class="classBinding"
       class="breadcrumb-container">
    <nav class="breadcrumb is-small is-centered">
      <ul>
        <crumb-segment v-for="(crumbSegment,index) in breadcrumb"
                       :key="index"
                       :is-final-crumb="index===(breadcrumb.length-1)"
                       :category="crumbSegment">
          <span v-if="index===0"
                class="icon is-small">
            <i class="fas fa-home"/>
          </span>
          <span class="crumb-name">
            {{ crumbSegment.name.toUpperCase() }}
          </span>
        </crumb-segment>
      </ul>
    </nav>
  </div>
</template>

<script>
import vuexMappers from 'vuex'
import CrumbSegment from './CrumbSegment'
export default {
  name: 'Breadcrumb',
  components: {CrumbSegment},
  computed: {
    ...vuexMappers.mapGetters('mobileDetect', {
      isMobile: 'isMobile',
      mq: 'mq',
    }),
    ...vuexMappers.mapGetters('catalog', {
      breadcrumb: 'breadcrumb',
    }),
    classBinding() {
      return {
        'mobile-view': this.isMobile || this.mq === 'mobile',
      }
    },
  },
}
</script>

<style scoped>
div.breadcrumb-container {
  box-sizing: border-box;
  grid-area: breadcrumb;
  align-self: start;
  justify-self: center;
  width: max-content;
  height: max-content;
}
div.breadcrumb-container.mobile-view {
  width: auto;
  padding-left: 15px;
  padding-right: 15px;
}
nav.breadcrumb {
  box-sizing: border-box;
  margin: 0;
}
span.crumb-name {
  white-space: nowrap;
}
</style>
