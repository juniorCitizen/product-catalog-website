<template>
  <div class="gallery-container">
    <div class="gallery">
      <p v-if="photos.length===0"
         class="placeholder-text">
        PRODUCT IMAGES UNAVAILABLE
      </p>
      <template v-else>
        <div v-for="(processedUrl,index) in processedUrls"
             :key="index"
             :class="classBinding(index)"
             class="gallery-photo-frame"
             @click="$emit('clicked', photos[index])">
          <div :style="styleBinding(processedUrl)"
               class="gallery-photo"/>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Gallery',
  props: {
    primaryPhoto: {
      type: String,
      default() {
        return null
      },
    },
    secondaryPhotos: {
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
        return photo === this.photoOnDisplay
      })
    },
    photos() {
      if (!this.primaryPhoto) return []
      let photos = this.secondaryPhotos.map(url => url)
      photos.unshift(this.primaryPhoto)
      return photos
    },
    processedUrls() {
      return this.photos.map(photo => {
        return photo.replace(
          '//a.storyblok.com',
          '//img2.storyblok.com/fit-in/100x100/filters:quality\\(50\\):format\\(jpg\\):fill\\(whitesmoke\\)'
        )
      })
    },
  },
  methods: {
    classBinding(index) {
      return {'on-display': index === this.onDisplayIndex}
    },
    styleBinding(processedUrl) {
      return {'background-image': `url(${processedUrl})`}
    },
  },
}
</script>

<style scoped>
.gallery {
  padding: 2px;
  margin-left: auto;
  margin-right: auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  grid-auto-rows: 100px;
  grid-gap: 4px;
}
.gallery-photo-frame {
  border: 1px solid lightgray;
  padding: 5px;
}
.gallery-photo-frame.on-display {
  border: 1px solid blue;
}
.gallery-photo {
  height: 100%;
  width: 100%;
  background-color: whitesmoke;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}
.placeholder-text {
  width: max-content;
  font-weight: 900;
}
@media only screen and (max-width: 460px) {
  .gallery-container {
    max-height: 150px;
    margin: 0 5px;
    overflow-x: scroll;
    overflow-y: hidden;
  }
  .gallery-container::-webkit-scrollbar {
    width: 0;
  }
  .gallery {
    margin-left: 0 5px 5px 5px;
    max-height: 130px;
    display: flex;
  }
  .gallery-photo-frame {
    border: 1px solid lightgray;
    padding: 5px;
    margin: 0 2px;
    height: 100px;
    flex: 1 0 100px;
  }
  .gallery-photo-frame.on-display {
    border: 1px solid blue;
  }
}
</style>
