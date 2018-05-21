<template>
  <div>
    <div>parallax layout</div>
    <nuxt/>
    <nuxt-link
      class="button"
      to="/"
      tag="button">
      <span>HOME PAGE</span>
    </nuxt-link>
    <nuxt-link
      class="button"
      to="/catalog"
      tag="button">
      <span>CATALOG PAGE</span>
    </nuxt-link>
    <nuxt-link
      class="button"
      to="/contact"
      tag="button">
      <span>CONTACT PAGE</span>
    </nuxt-link>
    <nuxt-link
      class="button"
      to="/test"
      tag="button">
      <span>TEST PAGE</span>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  name: 'ParallaxLayout',
}
</script>
