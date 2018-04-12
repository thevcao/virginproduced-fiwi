import Vue from 'vue';

export default {

  getAll() {
    return Vue.http.get(`${WP_HOME}/wp-json/wp/v2/suits`);
  },
};
