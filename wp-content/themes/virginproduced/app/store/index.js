import Vue from 'vue';
import Vuex from 'vuex';
// import * as actions from "./actions";
// import * as getters from "./getters";
import posts from './modules/posts';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'video.js/dist/video-js.css'
import PageService from '../services/PageService'
Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  mutations: {
    'SET_PAGE': (state, { slug, page }) => {
//      debugger;
      state.pages[slug] = page
    }
  },
   actions: {
     'FETCH_PAGE': ({ commit, state }, slug) => {
       return PageService
          .get(slug)
          .then(result => {
              return commit('SET_PAGE', { slug, page: result.data[0] })
           })
     }
   },
  // getters,
  modules: {
    posts,
    pages: {
      slug: {},
    },
  },
  strict: debug,
});
