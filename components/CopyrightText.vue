<template>
  <span id="copyright-text"
        class="is-pulled-right">
    Copyright© {{ year }} Gentry Way Co., Ltd.
  </span>
</template>

<script>
export default {
  name: 'CopyrightText',
  data() {
    return {
      year: new Date().getFullYear(),
    }
  },
}
</script>

<style scoped>
#copyright-text {
  margin: 3px;
  font-weight: 100;
  font-size: xx-small;
  transform: scale(0.9);
  transform-origin: bottom right;
}
</style>
