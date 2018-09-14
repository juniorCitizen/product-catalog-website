<template>
  <div class="alt-product-details"
       @click.self="setActiveProductIndex(null)">
    <span class="icon is-small has-text-danger">
      <fa :icon="['fas', 'times-circle']"
          @click="setActiveProductIndex(null)" />
    </span>
    <product-details-modal>
      <product-title slot="product-title"/>
      <photo-on-display slot="photo-on-display"
                        :photo-on-display="photoOnDisplay"/>
      <gallery slot="gallery"
               :photos="product.photos"
               :photo-on-display="photoOnDisplay"
               @clicked="photoOnDisplay=$event"/>
      <product-description slot="product-description"/>
      <features slot="features"/>
      <!-- <specifications slot="specifications"/> -->
    </product-details-modal>
  </div>
</template>

<script>
import vuexMappers from 'vuex'
import ProductDetailsModal from './ProductDetailsModal'
import ProductTitle from './ProductTitle'
import PhotoOnDisplay from './PhotoOnDisplay'
import Gallery from './Gallery'
import ProductDescription from './ProductDescription'
import Features from './Features'
// import Specifications from './Specifications'
export default {
  name: 'AltProductDetails',
  components: {
    ProductDetailsModal,
    ProductTitle,
    PhotoOnDisplay,
    Gallery,
    ProductDescription,
    Features,
    // Specifications,
  },
  data() {
    return {
      photoOnDisplay: null,
    }
  },
  computed: {
    ...vuexMappers.mapGetters('altCatalog', {
      product: 'activeProduct',
    }),
  },
  mounted() {
    let firstPhoto = this.product.photos[0]
    this.photoOnDisplay = firstPhoto ? firstPhoto.standardUrl : null
  },
  methods: {
    ...vuexMappers.mapMutations('altCatalog', {
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
.alt-product-details {
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
