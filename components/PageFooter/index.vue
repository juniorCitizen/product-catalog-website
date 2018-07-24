<template>
  <div id="page-footer">
    <copyright-text/>
  </div>
</template>

<script>
import CopyrightText from './CopyrightText'
export default {
  name: 'PageFooter',
  components: {CopyrightText},
}
</script>

<style scoped>
div {
  box-sizing: border-box;
  width: 100%;
  margin: 0;
  padding: 0;
  background-color: whitesmoke;
  position: -webkit-sticky;
  position: sticky;
  bottom: 0;
}
</style>
