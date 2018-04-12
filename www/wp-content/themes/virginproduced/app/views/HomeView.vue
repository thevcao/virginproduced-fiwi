<template>


    <div class="home-vue loading" :ie="ie" :is993="is993" :mobile="mobile">
      <vue-headful
          title="Home"
          description="Virgin Produced"
      />

      <transition
      v-on:before-enter="introEnter"
      v-on:enter="introIn"
      v-on:leave="introLeave"
      v-bind:css="false"
      >
       <Intro v-if="first === true && is993 === false" :first=first @closeIntro="closeIntro"></Intro>



      </transition>
      <div v-if="first === true && is993 === false" class="notice">
      <video src="/wp-content/themes/virginproduced/src/img/404.mp4" autoplay muted loop preload="auto" class="video-404"></video>
       <h3 class="glitching" title="Disclaimer Sound will Play Shortly">Disclaimer Sound will Play Shortly <VolumeIcon></VolumeIcon></h3>
      </div>

    <div class="main">
      <div class="lines">
        <div class="hero-text">
          <h1>Creative<br>Collaborative<br>Provocative<br>Disruptive</h1>
          <p><a
                                        href="#"
                                        v-on:click="videoPlay()"
                                        v-if="is993 === true"
                                        >
                                                <PlayIconMobile></PlayIconMobile>
                                       </a>This is Virgin Produced
                                      </p>
       </div>
      </div>

      <a
         href="#"
         class="play-toggle"
         v-on:click="videoPlay()"
         v-if="is993 === false"
         >
        <PlayIcon></PlayIcon>
      </a>

      <transition
      v-on:before-enter="beforeEnter"
      v-on:enter="enter"
      v-on:leave="leave"
      v-bind:css="false"
      >
      <Player
              v-if="player && item && item.acf"
              :src = "item.acf.main_reel"
              :mobile="mobile"
              @closeModal="closeModal">
      </Player>
      </transition>

      <div v-if="item && item.acf">
      <video
             autoplay
             loop
             muted
             playsinline
             preload="auto"
             class="main-video"
             id="main-roll"
             v-if="mobile === false"
             :src="item.acf.bg_video">
      </video>
      <video
             autoplay
             loop
             muted
             playsinline
             preload="auto"
             class="main-video"
             id="main-roll"
             v-else
             :src="item.acf.bg_video_mobile">
      </video>


      </div>


      <div class="crop-bg"><div></div></div>

      <div class="float-video ie" v-if="ie">


      </div>
      <div class="float-video" v-if="!ie && is993 === false">
        <video
             autoplay
             loop
             muted
             preload="auto"
             v-if="item && item.acf"
             :src="item.acf.bg_video">
      </video>


      </div>



      <div class="home-menu">

        <ul
            class=""
            v-if="!offerings">
          <li>
            <a
               href="#"
               v-on:click="submenu()"
               title="Offerings">Offerings</a></li>
          <li
              v-for="page in orderedPages"
              v-bind:key="page.url"
              class="pa2 f3 f1-ns"
              v-if="page.target">
            <a
               :href="page.url"
               class="white ttu"
               :title="page.title">{{ page.title }}</a>
          </li>
          <li
              v-bind:key="page.url"
              class=""
              v-else>
            <router-link
                         :to="page.url"
                         @click.native="toggleNavigation"
                         :title="page.title"
                         class="white ttu">{{ page.title }}</router-link>
          </li>
        </ul>

        <div class="home-offerings">
          <a
             href="#"
             v-on:click="submenu()"
             class="toggle">
            <i class="fa fa-caret-left" v-if="offerings"></i>
          </a>
           <OfferingsMenu
                          :pages="this.$parent.offerings.items"
                          v-if="offerings"> </OfferingsMenu>
        </div>

      </div>
    </div>
    </div>

</template>

<script>
import { orderBy } from 'lodash'
import HomeService from '../services/HomeService'
import MediaService from '../services/MediaService'
import PlayIcon from '../components/Play.vue'
import PlayIconMobile from '../components/PlayIcon.vue'
import VolumeIcon from '../components/VolumeIcon.vue'
import Player from '../components/home-player.vue'
import { mapGetters, mapActions } from 'vuex'
import HomeMenuService from '../services/HomeMenuService'
import GlobalService from '../services/GlobalService'
import OfferingsMenu from '../components/OfferingsMenu.vue'
import Intro from '../views/Intro.vue'
import Blank from '../views/Blank.vue'
import inViewportDirective from 'vue-in-viewport-directive'
import videojs from 'video.js'
const Post = () => import(
  /* webpackChunkName: "below-fold" */ '../components/Post.vue'
);

export default {

  components: { Post, OfferingsMenu, PlayIcon, Player, Intro, PlayIconMobile, VolumeIcon },

  data() {
    return {
      item: {},
      items: [],
      offerings: false,
      backgroundImage: '',
      player: false,
      first: {}


    }
  },
  props: {

    ie: {},
    is993: {},
    mobile: {}
  },

  created() {

    const slug = 'home';
    this.$store.dispatch('FETCH_PAGE', slug);

    this.fetchItems()
    this.fetchItem()

//      .then(([noop, image]) => {
//        this.backgroundImage = image.data[0].source_url
//        this.isLoading = false
//      })

//      this.updateValue()

  },
  mounted() {

    var firstVisit = this.$cookie.get('first');

    if(firstVisit === 'false' || firstVisit === null) {

    console.log('This is a first visit')
    this.first = true

    } else {
    console.log('Been there done that')

    this.first = false


    }
    this.$nextTick(function () {


      this.initiView();

    })

  },
  beforeDestroy: function(){

    document.querySelector('footer').style.display=''

    var firstVisit = this.$cookie.get('first');

    if(firstVisit == undefined){

    console.log('setting cookie for first visit complete')

    this.$cookie.set('first', 'false', 1);


    }
    if(this.is993 === true) {

    document.querySelector('body').style.position='initial'
    document.querySelector('body').style.width='auto'




    }
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
    },
    contextualMenu() {

      return this.item.acf.contextual_menu || { test: 'poop' }



    },
  },
    updated: function(){

    this.$nextTick(function () {

//        this.updateValue()
    })

    },
  methods: {

    initiView: function () {

      var vm = this;

      setTimeout(function(){
      vm.$el.classList.add('loaded')


      }, 1000);
      setTimeout(function(){
      vm.$el.classList.remove('loading')
      vm.$el.classList.remove('loaded')


      }, 4000);

      document.querySelector('#footer').style.display='none'
  //    document.querySelector('.toggle').classList.remove('footer-in-view');

      if(this.is993 === true || this.mobile === true) {

      document.querySelector('body').style.position='fixed'
      document.querySelector('body').style.width='100%'
      if (window.navigator.standalone == true) {

      var heroHeight = window.innerHeight - 80 + 'px'

      } else {

      var heroHeight = window.innerHeight - 65 + 'px'

      }

      document.querySelector('.main').style.height=heroHeight






      }
      if(this.mobile === false && this.is993 === true){

      window.addEventListener('resize', function(){
      if (window.navigator.standalone == true) {

      var heroHeight = window.innerHeight - 80 + 'px'

      } else {

      var heroHeight = window.innerHeight - 65 + 'px'

      }
      console.log('redraw main...from home?')
      document.querySelector('.main').style.height=heroHeight


      })

      } else {

//      document.querySelector('.main').style.height=''


      }
    },
    closeIntro(){

      this.first=false
    },
    fetchItems() {
      return HomeMenuService.getAll()
        .then(result => {
          this.items = result.data
        })
    },
    fetchItem(slug) {
      const paramSlug = this.$route.fullPath.replace('/','').replace('/','') || '';
      const pageSlug = slug || paramSlug

      return HomeService.get(pageSlug)
        .then(result => {
          this.item = result.data[0]
            console.log(result.data[0])

//            this.$nextTick(function() {
//              this.fetchNestedAcf();
//            });
        }).then(result => {

        this.$parent.$emit('broll', {
        src : this.item.acf.bg_video
        })
        console.log(this.item.acf.bg_video);

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
    submenu(){

      this.offerings = !this.offerings;


    },
    firstTime() {
      // check if users visited your page, you can use cookie
//      if (this.first != false){

//        this.first = false
//        console.log('setting first to false?')


//      }
    },

    onupdateFirst() {


    },
    videoPlay(){

      this.player = !this.player;


      var home = document.querySelector('.home-vue .main');
      var playerWidth = document.querySelector('.home-vue').offsetWidth;
      var el = document.querySelector('html');

      var style = window.getComputedStyle(el, null).getPropertyValue('font-size');
      var fontSize = parseFloat(style);

      var width = playerWidth - (4 * fontSize);

      var crop = document.querySelector('#app .home-vue .crop-bg');
      var lines = document.querySelector('#app .home-vue .lines');
      var header = document.querySelector('header');
      var homeMenu = document.querySelector('.home-menu');
      var toggle = document.querySelector('.play-toggle');
      var float = document.querySelector('.float-video');

      home.classList.add('video-play');
      header.style.pointerEvents="none";
      homeMenu.style.pointerEvents="none";

      if(window.innerWidth > 993) {
      toggle.style.pointerEvents="none";

      float.style.pointerEvents="none";
      Velocity(home, {
        marginLeft: '2rem',
        width: width,
      }, {
        duration: 500
      });
      Velocity(crop, {
        translateX: '50%',
        translateY: '50%',
      }, {
        duration: 750,
        delay: 500
      });
      Velocity(lines, {
        translateX: '-50%',
        translateY: '-50%',
      }, {
        duration: 750,
        delay: 500
      });
      Velocity(header, {
        opacity: 0,
      }, {
        duration: 500,
        delay: 0
      });
      Velocity(homeMenu, {
        opacity: 0,
      }, {
        duration: 500,
        delay: 0
      });
      Velocity(float, {
        opacity: 0,
      }, {
        duration: 500,
        delay: 0
      });
      Velocity(toggle, {
        opacity: 0,
      }, {
        duration: 500,
        delay: 0
      });

      }



      if(this.mobile === true ) {


          setTimeout(function(){
          const getID = document.querySelector('#home-modal .video-js').id;

          var player = videojs(getID);

          player.play();
          player.requestFullscreen();

          }, 1000);

       }

    },


    closeModal(){

      this.player = !this.player;

      var vjsPlayer = document.querySelector('#vjs_video_3');

      var home = document.querySelector('.home-vue .main');
      var playerWidth = document.querySelector('.home-vue').offsetWidth;
      var el = document.querySelector('html');

      var style = window.getComputedStyle(el, null).getPropertyValue('font-size');
      var fontSize = parseFloat(style);

      var width = playerWidth - (4 * fontSize);

      var crop = document.querySelector('#app .home-vue .crop-bg');
      var lines = document.querySelector('#app .home-vue .lines');
      var header = document.querySelector('header');
      var homeMenu = document.querySelector('.home-menu');
      var toggle = document.querySelector('.play-toggle');
      var float = document.querySelector('.float-video');

      home.classList.remove('video-play');
      header.style.pointerEvents="all";
      homeMenu.style.pointerEvents="all";
      Velocity(home, "reverse", {
        duration: 500
      });
      Velocity(crop, "reverse", {
        duration: 750,
        delay: 500
      });
      Velocity(lines, "reverse", {
        duration: 750,
        delay: 500
      });
      Velocity(header, "reverse", {
        duration: 500,
        delay: 750
      });
      Velocity(homeMenu, "reverse", {
        duration: 500,
        delay: 750
      });
      Velocity(toggle, "reverse", {
        duration: 500,
        delay: 750
      });


      if(window.innerWidth > 993) {

      toggle.style.pointerEvents="all";

      Velocity(float, "reverse", {
        duration: 500,
        delay: 750
      });

      }


    },

    beforeEnter: function (el) {
      el.style.opacity = 0
    },

    enter: function (el, done) {
      Velocity(el, {
        opacity: 1
      },{
        duration: 300,
        delay: 750
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
    introEnter: function (el) {
      el.style.opacity = 0
    },

    introIn: function (el, done) {
      Velocity(el, {
        opacity: 1
      },{
        duration: 300,
        delay: 7000
          }
      );
    },

    introLeave: function (el, done) {
      Velocity(el, {
        opacity: 0
      }, {
        duration: 500,
      });

      Velocity(el, {
        display: 'none'
      }, {
        complete: done,
        delay: 1000
      })
    },

    ...mapActions([
      'getAllPosts'
    ])
  }

}

</script>

<style lang="scss">

@import '../../src/scss/main.scss';
@import '../../src/scss/components/_home.scss';
@import '../../src/scss/components/videojs.scss';
.notice {
    background: white;
    position: fixed;
    z-index: 10000;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100vh;
    width: 100%;
    pointer-events: none;
    text-align: center;
    display: flex;
    align-items: center;

    h3 {
        width: 100%;
        flex: 1 0 100%;
        text-align: center;
    }
    video.video-404 {
        position: absolute;
        opacity: .05;
    }
  }
</style>
