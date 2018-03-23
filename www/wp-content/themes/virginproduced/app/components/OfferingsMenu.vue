<template>


              <ul class="">
                <li v-for="page in orderedPages" v-bind:key="page.url" class="pa2 f3 f1-ns" v-if="page.target">
                  <a :href="page.url" class="white ttu" :title="page.title">{{ page.title }}</a>
                </li>
                <li v-bind:key="page.url" class=""  v-else>
                  <router-link :to="page.url" @click.native="toggleNavigation" :title="page.title" class="white ttu">{{ page.title }}</router-link>
                </li>
              </ul>
</template>

<script>

import { orderBy } from 'lodash'
import OfferingsMenuService from '../services/OfferingsMenuService'

//inViewport = require('vue-in-viewport-mixin');
// module.exports = {
//
// }

export default {

  data() {

    return {
            items: [],

    }

  },
  created() {
    this.fetchItems()


  },
  computed: {
    orderedPages() {
      return orderBy(this.items.items, 'order')
    }
  },
   methods: {


      fetchItems() {
        return OfferingsMenuService.getAll()
          .then(result => {
            this.items = result.data
          })
      },
    toggleNavigation() {
      console.log('emitting togglenav')
      this.$emit('togglenav')
//      this.navigation = !this.navigation;


//      setTimeout(function(){
//        toggle.classList.toggle('active');
//      }, 300);


    },
   }


}

</script>
