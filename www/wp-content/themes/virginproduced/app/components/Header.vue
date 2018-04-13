<template>
  <div class="nav-container" :is993="is993" :mobile="mobile">
    <!-- Mobile Nav Wrap -->
  <div v-if="mobile === false || is993 === false">
  <div v-if="this.$parent.src">
      <video
          :src="this.$parent.src"
          :videotime="videotime"
          class="video-bg"
          preload="auto"
          autoplay
          loop
          muted
          v-if="navigation">
      </video>
  </div>
    <div v-else>
      <video
          src="/wp-content/themes/virginproduced/src/img/virgin-glitched.mp4"
          :videotime="videotime"
          class="video-bg"
          preload="auto"
          autoplay
          loop
          muted
          v-if="navigation">
      </video>
    </div>
  </div>
  <transition
    v-on:before-enter="beforeEnter"
    v-on:enter="enter"
    v-on:leave="leave"
    v-bind:css="false"
  >
      <div class="full-nav" v-if="navigation && is993 === false">
        <div class="container">
          <div class="menu-transition">
          <div class="row">
            <div class="col-sm-6">
              <MainNav
                       @togglenav="toggleNavigation"
                       :pages="this.$parent.items.items"
                       ></MainNav>
              <SocialLinks></SocialLinks>
              <div class="address">
                <p class="name">Virgin Produced</p>
                <p>12575 Beatrice</p>
                <p>Playa Vista, CA 90066</p>
              </div>
            </div>
            <div class="col-sm-6 offerings">
              <p>Offerings</p>
              <OfferingsMenu
                             @togglenav="toggleNavigation"
                             :pages="this.$parent.offerings.items"
                             ></OfferingsMenu>
            </div>
          </div>
          </div>
        </div>
      </div>
    </transition>
    <header class="nav-bar" :class="{ 'bg-white-90': !navigation }">
          <router-link to="/" :class="{ 'white': navigation, primary: !navigation }" @click.native="closeNav">
            <Logo></Logo>
          </router-link>
            <a @click="toggleNavigation" class="toggle" v-if="is993 === false">
                <span v-if="!navigation">
                  <MenuIcon></MenuIcon>
                  </span>
                <span class="">
                  <CloseIcon></CloseIcon>
                </span>
              </a>
    </header>
  </div>
</template>
<script>
import { orderBy } from 'lodash'
//import MenuService from '../services/MenuService'
//import OfferingsMenuService from '../services/OfferingsMenuService'
//import GlobalService from '../services/GlobalService'
import Search from './Search.vue'
import MainNav from './MainNav.vue'
import Logo from './Logo.vue'
import MenuIcon from './MenuIcon.vue'
import CloseIcon from './CloseIcon.vue'
import OfferingsMenu from './OfferingsMenu.vue'
import SocialLinks from './SocialLinks.vue'
export default {
  components: { MainNav, OfferingsMenu, SocialLinks, Logo, MenuIcon, CloseIcon },
  data() {
    return {
//      items: [],
//      infoData: [],
      navigation: false,
      target: null,
    }
  },
  props: {
    src: {},
    videotime: {},
    is993: {},
    mobile: {}
  },
  watch: {
  },
  created() {
//    this.fetchItems()
//    this.fetchInfoData()
  },
  computed: {
  },
  updated: function () {

      objectFitImages()
      objectFitVideos()
  },
  mounted: function(){
      objectFitImages()
      objectFitVideos()

  },
  methods: {
//    fetchItems() {
//      return MenuService.getAll()
//        .then(result => {
//          this.items = result.data
//        })
//    },
//    updateValue: function () {
////      alert('event')
//    },
    toggleNavigation() {
      var isFirefox = typeof InstallTrigger !== 'undefined';
      var isChrome = !!window.chrome && !!window.chrome.webstore;
      console.log('eat me')
      this.navigation = !this.navigation;
      if(this.navigation && (isFirefox || isChrome)){
      var video = document.getElementById('main-roll');
      this.$emit('videotime', {
      videotime : video.currentTime
      })
      var time = video.currentTime
      setTimeout(function(){
      var headerVideo = document.querySelector('.video-bg');
      headerVideo.currentTime=time
      }, 50);
      }
    },
    getVideotime() {
//    this.$on('videotime', (payload) => {
////      console.log(payload.src);
////
////      return payload.src;
//      this.videotime = payload.videotime
//    });
    },
    closeNav() {
      if(this.navigation = true){
      this.navigation = !this.navigation;
      }
    },
    beforeEnter: function (el) {
      el.style.opacity = 0
    },
    enter: function (el, done) {
      Velocity(el, { opacity: .85 }, { duration: 300 });
        var toggle = document.querySelector('.toggle');
        var menu = document.querySelector('.menu-transition');
      Velocity(menu, {
          opacity: 1,
          scale: 1
        },{
          delay: 750
        });
        setTimeout(function(){
        toggle.classList.add('active');
      }, 150);
    },
    leave: function (el, done) {
      Velocity(el, {
        opacity: 0
      }, {
        duration: 200
      });
      var toggle = document.querySelector('.toggle');
      setTimeout(function(){
        toggle.classList.remove('active');
      }, 0);
      Velocity(el, {
        display: 'none'
      }, { complete: done })
    }
  }
}
</script>
<style lang="scss">
@import '../../src/scss/main.scss';
@import '../../src/scss/layout/_header.scss';
</style>
