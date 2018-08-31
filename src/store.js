import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    videoStream: null,
    picture: null
  },
  mutations: {
    setVideoStream(state, payload) {
      state.videoStream = payload.stream;
    },
    setPicture(state, payload) {
      state.picture = payload.picture;
    },
    clearPicture(state) {
      state.picture = null;
    }
  },
  actions: {
    setVideoStream(context, stream) {
      context.commit({
        type: 'setVideoStream',
        stream
      });
    },
    setPicture(context, picture) {
      context.commit({
        type: 'setPicture',
        picture
      });
    },
    flashPicture(context, picture) {
      context.commit({
        type: 'setPicture',
        picture
      });
      setTimeout(() => {
        context.commit({ type: 'clearPicture' });
      }, 500);
    },
    clearPicture(context) {
      context.commit({ type: 'clearPicture' });
    }
  }
});

export default store;
