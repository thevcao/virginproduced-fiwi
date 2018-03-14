import Vue from 'vue';

export default {
  get(slug) {
    return Vue.http.get(`${WP_HOME}/wp-json/wp/v2/pages?slug=about-us`);
  },

  getAll() {
    return Vue.http.get(`${WP_HOME}/wp-json/wp/v2/pages`);
  },
};
