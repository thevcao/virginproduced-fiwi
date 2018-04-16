<template>
  <div class="suits-vue single"
       :ie="ie"
       :is993="is993"
       :mobile="mobile"
       :landscape="landscape"
       :tablet="tablet"
       :desktop="desktop"
       contextual_menu="Our Suits">
    <!-- 404 -->
    <div class="container main" v-if="error">
      <div class="row">
        <div class="col-12">
          <h1 class="glitching" title="Pardon the disruption">Pardon the disruption</h1>
        </div>
      </div>
    </div>
<div
     v-if="item.content">
    <figure
            class="team-headshot"
            v-if="item && item.better_featured_image && ((mobile === false && landscape === false) || (mobile === true && landscape === false))">
      <img
           :src="item.better_featured_image.media_details.sizes.medium.source_url"
           v-if="item.better_featured_image.media_details.sizes.medium">
      <img
           :src="item.better_featured_image.source_url" v-else>
      <div
           v-if="is993 === true"
           class="crop-bg"><div></div></div>
      <header
              class="float-title">
      <h2
          :title="item.title.rendered">{{ item.title.rendered }}<span>{{ item.acf.position }}</span></h2>
      </header>
    </figure>
    <div v-if="is993 === false" class="crop-bg"><div></div>
  </div>
    <div class="main">
      <vue-headful :title="item.title.rendered" description="Virgin Produced"/>
      <div class="container ml-xl-0">
        <div class="row" v-if="is993 === false">
          <div class="col-sm-4">
            <aside class="SidebarItem">
            <header class="SidebarItem__header">
              <h1>Our Suits</h1>
            </header>
          </aside>
          </div>
        </div>
        <div class="row">
          <div class="col-xl-3 col-lg-3 col-sm-8" v-if="is993 === false">
            <aside class="SidebarItem">
            <ul>
              <li v-for="post in limitedPosts" v-bind:key="post.slug" v-if="post.better_featured_image">
                <router-link :to="{ name: 'suits', params: { slug: post.slug } }" :title="post.title.rendered">{{ post.title.rendered }}</router-link>
              </li>
              <li v-else>
                <a href="" class="title-only" :title="post.title.rendered">{{ post.title.rendered }}<span>{{ post.acf.position }}</span></a>
              </li>
            </ul>
          </aside>
          </div>
          <div class="col-xl-4 col-lg-6 col-sm-8">
            <div v-if="landscape === true && mobile === true">
            <h1 v-html="item.title.rendered"></h1>
              <div v-html="item.content.rendered"></div>
            </div>
          <article class="BlogPostSingle" v-if="landscape === false || tablet === true">
            <aside class="BlogPostSingle__content">
              <div v-html="item.content.rendered"></div>
            </aside>
            </article>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import SuitsService from '../services/SuitsService'
//import Glitch from '../../src/js/_Glitch.js'
export default {
  data() {
    return {
      item: {},
      posts: [],
      error: false,
    }
  },
  props: {
    ie: {},
    mobile: {},
    is993: {},
    contextual_menu: 'Our Suits',
    landscape: {},
    tablet: {},
    desktop: {}
  },
  created() {
    this.fetchItem()
    this.fetchPosts()
  },
  watch: {
    '$route': 'fetchItem'
  },
  computed: {
    limitedPosts() {
      return this.posts.splice(0, 999)
    }
  },
  updated: function(){
    var body = document.querySelector('body');

    var vm = this;
    if(vm.is993 === true){
      if(vm.landscape === false){
      body.style.position='fixed'
      } else {

      body.style.position=''


      }
      body.classList.add('no-header-bg')

    }




    this.$parent.$emit('contextual_menu', {
    contextual_menu : 'Our Suits'
    })

    this.$parent.$emit('contextual_menu_links', {
    contextual_menu_links : ''
    })

  },
  beforeDestroy() {

    this.$parent.$emit('contextual_menu', {
    contextual_menu : ''
    })

    this.$parent.$emit('contextual_menu_links', {
    contextual_menu_links : ''
    })

  },
  mounted: function(){
    var body = document.querySelector('body');
    if(this.is993 === true){
      if(this.landscape === false){
      body.style.position='fixed'
      }
      body.classList.add('no-header-bg')

    }
    window.addEventListener('orientationchange', function(){
      if(this.landscape === false){

      body.style.position='fixed'

      } else {

      body.style.position=''


      }


    });
  },
  beforeDestroy: function(){
    if(this.is993 === true){
    var body = document.querySelector('body');
      if(this.landscape === false){
      body.style.position=''
      }
      body.classList.remove('no-header-bg')
    }
  },
  methods: {
    fetchItem() {
      return SuitsService.get(this.$route.params.slug)
        .then(result => {
          this.item = result.data[0]
        })
        .catch(err => {
          this.error = true
        })
    },
    fetchPosts() {
      return SuitsService.getAll()
        .then(result => {
          this.posts = result.data
        })
    },
//    beforeEnter: function (el) {
//      el.style.opacity = 0
//    },
//    enter: function (el, done) {
//      Velocity(el, { opacity: 0 }, { duration: 500 });
//      setTimeout(function(){
//            Velocity(el, { opacity: 1 }, { duration: 500 });
//      }, 300);
//
//    },
//    leave: function (el, done) {
//      Velocity(el, { opacity: 1 }, { duration: 500 });
//      setTimeout(function(){
//            Velocity(el, { opacity: 0 }, { duration: 500 });
//      }, 300);
////      Velocity(el, {
////        display: 'none'
////      }, { complete: done })
//    }
  }
}
</script>
<style lang="scss">
@import '../../src/scss/main.scss';
@import '../../src/scss/components/_suits.scss';
</style>
