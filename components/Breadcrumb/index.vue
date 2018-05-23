<template>
  <div :class="classBinding"
       class="breadcrumb-container">
    <nav class="breadcrumb is-small">
      <ul>
        <li>
          <a>
            <span class="icon is-small">
              <i class="fas fa-home"/>
            </span>
            <span>Bulma</span>
          </a>
        </li>
        <li>
          <a>
            Documentation
          </a>
        </li>
        <li>
          <a>
            Components
          </a>
        </li>
        <li class="is-active">
          <a>
            Breadcrumb
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import vuexMappers from 'vuex'
export default {
  name: 'Breadcrumb',
  computed: {
    ...vuexMappers.mapGetters('mobileDetect', {
      isMobile: 'isMobile',
      mq: 'mq',
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
</style>
