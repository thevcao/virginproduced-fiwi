<template v-if="item && item.acf.bg_video">
  <div>
    <div class="child-vue"  v-if="item && item.acf">

        <div
             class="video-hover ie transition-1"
              v-if="ie"
             v-on:click="playReel()"
             >

            <h2 class="glitching toggle-text" title="Play">Play</h2>


          </div>

        <div class="video-hover transition-1" v-else>
            <video
                :id="item.id"
                class=""
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
          <reelPlayer :src="item.acf.main_roll" v-if="reel" @closeReel="closeReel"></reelPlayer>
          </transition>
        </div>

          <video
                 autoplay
                 loop
                 muted
                 id="main-roll"
                 class="transition-2"
                 v-if="item.acf.bg_video"
                 :src="item.acf.bg_video"
                 preload="auto"
                 >
          </video>



            <img
                 v-else="item.acf.bg_image.url"
                 class="crop-image transition-2"
                 :src="item.acf.bg_image.url"
                 >

              <figure class="gallery-title transition-3"

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
                 >
                  <div>
                  </div>
            </div>
          <div class="main post-content above-fold">

           <div class="anchor"
                data-bottom="transform:translate3d(0%,0%,0)"
                data-top="transform:translate3d(0%,-25%,0)"
                v-in-viewport v-if="item.acf.images"></div>
           <div class="anchor"
                style="opacity:0"
                v-else
                data-bottom="transform:translate3d(0%,0%,0)"
                data-top="transform:translate3d(0%,-25%,0)"
                ></div>

            <div class="container ml-xl-0 transition-4">

            <vue-headful
                :title="item.title.rendered"
                description="Virgin Produced"
            />

              <div class="row">
                <div class="col-xl-8 col-lg-9 col-sm-6">


                  <h1 class="rellax headline" data-rellax-speed="2" v-html="item.acf.headline" v-if="item.acf.text_or_image === 'text'"></h1>
                  <img class="title-logo" :src="item.acf.image.url" v-else>

                </div>
              </div>
              <div class="row">
                <div class="col-xl-5 pr-xl-auto col-lg-5 pr-lg-5 col-md-4 pr-sm-auto">


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
                    <div class="row align-items-center">
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



export default {

  components: {galleryPlayer, PlayIcon, reelPlayer},

  data() {
    return {
      item: [],
      posts: [],
      error: false,
      title: 'The Platform',
      galleryPlayer: false,
      reel: false,
      currentPlayer: null

    }
  },
  props: {

    ie: {}
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

      })

    },
    updated: function() {

//        let footer = document.querySelector('footer')
//
//        document.querySelector('header .router-link-active').classList.remove('white');
//        footer.classList.add('white');
//
//        setTimeout(function(){
//
//          skrollr.init({
//  //            forceHeight: false
//
//
//          });
//        }, 1000);

//      this.$nextTick(function () {
//        // Code that will run only after the
//        // entire view has been rendered
//      this.updateValue()
//
//      setTimeout(function(){
//        skrollr.init();
//
//
//      }, 1500);
//
//      })
    },
    mixins: [ inViewport ],
    watch: {
     'inViewport.now': function(visible, above) {

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
     },
      $route (to, from){
        this.show = false;
        location.reload()
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

    },


    methods: {

          initView: function(){

            var vm = this;

            console.log('mounting...')
            vm.$el.classList.add('loading')

            let footer = document.querySelector('footer')

            document.querySelector('header .router-link-active').classList.remove('white');
//            footer.classList.add('white');

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

            Velocity(el, {
              opacity: 1
            },{
              duration: 300,
              delay: 200
                });


          },
          reelLeave: function (el, done) {

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

          },
          closeReel() {

              this.reel = !this.reel;

          },
    }

}




</script>

<style lang="scss">

@import '../../src/scss/main.scss';
@import '../../src/scss/components/_child-service.scss';
@import '../../src/scss/components/videojs.scss';


</style>
