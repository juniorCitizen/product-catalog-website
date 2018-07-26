<template>
  <div id="maintenance">
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
      <p style="font-size: 110%;">Our website is being updated, and scheduled for relaunch at August 2018.  Looking forward to see you then!</p>
      <br>
      <p style="font-size: 110%;">You may check it's <a href="/products">current progress</a> or feel free to <a href="/contacts">contact us now</a>.</p>
      <br>
      <br>
      <p>
        <span class="icon has-text-white">
          <i class="far fa-smile fa-6x"/>
        </span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Maintenance',
  layout: 'default',
}
</script>

<style scoped>
a:hover {
  color: red;
  font-weight: bolder;
}
#maintenance {
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
.video-overlay {
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
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
    max-width: 450px;
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
