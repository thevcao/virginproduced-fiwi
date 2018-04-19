<template v-if="item">
  <div
       :is993="is993"
       :mobile="mobile"
       :tablet="tablet"
       :desktop="desktop"
       :ie="ie">
    <div class="child-vue"  v-if="item && item.acf">
          <transition
          v-on:before-enter="reelEnter"
          v-on:enter="reelEntered"
          v-on:leave="reelLeave"
          v-bind:css="false"
          >
          <reelPlayer :src="item.acf.main_roll" v-if="reel && is993 === true" @closeReel="closeReel"></reelPlayer>
          </transition>
        <div
             class="video-hover ie transition-1"
              v-if="ie"
             v-on:click="playReel()"
             >
            <h2 class="glitching toggle-text" title="Play">Play</h2>
          </div>
        <div class="video-hover ie transition-1" v-if="ie">
            <h2 class="glitching toggle-text" title="Play"  v-if="(item.acf.main_roll)">Play</h2>
            <img
                 class="bg-image"
                 v-else="item.acf.main_image.url"
                 :src="item.acf.main_image.url"
                 >
          <transition
          v-on:before-enter="reelEnter"
          v-on:enter="reelEntered"
          v-on:leave="reelLeave"
          v-bind:css="false"
          >
          <reelPlayer :src="item.acf.main_roll" v-if="reel" @closeReel="closeReel"></reelPlayer>
          </transition>
        </div>
        <div class="video-hover transition-1" v-if="is993 === false && ie === null">
            <video
                :id="item.id"
                class=""
                 ref="mainVid"
                v-if="item.acf.bg_video"
                autoplay
                loop
                muted
                preload="auto"
               v-on:click="playReel()"
                >
               <source :src="item.acf.bg_video" type="video/mp4" >
          </video>
            <h2 class="glitching toggle-text" title="Play"  v-if="(item.acf.main_roll)">Play</h2>
            <img
                 class="bg-image"
                 v-else="item.acf.main_image.url"
                 :src="item.acf.main_image.url"
                 >
          <transition
          v-on:before-enter="reelEnter"
          v-on:enter="reelEntered"
          v-on:leave="reelLeave"
          v-bind:css="false"
          >
          <reelPlayer
                      :src="item.acf.main_roll"
                      v-if="reel"
                      @closeReel="closeReel"
                      ></reelPlayer>
          </transition>
        </div>


        <glitch video
          v-if="item.acf.bg_video && desktop === true"
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
                 id="main-roll"
                 class="transition-2"
                 crossorigin="anonymous"
                 :src="item.acf.bg_video"
                 preload="auto"
                 v-bind:style="{height: height}"
                 >
          </video>
          </glitch>

          <video
                 autoplay
                 loop
                 muted
                 id="main-roll"
                 class="transition-2"
                 crossorigin="anonymous"
                 :src="item.acf.bg_video_mobile"
                 preload="auto"
                 v-else-if="mobile === true && item.acf.bg_video_mobile"
                 v-bind:style="{height: height}"
                 >
          </video>

        <glitch img
          v-if="item.acf.bg_image.url && desktop === true"
          :disabled="glitch.disabled"
          :amount="glitch.amount"
          :scale="glitch.scale"
          :tuning="glitch.tuning"
          :batshit="glitch.batshit"
          v-bind:style="{height: height}"
        >
            <img
                 class="crop-image transition-2"
                 :src="item.acf.bg_image.url"
                 v-bind:style="{height: height}"
                 crossorigin="anonymous"
                 >
          </glitch>

            <img
                 class="crop-image transition-2"
                 :src="item.acf.bg_image.url"
                 v-bind:style="{height: height}"
                 v-else-if="!item.acf.bg_video_mobile"
                 crossorigin="anonymous"
                 >



              <figure class="gallery-title transition-3"
                      v-if="is993 === false"
                      >
                <header class="float-title"
                        data-anchor-target=".anchor"
                        data-bottom="transform:translate3d(0%,0%,0) rotate(-45deg)"
                        data-top="transform:translate3d(50%,-50%,0) rotate(-45deg)"
                        >
                <h1 :title="item.title.rendered">{{ item.title.rendered }}</h1>
                </header>
                  <a
                     href="#"
                     class="play-toggle"
                     v-if="(item.acf.main_roll) || (item.acf.main_roll && !reel)"
                     v-on:click="playReel()"
                     data-anchor-target=".anchor"
                     data-bottom="opacity: 1"
                     data-top="opacity: 0"
                     >
                    <PlayIcon></PlayIcon>
                  </a>
              </figure>
            <div
                class="crop-bg"
                 v-if="is993 === false"
                 >
                  <div>
                  </div>
            </div>
          <div
               class="main post-content above-fold"
               v-bind:style="{height: height}"
               >
           <div class="anchor"
                data-bottom="transform:translate3d(0%,0%,0)"
                data-top="transform:translate3d(0%,-25%,0)"
                v-in-viewport v-if="item.acf.images && is993 === false"></div>
           <div class="anchor"
                style="opacity:0"
                v-if="is993 === false"
                data-bottom="transform:translate3d(0%,0%,0)"
                data-top="transform:translate3d(0%,-25%,0)"
                ></div>
            <div class="container ml-xl-0 transition-4">
            <vue-headful
                :title="item.title.rendered"
                description="Virgin Produced"
            />
              <div class="row">
                <div class="col-xl-8 col-lg-9 col-md-10">
                  <h1 class="rellax headline" data-rellax-speed="2" v-html="item.acf.headline" v-if="item.acf.text_or_image === 'text'"></h1>
                  <img class="title-logo" :src="item.acf.image.url" v-if="item.acf.image && is993 === false">
                  <img class="title-logo mobile" :src="item.acf.image_mobile.url" v-if="item.acf.image_mobile && is993 === true">
                  <a
                     href="#"
                     class="play-toggle mobile"
                     v-if="item.acf.main_roll && is993 === true"
                     v-on:click="playReel()"
                     >
                    <Play></Play>
                  </a>
                </div>
              </div>
              <div class="row" v-if="is993 === false">
                <div class="col-xl-5 pr-xl-auto col-lg-5 pr-lg-5 col-md-10 pr-sm-auto">
                <div v-html="item.acf.content" data-start="opacity: 1" data-end="opacity: 0">
                </div>
                <div class="roll-down" v-if="item.acf.images"><span>More</span></div>
                <div class="roll-down" v-else style="display: none;"><span>More</span></div>
                </div>
              </div>
            </div>
          </div>
          <div class="main post-content below-fold">
              <div class="container">
              <div class="" v-if="is993 === true">
                <div class="col-11 mx-auto">
                <div v-html="item.acf.content">
                </div>
                </div>
              </div>
                <div class="row align-items-center" v-if="is993 === false">
                  <div class="col-sm-7">
                    <div class="masonry" v-if="item.acf.images">
                      <div
                           class="image"
                           v-for="image in masonryImages"
                            data-bottom-top="transform: translateY(15%); opacity: 0;"
                            data-center="transform: translateY(0%); opacity: 1"
                           >
                        <img :src="image.sizes.large">
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-4 offset-sm-1">
                    <div
                         v-html="item.acf.gallery_content"
                          data-bottom-top="transform: translateY(25%);"
                          data-center="transform: translateY(-5%);"
                         ></div>
                  </div>
                </div>
              </div>
                <div class="row mt-5" v-if="is993 === true && item.acf.images">
                  <div class="col-12">
                    <div class="masonry" v-if="item.acf.images">
                      <div
                           class="image"
                           v-for="image in masonryImages"
                            data-bottom-top="transform: translateY(15%); opacity: 0;"
                            data-center="transform: translateY(0%); opacity: 1"
                           >
                        <img :src="image.sizes.large">
                      </div>
                    </div>
                  </div>
                </div>
            <div class="container mt-5" v-if="is993 === true && item.acf.gallery_content">
                  <div class="col-11 mx-auto">
                    <div
                         v-html="item.acf.gallery_content"
                         ></div>
                  </div>
            </div>
          </div>
        </div>
    </div>
</template>
<script>
//import videojs from "video.js" ;
import GalleryService from '../services/GalleryService'
import galleryPlayer from '../components/galleryPlayer.vue'
import reelPlayer from '../components/reelPlayer.vue'
let videojs = require('video.js');
import inViewportDirective from 'vue-in-viewport-directive'
import inViewport from 'vue-in-viewport-mixin'
import PlayIcon from '../components/Play.vue'
import Play from '../components/PlayIcon.vue'
const Glitch = () => import(/* webpackChunkName: "glitch" */ '../components/Glitch.vue');


export default {
  components: {Glitch, galleryPlayer, PlayIcon, reelPlayer, Play},
  data() {
    return {
      item: [],
      posts: [],
      error: false,
      title: 'The Platform',
      galleryPlayer: false,
      reel: false,
      currentPlayer: null,
      height: '',
      glitch: {
        disabled: false,
       amount: 0,
        scale: 0.06,
        tuning: 1.66,
        batshit: true,
      },
    }
  },
  props: {
    ie: {},
    mobile: {},
    is993: {},
    tablet: {},
    desktop: {}
  },
    created() {
      const slug = this.$route.params.slug;
      this.$store.dispatch('FETCH_PAGE', slug);

      return Promise.all([
        this.fetchItem(),
//        this.updateValue()
      ])
    },
    mounted: function(){
      this.$nextTick(function () {
          this.initView()
          this.calcWindow()
      })
    },
    updated: function() {
      if(this.is993 === true){
      var vm = this;
      vm.$el.classList.remove('loading');
//      setTimeout(function(){
//      if (window.navigator.standalone == true) {
//      var heroHeight = window.innerHeight - 80 + 'px'
//      } else {
//      var heroHeight = window.innerHeight - 65 + 'px'
//      }
//      vm.$el.querySelector('.above-fold').style.height=heroHeight
//      if(vm.acf.bg_video){
//      vm.$el.querySelector('#main-roll').style.height=heroHeight
//      }
//      if(vm.acf.main_image){
//      vm.$el.querySelector('.crop-image').style.height=heroHeight
//      }
//       }, 500);
      }
    },
    mixins: [ inViewport ],
    watch: {
     'inViewport.now': function(visible, above) {
       if(this.is993 === false){
       if(visible){
          document.querySelector('header .router-link-active').classList.remove('white');
          document.querySelector('header .toggle').classList.remove('footer-in-view');
          console.log('BG is visible')
       }
       if(above) {
          document.querySelector('header .router-link-active').classList.add('white');
          document.querySelector('header .toggle').classList.add('footer-in-view');
          console.log('BG is outside of the viewport')
       }
       }
},
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
    computed: {
    slug() { return this.$route.params.slug },
    pageContent() { return this.$store.state.pages[this.slug] },
    acf() {
      return this.item.acf || { test: 'poop' }
    },
    masonryImages() {
      return this.acf.images.splice(0, 5) || {
          test: 'poo'
      }
    },
//    limitedPosts() {
//      return this.posts.splice(0, 5)
//    },
    },
    beforeDestroy: function(){
      let footer = document.querySelector('footer')
      footer.classList.remove('white');
      skrollr.init().destroy();
      this.$parent.$emit('contextual_menu', {
      contextual_menu : ''
      })
      this.$parent.$emit('contextual_menu_links', {
      contextual_menu_links : ''
      })
    },
    methods: {
          initView: function(){
            var vm = this;
            console.log('mounting...')
            vm.$el.classList.add('loading')
            let footer = document.querySelector('footer')
            if(this.is993 === false){
            document.querySelector('header .router-link-active').classList.remove('white');
            document.querySelector('body').style.overflow="hidden";
            if(vm.$el){
            setTimeout(function(){
            vm.$el.classList.add('loaded')
            console.log('complete load...')
            return { x: 0, y: 0 };
            }, 3000);
            setTimeout(function(){
            vm.$el.classList.remove('loading');
            vm.$el.classList.remove('loaded');
            skrollr.init({
              forceHeight: false
            });
            document.querySelector('body').style.overflow="";
            vm.$el.querySelector('.roll-down').style.opacity="1";
            }, 9000);
            }
            } else {
            vm.$el.classList.remove('loading');
            }
          },
          fetchItem(slug) {
            const paramSlug = this.$route.params.slug
            const pageSlug = slug || paramSlug
            return GalleryService.get(paramSlug)
              .then(result => {
                this.item = result.data[0]
                  console.log(result.data[0])
              }).then(result => {
                  if(this.acf.bg_video != undefined){
                  this.$parent.$emit('broll', {
                  src : this.acf.bg_video
                  })
                  console.log(this.acf.bg_video);
                  }
                this.title = this.item.title.rendered
                this.$parent.$emit('title', {
                title : this.item.title.rendered
                })
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
          createPlayer(i) {
            this.currentPlayer = i
            this.galleryPlayer = !this.galleryPlayer
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
          beforeEnter: function (el) {
            el.style.opacity = 0
          },
          enter: function (el, done) {
            Velocity(el, {
              opacity: 1
            },{
              duration: 300,
              delay: 200
                }
                    );
          },
          leave: function (el, done) {
            Velocity(el, {
              opacity: 0
            }, {
              duration: 300,
            });
            Velocity(el, {
              display: 'none'
            }, {
              complete: done,
              delay: 300
            })
          },
          //Reel Modal Functions
          reelEnter: function (el) {
            el.style.opacity = 0
          },
          reelEntered: function (el, done) {
            if(this.is993 === false) {
            skrollr.init().destroy();
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
              delay: 200
                });
          },
          reelLeave: function (el, done) {
            if(this.is993 === false) {
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
          },
          closeReel() {
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
@import '../../src/scss/components/_child-service.scss';
@import '../../src/scss/components/videojs.scss';
</style>
