<template>
  <div class="parallax-group-container">
    <div class="parallax-group group-1">
      <div class="parallax-layer base-layer">
        <div class="text-indicator">
          Base Layer - group 1
        </div>
      </div>
    </div>
    <div class="parallax-group group-2">
      <div class="parallax-layer base-layer">
        <div class="text-indicator">
          Base Layer - group 2
        </div>
      </div>
      <div class="parallax-layer background-layer">
        <div class="text-indicator">
          Background Layer - group 2
        </div>
      </div>
    </div>
    <div class="parallax-group group-3">
      <div class="parallax-layer foreground-layer">
        <div class="text-indicator">
          Foreground Layer - group 3
        </div>
      </div>
      <div class="parallax-layer base-layer">
        <div class="text-indicator">
          Base Layer - group 3
        </div>
      </div>
    </div>
    <div class="parallax-group group-4">
      <div class="parallax-layer foreground-layer">
        <div class="text-indicator">
          Foreground Layer - group 4
        </div>
      </div>
      <div class="parallax-layer base-layer">
        <div class="text-indicator">
          Base Layer - group 4
        </div>
      </div>
      <div class="parallax-layer background-layer">
        <div class="text-indicator">
          Background Layer - group 4
        </div>
      </div>
      <div class="parallax-layer deep-bg-layer">
        <div class="text-indicator">
          Deep Background Layer - group 4
        </div>
      </div>
    </div>
    <div class="parallax-group group-5">
      <div class="parallax-layer foreground-layer">
        <div class="text-indicator">
          Foreground Layer - group 5
        </div>
      </div>
      <div class="parallax-layer base-layer">
        <div class="text-indicator">
          Base Layer - group 5
        </div>
      </div>
    </div>
    <div class="parallax-group group-6">
      <div class="parallax-layer background-layer">
        <div class="text-indicator">
          Background Layer - group 6
        </div>
      </div>
      <div class="parallax-layer base-layer">
        <div class="text-indicator">
          Base Layer - group 6
        </div>
      </div>
    </div>
    <div class="parallax-group group-7">
      <div class="parallax-layer base-layer">
        <div class="text-indicator">
          Base Layer - group 7
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Parallax',
  layout: 'blank',
}
</script>

<style scoped>
.parallax-group-container {
  height: 100vh;
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-perspective: 300px;
  perspective: 300px;
}
.parallax-group-container::-webkit-scrollbar {
  width: 0;
}
.parallax-group {
  position: relative;
  height: 100vh;
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
}
.parallax-layer {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.text-indicator {
  padding: 1%;
  font-size: 2rem;
  font-weight: 900;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
}
.base-layer {
  -webkit-transform: translateZ(0);
  transform: translateZ(0);
  z-index: 4;
}
.background-layer {
  -webkit-transform: translateZ(-300px) scale(2);
  transform: translateZ(-300px) scale(2);
  z-index: 3;
}
.deep-bg-layer {
  -webkit-transform: translateZ(-600px) scale(3);
  transform: translateZ(-600px) scale(3);
  z-index: 2;
}
.foreground-layer {
  -webkit-transform: translateZ(90px) scale(0.7);
  transform: translateZ(90px) scale(0.7);
  z-index: 1;
}

/* style the groups */

.parallax-group.group-1 {
  z-index: 5; /* slide over group 2 */
}
.parallax-group.group-1 .base-layer {
  background-image: url(//img2.storyblok.com/1920x1080/f/44812/fbf00a931a/0.jpeg);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.parallax-group.group-3 {
  z-index: 4; /* slide over group 2 and 4 */
}
.parallax-group.group-3 .base-layer {
  background-image: url(//a.storyblok.com/f/44812/f6f9d907a5/2.jpeg);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.parallax-group.group-2 {
  z-index: 3; /* slide under groups 1 and 3 */
}
.parallax-group.group-2 .background-layer {
  background-image: url(//a.storyblok.com/f/44812/20932c20ae/1.jpeg);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.parallax-group.group-5 {
  z-index: 3; /* slide over group 4 and 6 */
}
.parallax-group.group-5 .base-layer {
  background-image: url(//a.storyblok.com/f/44812/50937d0c9d/4.jpeg);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.parallax-group.group-7 {
  z-index: 3; /* slide over group 7 */
}
.parallax-group.group-7 .base-layer {
  background-image: url(//a.storyblok.com/f/44812/f6f9d907a5/2.jpeg);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.parallax-group.group-4 {
  z-index: 2; /* slide under group 3 and 5 */
}
.parallax-group.group-4 .deep-bg-layer {
  background-image: url(//a.storyblok.com/f/44812/d8f2eace4b/3.jpeg);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.parallax-group.group-6 {
  z-index: 2; /* slide under group 5 and 7 */
}
.parallax-group.group-6 .background-layer {
  background-image: url(//a.storyblok.com/f/44812/d8f2eace4b/3.jpeg);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

/* .label-text {
  border: 1px solid black;
  width: max-content;
} */
/* .parallax-view-container {
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-perspective: 300px;
  perspective: 300px;
} */
/* .parallax-view-container::-webkit-scrollbar {
  width: 0;
} */
/* .parallax-group {
  position: relative;
  height: 100vh;
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
} */
/* .parallax-layer {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
} */
/* .parallax-foreground {
  -webkit-transform: translateZ(90px) scale(0.7);
  transform: translateZ(90px) scale(0.7);
  z-index: 1;
} */
/* .parallax-base {
  -webkit-transform: translateZ(0);
  transform: translateZ(0);
  z-index: 4;
} */
/* .parallax-background {
  -webkit-transform: translateZ(-300px) scale(2);
  transform: translateZ(-300px) scale(2);
  z-index: 3;
} */
/* .parallax-deep {
  -webkit-transform: translateZ(-600px) scale(3);
  transform: translateZ(-600px) scale(3);
  z-index: 2;
} */
/* .parallax-group.group-a {
  z-index: 1;
} */
/* .parallax-group.group-b {
  z-index: 2;
} */
/* .parallax-background.group-a {
  background-image: url(//a.storyblok.com/f/44812/fbf00a931a/0.jpeg);
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
} */
/* .parallax-base.group-a {
  height: 100%;
} */
/* .parallax-foreground.group-a {
  height: 100%;
} */
/* .parallax-background.group-b {
  border: 1px solid blue;
  background-image: url(//a.storyblok.com/f/44812/20932c20ae/1.jpeg);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
} */
/* .parallax-base.group-b {
  height: 100%;
} */
/* .parallax-foreground.group-b {
  height: 100%;
} */
</style>
