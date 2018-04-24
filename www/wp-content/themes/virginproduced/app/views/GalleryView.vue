<template v-if="item && item.acf.bg_video">
  <div
       :is993="is993"
       :mobile="mobile"
       :tablet="tablet"
       :desktop="desktop"
       :landscape="landscape"
       :ie="ie">
    <div class="gallery-vue"  v-if="item && item.acf">
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
             data-anchor-target=".anchor"
             data-bottom="transform:rotate(0deg)"
             data-top="transform: rotate(37deg)"
             v-if="ie"
             v-on:click="playReel()"
             >
          <h2 class="glitching toggle-text" title="Play">Play</h2>
        </div>
        <div class="video-hover transition-1"
             data-anchor-target=".anchor"
             data-bottom="transform:rotate(0deg)"
             data-top="transform: rotate(37deg)"
             v-if="is993 === false && ie === null">
            <video
                :id="item.id"
                ref="mainVid"
                class=""
                autoplay
                loop
                muted
                preload="auto"
               v-on:click="playReel()"
                >
               <source :src="item.acf.bg_video" type="video/mp4" >
          </video>
          <h2 class="glitching toggle-text" title="Play">Play</h2>
          <transition
          v-on:before-enter="reelEnter"
          v-on:enter="reelEntered"
          v-on:leave="reelLeave"
          v-bind:css="false"
          >
          <reelPlayer :src="item.acf.main_roll" v-if="reel" @closeReel="closeReel"></reelPlayer>
          </transition>
        </div>
        <div class="transition-2 roll-holder"
        data-anchor-target=".anchor"
        data-bottom="left:40%"
        data-center="left:0%">

          <glitch video
          v-if="item.acf.bg_video && mobile === false && !ie"
          :disabled="glitch.disabled"
          :amount="glitch.amount"
          :scale="glitch.scale"
          :tuning="glitch.tuning"
          :batshit="glitch.batshit"
          v-on:playing="onGlitchPlay"
        >

          <video
                 autoplay
                 loop
                 muted
                 id="main-roll"
                 class=""
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
                 id="main-roll"
                 class=""
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
                v-else
                 id="main-roll"
                 class="transition-2"
                 :src="item.acf.bg_video_mobile"
                 data-anchor-target=".anchor"
                 data-bottom="left:40%"
                 data-center="left:0%"
                 preload="auto"
                 v-bind:style="{height: height}"
                 crossorigin="anonymous"
                 >
          </video>

          </div>
              <figure class="gallery-title transition-3" v-if="is993 === false"
                      >
                <div class="overlay"
                       data-anchor-target=".gallery"
                        data-bottom-top="background: linear-gradient(45deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%);"
                        data-center-top="background: linear-gradient(45deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, .75) 100%);"
                     ></div>
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
                     v-if="!reel"
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
                 data-anchor-target=".anchor"
                 data-bottom="transform:translate3d(0%,0%,0);"
                 data-top="transform:translate3d(-100%,0,0);"
                 v-if="is993 === false"
                 v-bind:style="{height: height}"
                 >
                  <div>
                  </div>
            </div>
          <div class="main post-content above-fold" v-bind:style="{height: height}">
           <div class="anchor"
                data-100-bottom="transform:translate3d(0%,5%,0) rotate(0deg); opacity: 1"
                data-top="transform:translate3d(0%,-15%,0) rotate(-76deg); opacity: 0;"
                v-in-viewport
                v-if="is993 === false"
                ></div>
            <div class="container ml-xl-0 transition-4">
            <vue-headful
                :title="item.title.rendered"
                description="Virgin Produced"
            />
              <div class="row">
                <div class="col-xl-8 col-lg-9 col-md-9">
                  <h1 class="rellax headline" data-rellax-speed="2" v-html="item.acf.headline"></h1>
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
                <div class="col-xl-5 pr-xl-auto col-lg-5 pr-lg-5 col-md-4 pr-sm-auto">
                <div v-html="item.acf.content" data-start="opacity: 1" data-end="opacity: 0">
                </div>
                <div class="roll-down"><span>More</span></div>
                </div>
              </div>
            </div>
          </div>
          <div class="main post-content below-fold">
            <div class="container p-md-0">
              <div class="row" v-if="is993 === false">
                <div class="col-sm-10">
                <div class="content"
                     v-html="item.acf.gallery_content"
                     data-bottom-top="transform: translate3d(0, 10%, 0); opacity: 0"
                     data-center="transform: translate3d(0, 0%, 0); opacity: 1"
                     data-top-bottom="transform: translate3d(0, 0%, 0); opacity:0"></div>
                </div>
              </div>
              <div class="gallery">
              <div class="row" v-if="acfWorks">
                <div class="col-xl-11 col-lg-12 p-md-0">
                  <h2
                      class="gotham glitching"
                      title="Our Work"
                      data-bottom-top="transform: scaleY(0);"
                      data-center="transform: scaleY(1);"
                      v-if="is993 === false"
                      >Our Work</h2>
                  <div class="row">
                        <div class="col-md-6 item"
                             v-for="work, i in acfWorks"
                             v-in-viewport
                             >
                             <img
                              v-on:click="createPlayer(i)"
                              :src="work.acf.poster">
                            <div class="over">
                              <p>{{ work.post_title }}</p>
                            </div>
                              <transition
                              v-on:before-enter="beforeEnter"
                              v-on:enter="enter"
                              v-on:leave="leave"
                              v-bind:css="false"
                              >
                             <galleryPlayer :src="work.acf.video" :poster="work.acf.poster" :mobile="mobile" v-if="currentPlayer === i || mobile === true"></galleryPlayer>
                            </transition>
                        </div>
                  </div>
                </div>
              </div>
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
  components: {
    Glitch,
    galleryPlayer,
    PlayIcon,
    reelPlayer,
    Play},
  props: {
      ie: {},
      mobile: {},
      tablet: {},
      desktop: {},
      is993: {},
      landscape: {}
  },
  data() {
    return {
      item: [],
      posts: [],
      error: false,
      galleryPlayer: false,
      reel: false,
      currentPlayer: null,
      title: '',
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
    created() {
      const slug = this.$route.params.slug;
      this.$store.dispatch('FETCH_PAGE', slug);
      this.calcWindow();
      return Promise.all([
        this.fetchItem(),
//        this.updateValue()
      ])
    },
    mounted: function(){
      var vm = this;
      console.log('mounting...')
      vm.$el.classList.add('loading')
      this.$nextTick(function () {
           this.initView()
//        setTimeout(function(){
//
//        this.title = this.item.title.rendered
//        }, 300);
      })
    },
    updated: function() {
      if(this.is993 === true){
//      var vm = this;
//      vm.$el.classList.remove('loading');
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

//        location.reload()
//        setTimeout(function(){
//        vm.$el.classList.add('loaded');
//        }, 4000);
//        setTimeout(function(){
//                vm.$el.classList.remove('loading');
//                vm.$el.classList.remove('loaded');
//
//        }, 10000);
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
    acfWorks() {
      return this.acf.work_samples.splice(0, 5) || {
          test: 'poo'
      }
    },
//    limitedPosts() {
//      return this.posts.splice(0, 5)
//    },
    },
    beforeDestroy: function(){
      if(this.is993 === false){
      let footer = document.querySelector('footer')
      footer.classList.remove('white');
      skrollr.init().destroy();
      }
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
            var first = vm.$cookie.get(vm.slug);


           if(vm.desktop === true){



            console.log('mounting...')
//            vm.$el.classList.add('loading')
            let footer = document.querySelector('footer')
            document.querySelector('header .router-link-active').classList.remove('white');
            footer.classList.add('white');

            if(first != "true") {


            document.querySelector('body').style.overflow="hidden";
            if(vm.$el){
            setTimeout(function(){
            vm.$el.classList.add('loaded')
            return { x: 0, y: 0 };
            }, 2000);
            setTimeout(function(){
            vm.$el.classList.remove('loading');
            vm.$el.classList.remove('loaded');
            if(vm.is993 === false){
            skrollr.init({
              forceHeight: false
            });
            vm.$el.querySelector('.roll-down').style.opacity="1";
            }
            document.querySelector('body').style.overflow="";
            }, 9000);

            vm.$cookie.set(vm.slug, "true", 1);

            }

            } else {



            setTimeout(function(){
            vm.$el.classList.add('loading-skip');


            }, 1000);
            setTimeout(function(){

            vm.$el.classList.remove('loading');
            vm.$el.classList.remove('loading-skip');
            vm.$el.querySelector('.roll-down').style.opacity="1";

            vm.$cookie.set(vm.slug, "true", 1);

            skrollr.init({
              forceHeight: false
            });
            }, 2000);


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
            if(this.desktop === true){
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
            if(this.desktop === true){
            var container = document.querySelector('.video-hover');
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

            vm.height = window.innerHeight + 'px';

            } else {
            console.log('this isnt lower than 993')

            vm.height = ''

            }

            }, 250);

        if(document.body.clientWidth < 993){
        console.log('this is lower than 993')

          vm.height = window.innerHeight + 'px';

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
          closeReel() {
              this.reel = !this.reel;
          },
      onGlitchPlay(event) {
//        const time = event.timeStamp;
//        this.$refs.mainVid.currentTime = time;
      },

    }
}
</script>
<style lang="scss">
@import '../../src/scss/main.scss';
@import '../../src/scss/components/_gallery.scss';
@import '../../src/scss/components/videojs.scss';
  .mobile #reel-player .video-js {
    display: none
  }
</style>
