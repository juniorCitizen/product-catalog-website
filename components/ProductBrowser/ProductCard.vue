<template>
  <div class="product-card">
    <div class="photo-container-frame">
      <div class="photo-container"/>
    </div>
    <div class="product-information">
      <div class="product-code">
        test code
      </div>
      <div class="product-name">
        test name
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: {
    product: {
      type: Object,
      default() {
        return {}
      },
    },
  },
}
</script>


<style scoped>
.product-card {
  border: 1px solid darkgray;
  border-radius: 5px;
  padding: 5px;
  background-color: lightgray;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.product-card:hover {
  border: 1px solid white;
}

.photo-container-frame {
  border: 1px solid lightgray;
  border-radius: 5px;
  background-color: white;
  margin: 1px 1px 10px 1px;
  padding: 5px;
}

.photo-container {
  min-height: 200px;
  background-color: white;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  margin: 0;
}

.product-information {
  margin: 5px;
  text-align: left;
  font-weight: 600;
  color: rgba(54, 54, 54, 0.7);
  cursor: default;
}

.product-code {
  font-weight: 700;
  font-size: 70%;
}

.product-name {
  font-size: 70%;
}
</style>
