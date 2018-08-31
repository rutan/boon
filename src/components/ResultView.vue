<template>
  <transition name="take-photo">
    <div class="ResultView" v-if="picture">
      <a
        class="ResultView__Photo"
        :style="{'background-image': 'url(' + picture + ')'}"
        :href="picture"
        download="picture.jpg"
        target="_blank"
        @click="onClickPhoto"
      >
      </a>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'ResultView',
  props: ['picture'],
  methods: {
    onClickPhoto() {
      this.$store.dispatch('clearPicture');
    }
  }
};
</script>

<style lang="scss" scoped>
.ResultView {
  position: relative;
  width: 100%;
  height: 100%;

  &:before {
    content: '';
    pointer-events: none;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
    background: #fff;
    opacity: 0;
    transition: all 0.15s ease-in;
  }

  &__Photo {
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: contain;
  }
}

.take-photo-enter {
  &:before {
    opacity: 1;
    transition: all 0 ease-in;
  }
}

.take-photo-leave-active {
  top: auto !important;
  left: 0 !important;
  bottom: 0 !important;
  animation: leave-photo 1.5s ease-in-out;
}

@keyframes take-photo {
  0% {
    background: #fff;
    opacity: 1;
  }
}

@keyframes leave-photo {
  0% {
    width: 100%;
    height: 100%;
  }
  50% {
    left: 10px;
    bottom: 10px;
    width: 15%;
    height: 15%;
    opacity: 1;
  }
  100% {
    left: 10px;
    bottom: 10px;
    width: 15%;
    height: 15%;
    opacity: 0;
  }
}
</style>
