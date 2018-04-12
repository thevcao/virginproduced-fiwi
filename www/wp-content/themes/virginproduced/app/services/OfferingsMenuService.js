import Vue from 'vue';

export default {
  get(slug) {
    return Vue.http.get(`${WP_HOME}/wp-json/wp-api-menus/v2/menus/5`);
  },

  getAll() {
    return Vue.http.get(`${WP_HOME}/wp-json/wp-api-menus/v2/menus/5`);
  },
};
