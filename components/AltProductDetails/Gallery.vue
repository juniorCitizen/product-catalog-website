<template>
  <div class="gallery-container">
    <p v-if="photos.length===0"
       class="placeholder-text">
      product images unavailable
    </p>
    <div v-else
         class="gallery">
      <div v-for="(photo,index) in photos"
           :key="index"
           :class="classBinding(index)"
           class="gallery-photo-frame"
           @click="$emit('clicked', photos[index].standardUrl)">
        <div :style="styleBinding(photo.thumbnailUrl)"
             class="gallery-photo"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Gallery',
  props: {
    photos: {
      type: Array,
      default() {
        return []
      },
    },
    photoOnDisplay: {
      type: String,
      default() {
        return null
      },
    },
  },
  computed: {
    onDisplayIndex() {
      return this.photos.findIndex(photo => {
        return photo.standardUrl === this.photoOnDisplay
      })
    },
  },
  methods: {
    classBinding(index) {
      return {'on-display': index === this.onDisplayIndex}
    },
    styleBinding(thumbnailUrl) {
      return {'background-image': `url(${thumbnailUrl})`}
    },
  },
}
</script>

<style scoped>
/* @media only screen and (min-width: 460px) {
  .gallery-container {
    height: 108px;
  }
} */
/* .gallery-container {
  background-color: white;
  margin: 0 5px;
  overflow-x: auto;
  overflow-y: auto;
  border-left: 1px solid lightgray;
  border-right: 1px solid lightgray;
  border-bottom: 1px solid lightgray;
} */
/* .gallery {
  padding: 2px;
  margin-left: auto;
  margin-right: auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  grid-auto-rows: 100px;
  grid-gap: 4px;
} */
/* .gallery-photo-frame {
  border: 1px solid lightgray;
  padding: 5px;
} */
/* .gallery-photo-frame.on-display {
  border: 1px solid blue;
} */
.gallery-photo {
  height: 100%;
  width: 100%;
  background-color: whitesmoke;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}
.placeholder-text {
  font-size: 75%;
  margin-left: auto;
  margin-right: auto;
  width: max-content;
}

/* @media only screen and (max-width: 460px) { */
.gallery-container {
  background-color: white;
  margin: 0 5px;
  overflow-x: auto;
  overflow-y: hidden;
  border-left: 1px solid lightgray;
  border-right: 1px solid lightgray;
  border-bottom: 1px solid lightgray;
}
.gallery {
  background-color: white;
  margin: 0;
  max-height: min-content;
  display: flex;
}
.gallery-photo-frame {
  background-color: white;
  border: 1px solid lightgray;
  padding: 5px;
  margin: 0 2px;
  height: 70px;
  flex: 0 0 70px;
}
.gallery-photo-frame.on-display {
  border: 1px solid blue;
}
.gallery-photo {
  background-color: white;
}
/* } */
</style>
