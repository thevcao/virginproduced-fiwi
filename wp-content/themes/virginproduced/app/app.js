import Vue from 'vue';
import NProgress from 'nprogress';

import App from './layouts/App.vue';
import router from './router';
import store from './store';
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import fontawesome from '@fortawesome/fontawesome'
import brands from '@fortawesome/fontawesome-free-brands'
import faSpinner from '@fortawesome/fontawesome-free-solid/faSpinner'
import BootstrapVue from 'bootstrap-vue'
import VueVideoPlayer from 'vue-video-player'

fontawesome.library.add(brands, faSpinner)

const app = new Vue({
  router,
  store,
  render: h => h(App),
})
  // set hydrating to true to enable client-side handover of prerendered templates
  .$mount('#app', true);

Vue.http.interceptors.push((request, next) => {
  NProgress.start();
  next(() => {
    NProgress.done();
  });
});

Vue.use(VueVideoPlayer, /* {
  options: global default options,
  events: global videojs events
} */)
Vue.use(BootstrapVue);
