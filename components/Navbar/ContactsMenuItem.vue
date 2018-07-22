<template>
  <nuxt-link
    :class="{'is-active':$route.name.toLowerCase()==='contacts'}"
    class="navbar-item"
    to="/contacts"
    tag="a">
    <span>CONTACTS</span>
  </nuxt-link>
</template>

<script>
export default {
  name: 'ContactsMenuItem',
}
</script>

<style scoped>
a.is-active span {
  color: #3273dc;
}
</style>
