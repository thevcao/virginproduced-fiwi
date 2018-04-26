<template>
  <div
       class="loading"
       :is993="is993"
       :mobile="mobile"
       :tablet="tablet"
       :desktop="desktop"
       :landscape="landscape"
       :ie="ie">
      <div class="parent-vue" v-if="item && item.acf">
        <vue-headful
            :title="item.title.rendered"
            description="Virgin Produced"
        />
        <div
             class="video-hover ie"
             data-anchor-target=".below-fold"
              data-bottom-top="transform: translate3d(0%, 0%, 0) scale(1);"
              data-center="transform: translate3d(-15%, 15%, 0) scale(1.5);"
              v-if="ie"
             v-on:click="playReel()"
             >
          <h2 class="glitching toggle-text" title="Play">Play</h2>
        </div>
        <div
             class="video-hover"
             data-anchor-target=".below-fold"
              data-bottom-top="transform: translate3d(0%, 0%, 0) scale(1);"
              data-center="transform: translate3d(-15%, 15%, 0) scale(1.5);"
              v-else-if="is993 === false && ie === null"
             >
            <video
                :id="item.id"
                class=""
                autoplay
                loop
                muted
                preload="auto"
                v-on:click="playReel()"
                v-if="item.acf.bg_video"
                ref="mainVid"
                :src="item.acf.bg_video"
                >
          </video>
          <h2 class="glitching toggle-text" title="Play">Play</h2>
            <img
                 v-if="item.acf.bg_img"
                 :src="item.acf.bg_img"
                 v-bind:style="{height: height}"
                 >
          <transition
          v-on:before-enter="reelEnter"
          v-on:enter="reelEntered"
          v-on:leave="reelLeave"
          v-bind:css="false"
          >
          <reelPlayer :src="item.acf.main_roll" v-if="reel" :is993="is993" :mobile="mobile" :ie="ie" :desktop="desktop" @closeReel="closeReel"></reelPlayer>
          </transition>
        </div>
        <transition
        v-on:before-enter="reelEnter"
        v-on:enter="reelEntered"
        v-on:leave="reelLeave"
        v-bind:css="false"
        >
        <reelPlayer :src="item.acf.main_roll" v-if="reel && is993 === true" :is993="is993" :mobile="mobile" :ie="ie" @closeReel="closeReel"></reelPlayer>
        </transition>
        <div class="crop-video"
             >
              <a
                 href="#"
                 class="play-toggle mobile"
                 v-if="item.acf.main_roll && is993 === true"
                 v-on:click="playReel()"
                 >
                <Play></Play>
              </a>
          <div
              class="lines"
              data-anchor-target=".below-fold"
              data-bottom-top="transform: translate3d(-0%, -0%, 0) scale(1);"
              data-center="transform: translate3d(25%, 25%, 0) scale(3);"
               ></div>
          <glitch video
            v-if="item.acf.bg_video && mobile === false && !ie"
            :disabled="glitch.disabled"
            :amount="glitch.amount"
            :scale="glitch.scale"
            :tuning="glitch.tuning"
            :batshit="glitch.batshit"
            v-on:playing="onGlitchPlay"
            v-bind:style="{height: height}"
          >

          <video
                 autoplay
                 loop
                 muted
                 playsinline
                 id="main-roll"
                 :src="item.acf.bg_video"
                 preload="auto"
                 v-bind:style="{height: height}"
                 crossorigin="anonymous"
                 >
          </video>
          </glitch>
          <video
                 autoplay
                 loop
                 muted
                 playsinline
                 id="main-roll"
                 :src="item.acf.bg_video"
                 preload="auto"
                 v-else-if="ie === true"
                 v-bind:style="{height: height}"
                 crossorigin="anonymous"
                 >
          </video>
          <video
                 autoplay
                 loop
                 muted
                 playsinline
                 id="main-roll"
                 :src="item.acf.bg_video_mobile"
                 preload="auto"
                  v-else
                 crossorigin="anonymous"
                 >
          </video>
          </glitch>
            <img
                 v-if="item.acf.bg_img"
                 :src="item.acf.bg_img"
                 >
          <figure class="gallery-title"
                  v-if="is993 === false"
                  >
            <header class="float-title"
                    data-anchor-target=".above-fold"
                    data-bottom-top="transform:translate3d(0%,0%,0) rotate(-45deg)"
                    data-top-bottom="transform:translate3d(50%,-50%,0) rotate(-45deg)"
                    >
            <h1 :title="item.title.rendered" data-target-resolver>{{ item.title.rendered }}</h1>
            </header>
              <a
                 href="#"
                 class="play-toggle"
                 v-if="!reel"
                 v-on:click="playReel()"
                 data-anchor-target=".video-hover"
                 data-bottom="opacity: 1"
                 data-top="opacity: 0"
                 >
                <PlayIcon></PlayIcon>
              </a>
          </figure>
        </div>
      <div class="main">
        <div class="container ml-xl-0 above-fold" v-bind:style="{height: height}">
              <div class="row">
                <div class="col-lg-6 col-md-10">
                  <div class="intro-in" v-html="item.acf.content"></div>
                  <div class="roll-down"></div>
                </div>
              </div>
        </div>
        <div class="container below-fold">
              <div class="row align-items-center">
                <div class="col-lg-5 col-md-10 col-10 mx-auto content">
                  <div
                       v-html="item.acf.page_content"
                       data-anchor-target=".below-fold"
                        data-bottom-top="transform: translate3d(0, 25%, 0);"
                        data-center="transform: translate3d(0, -5%, 0);"
                       ></div>
                </div>
                <div class="col-lg-5 mr-auto" v-if="is993 === false">
                  <ul class="child-services" v-if="item && item.acf.links_or_images === 'links'">
                    <li
                        v-for="offering in serviceOfferings"
                        data-bottom-top="transform: translate3d(0, 15%, 0); opacity: 0;"
                        data-center="transform: translate3d(0, 0%, 0); opacity: 1"
                        >
                      <router-link :to="offering.post_name" :title="offering.post_title">{{ offering.post_title }} <i class="fa fa-caret-right"></i></router-link>
                    </li>
                  </ul>
                  <ul class="image-links" v-if="item && item.acf.links_or_images === 'images'">
                    <li
                        v-for="image in imageLinks"
                        data-bottom-top="transform: translate3d(0, 15%, 0); opacity: 0;"
                        data-center="transform: translate3d(0, 0%, 0); opacity: 1;"
                        v-if="image.type === 'external'"
                        >
                      <a :href="image.link">
                         <img
                                                   :src="image.image.url"
                                                   >
                      </a>
                      </li>

                        <li
                        data-bottom-top="transform: translate3d(0, 15%, 0); opacity: 0;"
                        data-center="transform: translate3d(0, 0%, 0); opacity: 1;"
                        v-else
                        >

                      <router-link :key="$route.fullPath"
                       :to="image.link"
                       >
                      <img
                           :src="image.image.url"
                           >
                        </router-link>
                    </li>
                  </ul>
                </div>
                <div class="col-lg-5 mr-auto pr-0 pl-0" v-else>
                  <ul class="child-services" v-if="item && item.acf.links_or_images === 'links'">
                    <li
                        v-for="offering in serviceOfferings"
                        data-bottom-top="transform: translate3d(0, 15%, 0); opacity: 0;"
                        data-center="transform: translate3d(0, 0%, 0); opacity: 1"
                        >
                        <video
                            class=""
                            autoplay
                            loop
                            muted
                            playsinline
                            preload="auto"
                            >
                           <source :src="offering.acf.bg_video_mobile" type="video/mp4" >
                      </video>
                      <router-link :to="offering.post_name" :title="offering.post_title">{{ offering.post_title }} <i class="fa fa-caret-right"></i></router-link>
                    </li>
                  </ul>
                  <ul class="image-links" v-if="item && item.acf.links_or_images === 'images'">
                    <li
                        v-for="image in imageLinks"
                        data-bottom-top="transform: translate3d(0, 15%, 0); opacity: 0;"
                        data-center="transform: translate3d(0, 0%, 0); opacity: 1;"
                        v-if="image.type === 'external'"
                        >
                      <a :href="image.link">
                         <img
                                                   :src="image.image.url"
                                                   >
                      </a>
                      </li>

                        <li
                        data-bottom-top="transform: translate3d(0, 15%, 0); opacity: 0;"
                        data-center="transform: translate3d(0, 0%, 0); opacity: 1;"
                        v-else
                        >
                      <router-link :key="$route.fullPath"
                       :to="image.link"
                       >
                      <img
                           :src="image.image.url"
                           >
                        </router-link>
                    </li>
                  </ul>
                </div>
              </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import PageService from '../services/PageService'
import PostService from '../services/PostService'
import reelPlayer from '../components/reelPlayer.vue'
import videojs from 'video.js'
import inViewportDirective from 'vue-in-viewport-directive'
import inViewport from 'vue-in-viewport-mixin'
import PlayIcon from '../components/Play.vue'
import Play from '../components/PlayIcon.vue'
const Glitch = () => import(/* webpackChunkName: "glitch" */ '../components/Glitch.vue');

export default {
  components: {Glitch, PlayIcon, reelPlayer, Play},
  data() {
    return {
      item: {},
      posts: [],
      error: false,
      reel: false,
      height: '',
      glitch: {
        disabled: false,
//       amount: 1.45,
//        scale: 0.09,
//        tuning: -2,
       amount: 0,
        scale: 0.06,
        tuning: 1.66,
        batshit: true,
      },
    }
  },
  beforeRouteUpdate(to) {

  },
  props: {
    ie: {},
    mobile: {},
    tablet: {},
    desktop: {},
    is993: {},
    landscape: {}
  },
    created() {
      const slug = this.$route.params.slug;
      this.$store.dispatch('FETCH_PAGE', slug);
      this.fetchItem()
      this.calcWindow()
//      this.fetchPosts()
    },
    mounted: function(){
      this.$nextTick(function () {
        if(this.is993 === false){
           this.initView()
        }
        if(this.is993 === true){
          var body = document.querySelector('body');
          var vm = this;

          body.classList.add('no-header-bg')


          setTimeout(function(){
          vm.$el.classList.remove('loading');
          }, 5000);

        }
      })
    },
    updated: function() {
      if(this.is993 === true){
      var vm = this;
//      vm.$el.classList.remove('loading');
//      setTimeout(function(){
//      if (window.navigator.standalone == true) {
//      var heroHeight = window.innerHeight - 80 + 'px'
//      } else {
//      var heroHeight = window.innerHeight - 65 + 'px'
//      }
//      vm.$el.querySelector('.above-fold').style.height=heroHeight
//       }, 500);
      }
    },
  computed: {
    slug() { return this.$route.params.slug },
    pageContent() { return this.$store.state.pages[this.slug] },
    acf() { return this.pageContent.acf || { test: 'poop' } },
    serviceOfferings() {
//      return GoodsService.getAll();
      var vm = this;
      return vm.item.acf.child_services.splice(0, 5) || {
          test: 'poo'
      }
    },
    imageLinks() {
//      return GoodsService.getAll();
      var vm = this;
      return vm.item.acf.image_links.splice(0, 5) || {
          test: 'poo'
      }
    },
//    limitedPosts() {
//      return this.posts.splice(0, 5)
//    },
  },
  watch: {
//    '$route'(to, from) {
//      this.fetchItem();
//    }
      $route (to, from){

        var vm = this;
        vm.show = false;
        vm.fetchItem()
        vm.$el.classList.add('loading');
        vm.initView()
        vm.calcWindow()
        vm.show = true;

      }
  },
//    updated: function(){
//
//         var rellax = new Rellax('.rellax')
//
//
//    },
  beforeDestroy: function(){
//    footer.classList.remove('white');
    skrollr.init().destroy();
    if(this.is993 === true){
      var body = document.querySelector('body');
      body.classList.remove('no-header-bg')
    }

  },
  methods: {
//    fetchNestedAcf(slug) {
//      const paramSlug = this.$route.params.slug || ''
//      const pageSlug = slug || paramSlug
//
////      if (paramSlug === 'content-services') {
//        const work = this.acfWorks.map(workPage => {
//          return PageService
//            .getAcf(workPage.post_name)
//            .then(result => {
//              this.nestedAcf.push(result.data[0].acf)
//          })
//        })
//
//        return Promise.all(work);
////      }
//    },
    initView: function(){
      var vm = this;
      var first = vm.$cookie.get(vm.slug);

      console.log('mounting...')
      let footer = document.querySelector('footer')
      if(this.desktop === true){


      if(first != "true") {

      if(vm){

      document.querySelector('body').style.overflow="hidden";


      vm.$el.classList.add('loading')
      setTimeout(function(){
      vm.$el.classList.add('loaded')
      return { x: 0, y: 0 };
      }, 3000);
      setTimeout(function(){
      skrollr.init({
        forceHeight: false
      });
      vm.$el.classList.remove('loading')
      vm.$el.classList.remove('loaded')
      document.querySelector('body').style.overflow="";
      vm.$cookie.set(vm.slug, "true", 1);

      }, 10000);

      }

      } else {

      vm.$el.classList.remove('loading');

      setTimeout(function(){

      skrollr.init({
        forceHeight: false
      });
      vm.$cookie.set(vm.slug, "true", 1);

      }, 2000);

      }
      } else {
      vm.$el.classList.add('loading')

      var body = document.querySelector('body');
      body.classList.add('no-header-bg')


      setTimeout(function(){
      vm.$el.classList.remove('loading');
      }, 5000);

      }

    },
    fetchItem(slug) {
      const paramSlug = this.$route.fullPath.replace('/','').replace('/','') || '';
      const pageSlug = slug || paramSlug;
      console.log(paramSlug)
      return PageService.get(pageSlug)
        .then(result => {
          this.item = result.data[0]
            console.log(result.data[0])
//            this.$nextTick(function() {
//              this.fetchNestedAcf();
//            });
        }).then(result => {
                  if(this.acf.bg_video != undefined){
                  this.$parent.$emit('broll', {
                  src : this.acf.bg_video
                  })
                  console.log(this.acf.bg_video);
                  }
        }).then(result => {
            this.$parent.$emit('contextual_menu', {
            contextual_menu : this.item.acf.contextual_menu.menu_label
            })
            console.log(this.item.acf.contextual_menu.menu_label);
          }).then(result => {
            this.$parent.$emit('contextual_menu_links', {
            contextual_menu_links : this.item.acf.contextual_menu.links
            })
            console.log(this.item.acf.contextual_menu.links);
          })
        .catch(err => {
          this.error = true
        })
    },
//    fetchPosts() {
//      return PostService.getAll()
//        .then(result => {
//          this.posts = result.data
//        })
//    },
    //Reel Modal Functions
    reelEnter: function (el) {
      el.style.opacity = 0
    },
    reelEntered: function (el, done) {
      skrollr.init().destroy();
      if(this.desktop === true) {
      var container = document.querySelector('.video-hover');
      container.style.transition='all .3s ease'
      container.classList.add('clipping');
      Velocity(container, {
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        width: '100%',
        height: '100%',
      },{
        duration: 750,
        delay: 300,
        begin: function(){
        container.style.transition='none';
        },
        complete: function(){
        },
      })
      }
      Velocity(el, {
        opacity: 1
      },{
        duration: 300,
        delay: 750
          });
    },
    reelLeave: function (el, done) {
      Velocity(el, {
        opacity: 0
      }, {
        duration: 500,
        delay: 0,
      });
      Velocity(el, {
        display: 'none'
      }, {
        complete: done,
        delay: 1000
      });
      if(this.desktop === true) {
      var container = document.querySelector('.video-hover');
      Velocity(container, "reverse", {
        delay: 0,
        begin: function(){
        },
        complete: function(){
        container.style.transition='all .3s ease';
        container.classList.remove('clipping');
        container.style.top=''
        container.style.left=''
        container.style.right=''
        container.style.bottom=''
        container.style.width=''
        container.style.height=''
        skrollr.init()
        },
      })
      }
    },
    closeReel() {
        this.reel = !this.reel;
    },
    getPath() {
      var parent = this.item.post_name;
      return parent;
      console.log(parent);
    },
    playReel() {

      if(this.desktop === false && this.reel === false) {
      document.querySelector('.play-toggle.mobile').classList.add('play');

//        document.querySelector('.home-play-mobile').classList.add('play');

      setTimeout(function(){
      const getID = document.querySelector('#reel-player .video-js').id;
      var player = videojs(getID);
      player.play();
      player.requestFullscreen();
      }, 1000);
      setTimeout(function(){
      document.querySelector('.play-toggle.mobile').classList.remove('play');

      }, 1500);
     } else if(this.desktop === false && this.reel === true){

      document.querySelector('.play-toggle.mobile').classList.add('play');

      this.reel = false


      setTimeout(function(){
      const getID = document.querySelector('#reel-player .video-js').id;
      var player = videojs(getID);
      player.play();
      player.requestFullscreen();
      }, 1000);

      setTimeout(function(){
      document.querySelector('.play-toggle.mobile').classList.remove('play');

      }, 1500);

     } else {

            setTimeout(function(){
            const getID = document.querySelector('#reel-player .video-js').id;
            var player = videojs(getID);
            player.play();
            }, 500);

           }


    this.reel = !this.reel;


    },
      calcWindow: function(){
      var vm = this;

      function debounce(func, wait, immediate) {
          var timeout;
          return function() {
              var context = this, args = arguments;
              var later = function() {
                  timeout = null;
                  if (!immediate) func.apply(context, args);
              };
              var callNow = immediate && !timeout;
              clearTimeout(timeout);
              timeout = setTimeout(later, wait);
              if (callNow) func.apply(context, args);
          };
      };

        var myEfficientFn = debounce(function() {

            if(document.body.clientWidth < 993){
            console.log('this is lower than 993')

            vm.height = window.innerHeight - 65 + 'px';

            } else {
            console.log('this isnt lower than 993')

            vm.height = ''

            }

            }, 250);

        if(document.body.clientWidth < 993){
        console.log('this is lower than 993')

            vm.height = window.innerHeight - 65 + 'px';

          } else {
        console.log('this isnt lower than 993')

          vm.height = ''


          }

        if(vm.desktop === true){

        window.addEventListener('resize', myEfficientFn);

        } else {

        window.addEventListener('orientationchange', myEfficientFn);


        }

      },
      onGlitchPlay(event) {

        var vm = this;
        if(vm.is993 === false){

        const time = event.timeStamp;
        this.$refs.mainVid.currentTime = time;

        }

      },
  }
}
</script>
<style lang="scss">
@import '../../src/scss/main.scss';
@import '../../src/scss/components/_parent.scss';
@import '../../src/scss/components/videojs.scss';
</style>
