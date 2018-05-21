<template>
  <div id="copyright-text">
    <span>Copyright© {{ new Date().getFullYear() }} Gentry Way Co., Ltd.</span>
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
  background-color: white;
}

span {
  display: inline-block;
  font-size: xx-small;
  transform: scale(0.8);
}

@media only screen and (min-width: 481px) {
  div {
    text-align: end;
    margin-right: 3px;
  }
  span {
    font-weight: 100;
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
