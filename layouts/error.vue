<template>
  <div id="error">
    <div>
      <h1 v-if="error.statusCode === 404">
        404 PAGE NOT FOUND
      </h1>
      <h1 v-else>An error occurred</h1>
      <nuxt-link to="/">BACK TO HOME PAGE</nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Error',
  props: {
    error: {
      type: Object,
      default() {
        return {}
      },
    },
  },
}
</script>

<style scoped>
#error {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
