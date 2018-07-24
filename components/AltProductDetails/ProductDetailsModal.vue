<template>
  <div class="product-details-modal">
    <slot name="product-title"/>
    <slot name="photo-on-display"/>
    <slot name="gallery"/>
    <slot name="product-description"/>
    <slot name="features"/>
    <slot name="specifications"/>
  </div>
</template>

<script>
export default {
  name: 'ProductDetailsModal',
}
</script>

<style scoped>
.product-details-modal {
  height: 90%;
  width: 60%;
  background-color: whitesmoke;
  z-index: 1001;
  border-radius: 5px;
  overflow-x: hidden;
  overflow-y: scroll;
  /* margin: 10px; */
  /* max-height: 85%; */
  /* display: flex; */
}
.product-details-modal::-webkit-scrollbar {
  width: 0;
}
@media only screen and (max-width: 640px) {
  .product-details-modal {
    width: 90%;
    background-color: white;
  }
}
</style>
