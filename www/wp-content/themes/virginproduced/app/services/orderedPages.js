import Vue from 'vue';

export default {
  computed: {
    orderedPages() {
      return orderBy(this.items.items, 'order')
    }
  }
}
