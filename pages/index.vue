<template>
  <div id="home">
    Home
  </div>
</template>

<script>
export default {
  name: 'Home',
  layout: 'default',
  fetch({redirect}) {
    redirect(301, '/maintenance')
  },
}
</script>

<style scoped>
#home {
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
