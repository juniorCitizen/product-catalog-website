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
.icon-info {
  display: flex;
}
.icon-wrapper {
  max-width: min-content;
  display: flex;
  align-items: center;
}
</style>
