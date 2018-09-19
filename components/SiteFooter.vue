<template>
  <v-footer app
            fixed
            inset
            flat
            class="grey lighten-3">
    <v-layout align-center>
      <v-flex v-if="$route.path.indexOf('/catalog')!==-1"
              class="grey lighten-3 black--text body-1 ml-2">
        breadcrumbs
      </v-flex>
      <v-flex class="grey lighten-3 black--text caption text-xs-right mr-2">
        <span class="copyright-text">
          Copyright&nbsp;&copy;&nbsp;{{ new Date().getFullYear() }}&nbsp;Gentry Way Co., Ltd.
        </span>
      </v-flex>
    </v-layout>
  </v-footer>
</template>

<script>
export default {
  name: 'SiteFooter',
}
</script>

<style scoped>
span.copyright-text {
  user-select: none;
}
</style>
