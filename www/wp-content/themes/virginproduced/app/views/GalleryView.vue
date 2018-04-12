<template v-if="item && item.acf.bg_video">
  <div :is993="is993" :mobile="mobile" :ie="ie">
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
             v-if="is993 === false">
            <video
                :id="item.id"
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

          <video
                 autoplay
                 loop
                 muted
                 id="main-roll"
                 class="transition-2"
                 :src="item.acf.bg_video"
                 data-anchor-target=".anchor"
                 data-bottom="left:40%"
                 data-center="left:0%"
                 preload="auto"
                 v-if="mobile === false"
                 >
          </video>
          <video
                 autoplay
                 loop
                 muted
                 playsinline
                 id="main-roll"
                 class="transition-2"
                 :src="item.acf.bg_video_mobile"
                 data-anchor-target=".anchor"
                 data-bottom="left:40%"
                 data-center="left:0%"
                 preload="none"
                 v-else
                 >
          </video>



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

                 >
                  <div>
                  </div>
            </div>
          <div class="main post-content above-fold">

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
                <div class="col-xl-8 col-lg-9 col-sm-6">
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




            <div class="container">


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
                <div class="col-xl-11 col-lg-12 p-xs-0">

                  <h2
                      class="gotham glitching"
                      title="The Goods"
                      data-bottom-top="transform: scaleY(0);"
                      data-center="transform: scaleY(1);"
                      v-if="is993 === false"
                      >The Goods</h2>

                  <div class="row">

                        <div class="col-sm-6 item"
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



export default {

  components: {galleryPlayer, PlayIcon, reelPlayer, Play},
  props: {

      ie: {},
      mobile: {},
      is993: {},
  },
  data() {
    return {
      item: [],
      posts: [],
      error: false,
      galleryPlayer: false,
      reel: false,
      currentPlayer: null,
      title: ''


    }
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
//        this.show = false;
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
      let footer = document.querySelector('footer')

      footer.classList.remove('white');
      skrollr.init().destroy();

    },


    methods: {

          initView: function(){

            var vm = this;
            if(this.is993 === false){

            console.log('mounting...')
//            vm.$el.classList.add('loading')

            let footer = document.querySelector('footer')

            document.querySelector('header .router-link-active').classList.remove('white');
            footer.classList.add('white');

            document.querySelector('body').style.overflow="hidden";
            if(vm.$el){

            setTimeout(function(){
            vm.$el.classList.add('loaded')


            return { x: 0, y: 0 };



            }, 2000);

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

            if(this.is993 === false){

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
@import '../../src/scss/components/_gallery.scss';
@import '../../src/scss/components/videojs.scss';


</style>
