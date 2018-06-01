<template>
  <div id="construction-view">
    <div class="video-container">
      <video src="https://a.storyblok.com/f/44812/x/412077967f/jewlry_making__sanding_a_ring.mp4"
             autoplay="true"
             loop="true"
             type="video/mp4"
             muted/>
    </div>
    <div class="video-overlay"/>
    <div class="content-overlay">
      <img :src="require('../assets/logo.png')">
      <div class="caption">
        WEBSITE UNDER CONSTRUCTION
      </div>
      <p>Gentry Way's website is being renovated, and will be back online soon!</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ConstructionView',
  layout: 'default',
}
</script>

<style scoped>
#construction-view {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.video-container {
  background-color: yellow;
  width: 100%;
  min-width: max-content;
  height: 100%;
  overflow: hidden;
  position: relative;
}
video {
  pointer-events: none;
}
.video-overlay {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.6);
}
.content-overlay {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.caption {
  color: white;
}
p {
  color: white;
}
@media only screen and (min-width: 641px) {
  img {
    transform: scale(2);
    transform-origin: bottom center;
  }
  .caption {
    font-size: 32px;
  }
  p {
    font-size: 8px;
    letter-spacing: 0.13em;
    margin-top: 1em;
    line-height: 1.5em;
  }
}
@media only screen and (max-width: 640px) {
  img {
    width: 90%;
  }
  .caption {
    font-size: 5vw;
  }
  p {
    font-size: 3vw;
    letter-spacing: 0.13em;
    margin-top: 1em;
    max-width: 85vw;
    line-height: 1.5em;
  }
}
</style>
