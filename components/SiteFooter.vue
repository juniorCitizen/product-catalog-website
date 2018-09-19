<template>
  <v-footer app
            fixed
            inset
            flat
            class="grey lighten-3">
    <v-layout justify-end>
      <span class="copyright-text">
        Copyright&nbsp;&copy;&nbsp;{{ new Date().getFullYear() }}&nbsp;Gentry Way Co., Ltd.
      </span>
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
  margin-right: 5px;
  font-size: 75%;
  font-weight: 900;
  user-select: none;
}
</style>
