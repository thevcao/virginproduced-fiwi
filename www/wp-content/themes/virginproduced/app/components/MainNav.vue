<template>
  <ul class="list pa2 tc main-menu" :mobile="mobile">
    <li v-for="page in pages" v-bind:key="page.url" class="pa2 f3 f1-ns" v-if="page.target">
      <a :href="page.url" class="white ttu poplink"
         v-on:click="popLink()"
         @click.default
         target="_blank"
         :title="page.title">{{ page.title }}</a>
    </li>
    <li v-bind:key="page.url" class="pa2 f3 f1-ns"  v-else>
      <router-link :to="page.url" @click.native="toggleNavigation" :title="page.title" class="white ttu">{{ page.title }}</router-link>
    </li>
  </ul>
</template>
<script>
import { orderBy } from 'lodash'
import MenuService from '../services/MenuService'
import GlobalService from '../services/GlobalService'
import Search from './Search.vue'
export default {
  components: { Search },
  data() {
    return {
      items: [],
      infoData: [],
//      navigation: false,
      target: null
    }
  },
  props: {
    pages: {},
    mobile: {}
  },
  created() {
//    this.fetchItems()
//    this.fetchInfoData()
  },
  computed: {
    orderedPages() {
      return orderBy(this.items.items, 'order')
    }
  },
  methods: {
    fetchItems() {
      return MenuService.getAll()
        .then(result => {
          this.items = result.data
        })
    },
//    fetchInfoData() {
//      return GlobalService.get()
//        .then(result => {
//          this.infoData = result.data
//        })
//    },
    toggleNavigation() {
      console.log('emitting togglenav')
      this.$emit('togglenav')
//      this.navigation = !this.navigation;
//      setTimeout(function(){
//        toggle.classList.toggle('active');
//      }, 300);
    },
    popLink(){

      var e = document.querySelector(".poplink")

      e.onclick = window.open(e.getAttribute("href"),'popUpWindow','height=800,width=1200,left=10,top=10,,scrollbars=yes,menubar=no'); return false;


    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../src/scss/main.scss';
@import '../../src/scss/layout/_header.scss';
</style>
