export const addOfferings = ({ dispatch }) => {
  Vue.http.get(`${WP_HOME}/wp-json/wp-api-menus/v2/menus/5`)
    .then(response => {
      .then(result => {
        this.items = result.data
      })
    })
}
