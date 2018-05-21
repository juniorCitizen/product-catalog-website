<template>
  <div class="icon-info">
    <div class="icon-wrapper">
      <span class="icon">
        <slot name="fa-icon"/>
      </span>
    </div>
    &nbsp;&nbsp;
    <div class="info-text">
      <slot name="text"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IconInfo',
}
</script>

<style scoped>
@import url(https://fonts.googleapis.com/css?family=Anton);
.icon-info {
  /* border: 1px solid black; */
  display: flex;
}
.icon-wrapper {
  /* border: 1px solid black; */
  max-width: min-content;
  display: flex;
  align-items: center;
}
/* .icon {
  border: 1px solid black;
} */
/* .info-text {
  border: 1px solid black;
} */
</style>
