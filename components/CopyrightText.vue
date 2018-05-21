<template>
  <div id="copyright-text">
    <span>Copyright© {{ year }} Gentry Way Co., Ltd.</span>
  </div>
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
div {
  flex-grow: 1;
  font-weight: 100;
  font-size: xx-small;
}

span {
  display: inline-block;
  transform: scale(0.8);
}

@media only screen and (min-width: 481px) {
  div {
    text-align: end;
    margin-right: 3px;
  }
  span {
    transform-origin: bottom right;
  }
}

@media only screen and (max-width: 480px) {
  div {
    text-align: center;
  }
  span {
    transform-origin: bottom center;
  }
}
</style>
