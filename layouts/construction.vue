<template>
  <div class="landing-page-container">
    <nuxt/>
    <div class="page-overlay"/>
    <div class="caption-content">
      <div class="content-wrapper">
        <img :src="require('../assets/logo.png')">
        <h1 class="title is-5 has-text-white">
          UNDER CONSTRUCTION
        </h1>
        <p>
          Gentry Way's website is being renovated, and will be back online soon!
        </p>
        <nuxt-link class="button is-white is-outlined"
                   to="/home"
                   tag="a">
          <span>HOME</span>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BlankLayout',
}
</script>

<style scoped>
.landing-page-container {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}
.page-overlay {
  height: 100vh;
  width: 100vw;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #000000;
  z-index: 0;
  opacity: 0.65;
}
.caption-content {
  height: 100vh;
  width: 100vw;
  position: absolute;
  top: 0;
  left: 0;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}
p {
  margin-left: 5rem;
  margin-right: 5rem;
  line-height: 1.5rem;
}
@media only screen and(max-width:640px) {
  p {
    margin-left: 5px;
    margin-right: 5px;
  }
}
.content-wrapper {
  text-align: center;
}
img {
  margin-left: auto;
  margin-right: auto;
}
a.button {
  margin-top: 5%;
  margin-left: auto;
  margin-right: auto;
}
</style>
