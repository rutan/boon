import Vue from 'vue';

// eslint-disable-next-line
import _ionIcons from 'ionicons/dist/css/ionicons.css';

import store from './store';
import App from './App.vue';

Vue.config.productionTip = false;

if (process.env.NODE_ENV === 'production') {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('service-worker.js')
        .then((registration) => {
          console.log('register service worker', registration);
        })
        .catch((e) => {
          console.error(e);
        });
    });
  }
}

(() => {
  return new Vue({
    store,
    render: (h) => h(App)
  }).$mount('#app');
})();
