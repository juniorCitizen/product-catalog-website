<template>
  <div class="product-details-container"
       @click.self="setActiveProductIndex(null)">
    <span class="icon is-small has-text-danger">
      <i class="fas fa-times-circle"
         @click="setActiveProductIndex(null)"/>
    </span>
    <product-details-modal>
      <product-title slot="product-title"/>
      <photo-on-display slot="photo-on-display"
                        :photo-on-display="photoOnDisplay"/>
      <product-description slot="product-description"/>
      <gallery slot="gallery"
               :primary-photo="product.primaryPhoto"
               :secondary-photos="product.secondaryPhotos"
               :photo-on-display="photoOnDisplay"
               @clicked="photoOnDisplay=$event"/>
      <features slot="features"/>
      <specifications slot="specifications"/>
    </product-details-modal>
  </div>
</template>

<script>
import vuexMappers from 'vuex'
import ProductDetailsModal from './ProductDetailsModal'
import ProductTitle from './ProductTitle'
import PhotoOnDisplay from './PhotoOnDisplay'
import ProductDescription from './ProductDescription'
import Gallery from './Gallery'
import Features from './Features'
import Specifications from './Specifications'
export default {
  name: 'ProductDetails',
  components: {
    ProductDetailsModal,
    ProductTitle,
    PhotoOnDisplay,
    ProductDescription,
    Gallery,
    Features,
    Specifications,
  },
  data() {
    return {
      photoOnDisplay: null,
    }
  },
  computed: {
    ...vuexMappers.mapGetters('catalog', {
      product: 'activeProduct',
    }),
  },
  mounted() {
    this.photoOnDisplay = this.product.primaryPhoto
  },
  methods: {
    ...vuexMappers.mapMutations('catalog', {
      setActiveProductIndex: 'setActiveProductIndex',
    }),
    switchPhoto(photo) {
      this.photoOnDisplay = photo
    },
  },
}
</script>

<style scoped>
span.icon {
  position: absolute;
  top: 5px;
  right: 5px;
  z-index: 1001;
}
.product-details-container {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
