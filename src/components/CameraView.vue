<template>
  <div class="CameraView" @click="onClick">
    <video
      class="CameraView__video"
      playsinline
      autoplay
      muted
    />
    <canvas class="CameraView__subCanvas"></canvas>
    <canvas class="CameraView__mainCanvas" />
    <button class="CameraView__takeButton" href="#" @click="onShotSubmit">
      <i class="icon ion-md-camera" title="take photo" />
    </button>
    <div class="CameraView__Loading" v-if="isLoading">
      <Loader />
    </div>
  </div>
</template>

<script>
import FileSaver from 'file-saver';
import Loader from './Loader.vue';

export default {
  name: 'CameraView',
  props: ['stream'],
  components: {
    Loader
  },
  data() {
    return {
      isDead: false,
      isLoading: false,
      videoElement: null,
      subCanvasElement: null,
      subCanvasContext: null,
      mainCanvasElement: null,
      mainCanvasContext: null
    };
  },
  watch: {
    stream(newProp, oldProp) {
      this.isLoading = true;
      this.videoElement.srcObject = newProp;
      if (!oldProp) this.refreshCanvas();
    }
  },
  mounted() {
    this.videoElement = this.$el.querySelector('.CameraView__video');
    this.subCanvasElement = this.$el.querySelector('.CameraView__subCanvas');
    this.subCanvasContext = this.subCanvasElement.getContext('2d');
    this.mainCanvasElement = this.$el.querySelector('.CameraView__mainCanvas');
    this.mainCanvasContext = this.mainCanvasElement.getContext('2d');
  },
  beforeDestroy() {
    this.isDead = true;
  },
  methods: {
    refreshCanvas() {
      if (this.isDead) return;

      if (this.videoElement.videoWidth > 0) {
        this.isLoading = false;

        // 動画をコピー
        this.mainCanvasElement.width = this.videoElement.videoWidth;
        this.mainCanvasElement.height = this.videoElement.videoHeight;
        this.mainCanvasContext.drawImage(this.videoElement, 0, 0);

        // 画面をコピー
        this.subCanvasElement.width = this.mainCanvasElement.width / 3;
        this.subCanvasElement.height = this.mainCanvasElement.height / 3;
        this.subCanvasContext.drawImage(
          this.mainCanvasElement,
          0,
          0,
          this.mainCanvasElement.width,
          this.mainCanvasElement.height,
          0,
          0,
          this.subCanvasElement.width,
          this.subCanvasElement.height
        );

        // アス比維持で中央に移動
        const rect = this.$el.getBoundingClientRect();
        const r = Math.min(rect.width / this.mainCanvasElement.width, rect.height / this.mainCanvasElement.height);
        this.mainCanvasElement.style.width = `${this.mainCanvasElement.width * r}px`;
        this.mainCanvasElement.style.height = `${this.mainCanvasElement.height * r}px`;

        const r2 = Math.max(rect.width / this.subCanvasElement.width, rect.height / this.subCanvasElement.height) * 1.1;
        const w2 = this.subCanvasElement.width * r2;
        const h2 = this.subCanvasElement.height * r2;
        this.subCanvasElement.style.left = `${(rect.width - w2) / 2}px`;
        this.subCanvasElement.style.top = `${(rect.height - h2) / 2}px`;
        this.subCanvasElement.style.width = `${w2}px`;
        this.subCanvasElement.style.height = `${h2}px`;
      }

      requestAnimationFrame(() => this.refreshCanvas());
    },
    onClick() {
      this.videoElement.play();
    },
    onShotSubmit(e) {
      e.preventDefault();
      const picture = this.mainCanvasElement.toDataURL('image/jpeg', 0.9);

      if (/iP(hone|ad|od)/.test(navigator.userAgent)) {
        this.$store.dispatch('setPicture', picture);
      } else {
        this.$store.dispatch('flashPicture', picture);
        this.mainCanvasElement.toBlob((blob) => {
          FileSaver.saveAs(blob, `${Date.now()}.jpg`);
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.CameraView {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;

  &__Loading {
    display: flex;
    flex-direction: column;
    justify-content: center;

    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.9);
  }

  &__video {
    position: absolute;
    left: 0;
    top: 0;
    width: 1px;
    height: 1px;
    opacity: 0;
  }

  &__mainCanvas {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
  }

  &__subCanvas {
    position: absolute;
    filter: blur(15px);
  }

  &__takeButton {
    position: absolute;
    right: 20px;
    top: 50%;
    width: 64px;
    height: 64px;
    padding: 0;
    line-height: 64px;
    text-align: center;
    border: 0;
    border-radius: 50%;
    box-sizing: border-box;
    transform: translateY(-50%);
    text-decoration: none;
    background: #fff;
    color: #666;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    transition: background 0.1s ease-in;

    &:active {
      background: #ccc;
    }

    @media only screen and (orientation: portrait) {
      right: auto;
      top: auto;
      left: 50%;
      bottom: 20px;
      transform: translateX(-50%);
    }

    i {
      font-size: 30px;
    }
  }
}
</style>
