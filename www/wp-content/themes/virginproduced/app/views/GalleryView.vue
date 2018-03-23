<template>
<transition
  appear
  appear-class="custom-appear-class"
  appear-to-class="custom-appear-to-class" (2.1.8+)
  appear-active-class="custom-appear-active-class"
>
  <div>

          <!-- 404 -->
    <div class="container main" v-if="error">
      <div class="row">
        <div class="col-12">
          <h1 class="glitching" title="Pardon the disruption">Pardon the disruption</h1>
        </div>
      </div>
    </div>

    <div class="gallery-vue"  v-if="item.content">


        <video autoplay loop
               id="main-roll"
               :src="item.acf.main_roll"
               data-start="left:40%"
               data-500-end="left:0%">
        </video>

              <figure class="gallery-title"

                      >
                <header class="float-title"
                     data-center-center="transform:translate3d(0%,0%,0) rotate(-45deg)"
                 data-top-bottom="transform:translate3d(50%,-50%,0) rotate(-45deg)"

                        >
                <h1 :title="item.title.rendered">{{ item.title.rendered }}</h1>
                </header>
              </figure>

            <div
                class="crop-bg"
                 data-start="transform:translate3d(0%,0%,0)"
                 data-end="transform:translate3d(-100%,0%,0)"
                v-in-viewport>
                  <div>
                  </div>
            </div>
          <div class="main post-content">




            <div class="container">

            <vue-headful
                :title="item.title.rendered"
                description="Virgin Produced"
            />

              <div class="row">
                <div class="col-sm-7">
                  <h1 class="rellax" data-rellax-speed="2" v-html="item.acf.headline"></h1>
                </div>
              </div>
              <div class="row">
                <div class="col-sm-5">


                          <div v-html="item.acf.content" data-start="opacity: 1" data-end="opacity: 0"></div>


                </div>


              </div>



              <!--<div class="Row">
                <div class="ColumnSeventy">
                  <article class="PageSingle">
                    <figure class="BlogPostSingle__images rellax" data-rellax-speed="2" v-if="item.better_featured_image">
                      <img :src="item.better_featured_image.source_url">

                    </figure>


                    <header class="BlogPostSingle__header">



                      <div class="row" v-if="acfWorks">
                        <div class="col-sm-4" v-for="work in acfWorks">

                        <video :id="work.id"
                               class="video-js vjs-big-play-centered"
                                controls
                                :poster="work.acf.poster"
                                data-setup="{}">


                             <source :src="work.acf.video" type="video/mp4" >


                        </video>

                        <div class="over"><p>{{ work.post_title }}</p></div>
                        </div>
                      </div>

                    </header>
                    <aside class="BlogPostSingle__content">
                    </aside>
                  </article>
                </div>
              </div>-->
            </div>

          </div>
            <div class="video-hover" v-on:click="hoverVideo" data-center-center="transform:rotate(0deg)" data-top-bottom="transform: rotate(37deg)">
                  <video :id="item.id"
                         class=""
                          controls
                          autoplay
                          loop
                          muted
                         >
                       <source :src="item.acf.main_roll" type="video/mp4" >


                  </video>
            </div>
        </div>
    </div>
  </transition>
</template>

<script>




//import videojs from "video.js" ;
import GalleryService from '../services/GalleryService'
let videojs = require('video.js');
import inViewportDirective from 'vue-in-viewport-directive'
import inViewport from 'vue-in-viewport-mixin'

export default {

  data() {
    return {
      item: {},
      posts: [],
      error: false,
      title: 'The Platform'
//      samples: [this.acfwork]
//      nestedAcf: [],
    }
  },
    created() {
      const slug = this.$route.params.slug;
      this.$store.dispatch('FETCH_PAGE', slug);
      this.fetchItem()
//      playerReadied()

    },

    mounted: function(){

      let footer = document.querySelector('footer');
      footer.classList.add('disabled');

    },
    updated: function() {
        let footer = document.querySelector('footer')

        document.querySelector('header .router-link-active').classList.remove('white');
        footer.classList.add('disabled');
        skrollr.init({
//            forceHeight: false


        });
    },
    mixins: [ inViewport ],
    watch: {
     'inViewport.now': function(visible) {
       if(visible){
          document.querySelector('header .router-link-active').classList.remove('white');

//          console.log('BG is visible')
       } else {
          document.querySelector('header .router-link-active').classList.add('white');
//          console.log('BG is outside of the viewport')
       }
     },
    },
    computed: {
    slug() { return this.$route.params.slug },
    pageContent() { return this.$store.state.pages[this.slug] },
    acf() {
//      if(this.acf != false) {

      return this.item.acf || { test: 'poop' }

//      }

    },

    acfWorks() {
//      if(this.acf != false) {
      return this.acf.work_samples.splice(0, 5) || {
          test: 'poo'
      }
//      }
    },
    limitedPosts() {
      return this.posts.splice(0, 5)
    },

    },
    beforeDestroy: function(){

      footer.classList.remove('disabled');
      skrollr.init().destroy();

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
        // listen event
        onPlayerPlay(player) {
           console.log('player play!', player)
        },
        onPlayerPause(player) {
           console.log('player pause!', player)
        },
        // ...player event

        // or listen state event
        playerStateChanged(playerCurrentState) {
           console.log('player current update state', playerCurrentState)
        },

        // player is ready
        playerReadied(player) {
          console.log('the player is readied', player)
          // you can use it to do something...
          // player.[methods]
        },

        fetchItem(slug) {
          const paramSlug = this.$route.fullPath.replace('/content-services/','') || '';
          const pageSlug = slug || paramSlug

          return GalleryService.get(pageSlug)
            .then(result => {
              this.item = result.data[0]
                console.log(result.data[0])

    //            this.$nextTick(function() {
    //              this.fetchNestedAcf();
    //            });
            })
            .catch(err => {
              this.error = true
            })
        },


          hoverVideo() {


            console.log('clicked the hover video');
            document.querySelector('.video-hover').classList.add('focus');

          }


  }

}




</script>

<style lang="stylus" scoped>

/**
 * 404
 */
.Jumbotron
  padding: 1em 0
  margin-bottom: 1.5em
  background: #fff
  border-bottom: 1px solid #ccc

h3
  padding: 1em 0
  margin: 0 auto

/**
 * Main
 */
.fade-enter-active
  transition: opacity 0.5s

.fade-leave-active
  @extend .fade-enter-active

.fade-enter
  opacity: 0

.fade-leave
  @extend .fade-enter

.Row

  padding: 5rem 0 0;
  margin: 50vh 0;


#main-roll
  width: 100vw;
  height: auto;

.video-input

    clip: polygon(20% 100%, 75% 0, 100% 0, 100% 100%);
    clip-path: polygon(20% 100%, 75% 0, 100% 0, 100% 100%);
    width: 100vw;
    height: 100vh;
    position: fixed;
    bottom: 0;
    top: 0;

.video-hover {
    position: absolute;
    z-index: 2;
    width: 80%;
    top: 30%;
    left: 33%;
    clip-path: polygon(62% 0, 25% 0, 25% 60%);
    height: 85%;
}
.video-hover.modal-player {
    clip-path: polygon(0% 0, 100% 0, 100% 100%, 0% 100%);
    position: fixed;
    z-index: 100000;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: block;
}
@media only screen and (max-width: 640px)
  .PageSingle
    margin: 1em 0

</style>
