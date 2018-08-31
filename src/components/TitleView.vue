<template>
  <div class="TitleView">
    <h1>Boon</h1>
    <h2>Web技術だけでカメラアプリをつくる話</h2>
    <p>
      このアプリはブラウザの機能でカメラアプリっぽいものを作ってみるデモです。<br>
      カメラの権限を要求するため、最新のChrome/Safariをご利用ください。
    </p>
    <button @click="onClickStart">はじめる</button>
  </div>
</template>

<script>
export default {
  name: 'TitleView',
  props: {},
  data() {
    return {};
  },
  methods: {
    onClickStart(e) {
      e.preventDefault();
      navigator.mediaDevices
        .getUserMedia({
          audio: false,
          video: {
            facingMode: {
              ideal: 'environment'
            }
          }
        })
        .then((stream) => {
          this.$store.dispatch('setVideoStream', stream);
        })
        .catch((e) => {
          console.error('error', e);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.TitleView {
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: rgba(32, 32, 32, 0.8);
  color: #fff;
  text-align: center;

  box-sizing: border-box;
  padding: 15px;

  h1 {
    margin: 0;
    font-size: 30px;
  }

  h2 {
    margin: 0;
    font-size: 18px;
  }

  p {
    margin: 2em 0;
    font-size: 16px;
    line-height: 1.6;
  }

  button {
    display: block;
    margin: 0 auto;
    width: 200px;
    height: 50px;
    border: 2px solid #fff;
    background: transparent;
    color: #fff;
    font-size: 16px;
    font-weight: bold;

    &:active {
      opacity: 0.7;
    }
  }
}
</style>
