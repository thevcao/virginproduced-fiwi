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
import inViewportDirective from 'vue-in-viewport-directive'
import VueProgressBar from 'vue-progressbar'
import vueHeadful from 'vue-headful';
import objectfitvideos from 'object-fit-videos';

Vue.component('vue-headful', vueHeadful);
Vue.directive('in-viewport', inViewportDirective)

fontawesome.library.add(brands, faSpinner)
var VueCookie = require('vue-cookie');
// Tell Vue to use the plugin
Vue.use(VueCookie);
// Register a global custom directive called `v-focus`
Vue.directive('if-not-edge', {
  inserted: function (el, binding, vnode) {
    if (binding.value) {
      let isIE = false
      if (document.documentMode || /Edge/.test(navigator.userAgent)) {
        el.parentNode.removeChild(el)
      }
    }
  }
})
Vue.directive('is-edge', {
  inserted: function (el, binding, vnode) {
    if (binding.value) {
      let isIE = false
      if (!document.documentMode || !/Edge/.test(navigator.userAgent)) {
        el.parentNode.removeChild(el)

      }
    }
  }
})

const options = {
  color: '#e01931',
  failedColor: '#874b4b',
  thickness: '5px',
  transition: {
    speed: '0.5s',
    opacity: '1s',
    termination: 500
  },
  autoRevert: true,
  location: 'left',
  inverse: false
}
Vue.use(VueVideoPlayer, /* {
  options: global default options,
  events: global videojs events
} */)
Vue.use(BootstrapVue);
Vue.use(VueProgressBar, options)

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
