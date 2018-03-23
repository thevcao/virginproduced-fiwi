<template>
    <div class="home-vue">
      <vue-headful
          title="Home"
          description="Virgin Produced"
      />
    <div class="main">
      <div class="lines">
      <div class="hero-text">
      <h1>Creative<br>Collaborative<br>Provocative<br>Disruptive</h1>
      <p>This is Virgin Produced</p>

  </div>
  </div>
    <video src="/wp-content/themes/virginproduced/src/img/virgin-glitched.mp4"  autoplay loop muted></video>
    <div class="crop-bg"><div></div></div>
    <div class="home-menu">
          <ul class="">
            <li><a href="#" v-on:click="submenu()" title="Offerings">Offerings</a></li>
            <li v-for="page in orderedPages" v-bind:key="page.url" class="pa2 f3 f1-ns" v-if="page.target">
              <a :href="page.url" class="white ttu" :title="page.title">{{ page.title }}</a>
            </li>
            <li v-bind:key="page.url" class=""  v-else>
              <router-link :to="page.url" @click.native="toggleNavigation" :title="page.title" class="white ttu">{{ page.title }}</router-link>
            </li>
          </ul>
    </div>
    </div>
    </div>

</template>

<script>
import { orderBy } from 'lodash'

import MediaService from '../services/MediaService'
import { mapGetters, mapActions } from 'vuex'
import HomeMenuService from '../services/HomeMenuService'
import GlobalService from '../services/GlobalService'

const Post = () => import(
  /* webpackChunkName: "below-fold" */ '../components/Post.vue'
);

export default {

  components: { Post },

  data() {
    return {
            items: [],

      isLoading: true,
      backgroundImage: ''
    }
  },

  created() {
    this.fetchItems()
    return Promise.all([
      this.getAllPosts(),
      MediaService.get('bg')
    ])
      .then(([noop, image]) => {
        this.backgroundImage = image.data[0].source_url
        this.isLoading = false
      })


  },
  mounted() {

      document.querySelector('#footer').style.display='none'

  },
  destroyed() {
      document.querySelector('#footer').style.display='block'


  },
  computed: {
    ...mapGetters({
      items: 'allPosts',
      filteredItems: 'filteredPosts'
    }),

  },
  computed: {
    orderedPages() {
      return orderBy(this.items.items, 'order')
    }
  },
    updated: function(){

//         var rellax = new Rellax('.rellax');


    },
  methods: {
    fetchItems() {
      return HomeMenuService.getAll()
        .then(result => {
          this.items = result.data
        })
    },


    submenu(){

      console.log('sub menu function');

    },

    ...mapActions([
      'getAllPosts'
    ])
  }

}

</script>

<style lang="stylus" scoped>

.fa.fa-play-circle-o
  cursor: pointer
  text-shadow: 3px 3px 16px #D3D3D3

  &:hover
    opacity: 0.7
    transition: all 0.5 ease-in-out

@media only screen and (min-width: 640px)
  .vh-95-ns
    height: 95vh

</style>
