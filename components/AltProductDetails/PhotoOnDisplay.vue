<template>
  <div class="backdrop">
    <div class="photo-frame">
      <div :style="styleBinding"
           class="photo-on-display"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PhotoOnDisplay',
  props: {
    photoOnDisplay: {
      type: String,
      default: null,
    },
  },
  computed: {
    styleBinding() {
      return this.photoOnDisplay
        ? {'background-image': `url(${this.photoOnDisplay})`}
        : {'background-image': `url(${require('~/assets/placeholder.svg')})`}
    },
  },
}
</script>

<style scoped>
.backdrop {
  border-top: 1px solid lightgray;
  border-left: 1px solid lightgray;
  border-right: 1px solid lightgray;
  margin: 5px 5px 0 5px;
  min-height: 60%;
  display: flex;
  justify-content: center;
  align-items: stretch;
}
.photo-frame {
  display: flex;
  justify-content: center;
  align-items: stretch;
  width: 100%;
  padding: 5px;
  background-color: white;
}
.photo-on-display {
  flex: 0 0 100%;
  background-color: white;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}
@media only screen and (max-width: 460px) {
  .backdrop {
    border-top: 1px solid lightgray;
    border-left: 1px solid lightgray;
    border-right: 1px solid lightgray;
    margin: 5px 5px 0 5px;
    min-height: 50%;
    display: flex;
    justify-content: center;
    align-items: stretch;
  }
  .photo-on-display {
    flex: 0 0 100%;
    background-color: white;
  }
}
</style>
