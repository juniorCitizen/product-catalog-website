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
    <div class="content-container">
      <div class="message-contents">
        <img :src="require('../assets/logo.png')">
        <div class="image-caption">
          THIS WEBSITE IS UNDER CONSTRUCTION
        </div>
        <br>
        <p>
          <label style="color:yellow;">TO EVERYONE WHO HAD VISITED OUR BOOTH AT THE CHENNAI MEDICALL EXHIBITION LAST WEEKEND</label>
          - it was wonderful to have met everyone.  We will be in touch very soon.  Do feel free to
          <a href="mailto:david.tsai@gentry-way.com.tw">drop us an email now</a>
          if there are any comments or questions.
        </p>
        <br>
        <p style="font-size:80%;">
          Our website is being updated, and scheduled for relaunch at August 2018.  Looking forward to see you then!
          <br>
          <br>
          You can preview the website's
          <a href="/products">current progress</a>
          , or contact us directly with Gentry staff's contact information listed
          <a href="/contacts">here</a>.
        </p>
        <br>
        <br>
        <p>
          <span class="icon has-text-white">
            <i class="far fa-smile fa-6x"/>
          </span>
        </p>
      </div>
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
#maintenance {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}
.video-container {
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
  background-color: rgba(0, 0, 0, 0.85);
}
.content-container {
  width: 100%;
  height: 100%;
  position: fixed;
  display: flex;
  overflow: auto;
}
.content-container::-webkit-scrollbar {
  width: 0;
}
.message-contents {
  margin: auto;
  max-width: 500px;
  padding: 50px 10px 50px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.image-caption {
  color: white;
  text-align: center;
}
a {
  color: yellow;
}
a:hover {
  color: red;
  font-weight: bolder;
}
p {
  color: white;
}

/* @media only screen and (min-width: 641px) {
  img {
    transform: scale(2);
    transform-origin: bottom center;
  }
  .caption {
    font-size: 32px;
  }
  p {
    font-size: 0.95em;
    letter-spacing: 0.15em;
    margin-top: 1em;
    max-width: 650px;
    line-height: 1.5em;
  }
} */

/* @media only screen and (max-width: 640px) {
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
} */
</style>
