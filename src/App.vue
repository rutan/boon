<template>
  <div id="app">
    <TitleView v-if="!stream" />
    <CameraView :stream="stream" />
    <ResultView :picture="picture" />
  </div>
</template>

<script>
import TitleView from './components/TitleView.vue';
import CameraView from './components/CameraView.vue';
import ResultView from './components/ResultView.vue';

export default {
  name: 'app',
  components: {
    TitleView,
    CameraView,
    ResultView
  },
  computed: {
    stream() {
      return this.$store.state.videoStream;
    },
    picture() {
      return this.$store.state.picture;
    }
  }
};
</script>

<style lang="scss">
html,
body {
  width: 100%;
  height: 100%;
}

body {
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Hiragino Kaku Gothic Pro', Meiryo, sans-serif;
}

button {
  cursor: pointer;

  &:focus {
    outline: 0;
  }
}

#app {
  width: 100%;
  height: 100%;

  background: url(https://source.unsplash.com/category/nature) center center no-repeat;
  background-size: cover;

  .TitleView,
  .CameraView,
  .ResultView {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }

  .TitleView {
    z-index: 10;
  }

  .CameraView {
    z-index: 1;
  }

  .ResultView {
    z-index: 20;
  }
}
</style>
