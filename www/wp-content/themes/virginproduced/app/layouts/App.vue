<template>
  <div class="">
    <header-bar
                v-on:update="onElementChange()"
                :src="elementChange()"
                :is993="is993"
                :mobile="mobile"
                :desktop="desktop"
                :tablet="tablet"
                :landscape="landscape"></header-bar>
    <section
             class="MainSection">
        <router-view
                     class="view"
                     :items="items"
                     :offerings="offerings"
                     :ie="ie"
                     :is993="is993"
                     :mobile="mobile"
                     :landscape="landscape"
                     :desktop="desktop"
                     :tablet="tablet"></router-view>
      <vue-progress-bar></vue-progress-bar>
      <footer-bar
                  :ie="ie"
                  :is993="is993"
                  :mobile="mobile"
                  v-if="is993 === true"
                  :desktop="desktop"
                  :landscape="landscape"></footer-bar>
    </section>
    <footer-bar
                :ie="ie"
                :is993="is993"
                :mobile="mobile"
                :desktop="desktop"
                v-if="is993 === false"></footer-bar>
    <mobileBar
               v-if="is993 === true"
               v-on:update="getcontextualMenuUpdate()"
               :is993="is993"
               :mobile="mobile"
               :desktop="desktop"
               :tablet="tablet"
               :contextual_menu="contextual_menu" :contextual_menu_links="contextual_menu_links"
               :title="title"></mobileBar>
  </div>
</template>
<script>
import { orderBy } from 'lodash'
import HeaderBar from '../components/Header.vue'
import mobileBar from '../components/MobileBar.vue'
import FooterBar from '../components/Footer.vue'
import VueProgressBar from 'vue-progressbar'
import OfferingsMenuService from '../services/OfferingsMenuService'
//import SocialLinks from './SocialLinks.vue'
import MenuService from '../services/MenuService'
import videojs from 'video.js'
import objectfitvideos from 'object-fit-videos';



export default {
  data() {
    return {
            items: [],
            offerings: [],
            src: "/wp-content/themes/virginproduced/src/img/virgin-glitched.mp4",
            ie: null,
            is993: false,
            contextual_menu: '',
            contextual_menu_links: '',
            mobile: false,
            tablet: false,
            desktop: false,
            title: '',
            landscape: false
    }
  },
  props: {
//    first: true
  },
  components: { HeaderBar, FooterBar, mobileBar },
//    updated: function () {
////        var vm = this;
//        this.$on('update', () => {
//
//          console.log('hi');
//
//        })
//    },
  mounted () {
    //  [App.vue specific] When App.vue is finish loading finish the progress bar
//    setTimeout(function(){
      this.$Progress.finish()
      this.isIE()
      this.islower993()
      this.getcontextualMenuUpdate()
      this.getcontextualLinks()
      this.getTitle()
      this.isMobile()
      this.isiPad()
      this.isLandscape()
      this.isDesktop()
      objectFitImages()
      objectFitVideos()
    //      this.firstTime()
      if (window.navigator.standalone == true) {
        document.querySelector('html').classList.add('app-mode')
      }
//    this.$on('reelPlay', (payload) => {
////      console.log(payload.src);
////
////      return payload.src;
////      this.src = payload.src
//          setTimeout(function(){
//          const getID = document.querySelector('#reel-player .video-js').id;
//          var player = videojs(getID);
//          player.play();
//          player.requestFullscreen();
//          }, 1000);
//    });
//    }, 1000);
  },
  updated () {
      this.getcontextualMenuUpdate()
      this.getcontextualLinks()
      this.getTitle()
      objectFitImages()
      objectFitVideos()
  },
  watch: {
//      $route (to, from){
//
//        if(this.mobile === true){
//
//        this.show = false;
//        location.reload()
//
//        }
//
//    }
  },
  computed: {
//    orderedPages() {
//      return orderBy(this.items.items, 'order')
//    }
  },
  created () {
    //  [App.vue specific] When App.vue is first loaded start the progress bar
    this.getLinks()
    this.getOfferings()
    this.$Progress.start()
    //  hook the progress bar to start before we move router-view
    this.$router.beforeEach((to, from, next) => {
      //  does the page we want to go to have a meta.progress object
      if (to.meta.progress !== undefined) {
        let meta = to.meta.progress
        // parse meta tags
        this.$Progress.parseMeta(meta)
      }
      //  start the progress bar
      this.$Progress.start()
      //  continue to next page
      next()
    })
    //  hook the progress bar to finish after we've finished moving router-view
    this.$router.afterEach((to, from) => {
      //  finish the progress bar
      this.$Progress.finish()
    })
//    this.$on('broll', (payload) => {
////        alert(payload.src)
//
//    });
  },
  methods: {
    getcontextualMenuUpdate() {
    this.$on('contextual_menu', (payload) => {
//      console.log(payload.src);
//
      this.contextual_menu = payload.contextual_menu
    });
      // payload is what you want here
    },
    getcontextualLinks() {
    this.$on('contextual_menu_links', (payload) => {
//      console.log(payload.src);
//
      this.contextual_menu_links = payload.contextual_menu_links
    });
      // payload is what you want here
    },
    getTitle() {
    this.$on('title', (payload) => {
//      console.log(payload.src);
//
      this.title = payload.title
    });
      // payload is what you want here
    },
    isIE() {
    if (document.documentMode || /Edge/.test(navigator.userAgent)) {
    this.ie = true
    }
    },
    isMobile() {

    var md = new MobileDetect(window.navigator.userAgent);

    if (md.phone() != null) {

    this.mobile = true
    }
    },
    isiPad() {

    var md = new MobileDetect(window.navigator.userAgent);


    if (md.tablet() != null) {
    this.tablet = true
    }
    },
    isDesktop() {

    var md = new MobileDetect(window.navigator.userAgent);


    if (md.tablet() == null && md.phone() == null) {
    this.desktop = true
    }
    },
    isLandscape() {
      var vm = this;

      if(window.innerHeight < window.innerWidth){
      if(vm.mobile === true) {
      vm.landscape = true
      } else {
      vm.landscape = false
      }
    }
    window.addEventListener('orientationchange', function(){
      if(vm.landscape === false) {
      vm.landscape = true
      } else {
      vm.landscape = false
      }
    })
    },
    islower993(){
    var width = document.body.clientWidth
    var vm = this;
    if (width < 993) {
      vm.is993 = true
      } else {
      vm.is993 = false
      }
      window.addEventListener('resize', function(){
      console.log('resize event')
        // do stuff here
      var width = document.body.clientWidth
      if (width < 993) {
      vm.is993 = true
      } else {
      vm.is993 = false
      }
    })
      window.addEventListener('orientationchange', function(){
      console.log('orientationchange event')
        // do stuff here\

      setTimeout(function(){
      var width = document.body.clientWidth
      if (width < 993) {
      vm.is993 = true
      } else {
      vm.is993 = false
      }
      }, 300);


    })
//    window.addEventListener('orientationchange', function(){
//      var width = window.outerWidth;
//      if (width < 993) {
//      vm.is993 = true
//      } else {
//      vm.is993 = false
//      }
//    })
    },
    elementChange() {
    this.$on('broll', (payload) => {
//      console.log(payload.src);
//
//      return payload.src;
      this.src = payload.src
    });
      // payload is what you want here
    },
    updateFirst() {
    this.$on('first', (payload) => {
//      console.log(payload.src);
//
//      return payload.src;
      this.first = payload.first
    });
      // payload is what you want here
    },
    getLinks() {
      return MenuService.getAll()
        .then(result => {
          this.items = result.data
        })
    },
    getOfferings() {
      return OfferingsMenuService.getAll()
        .then(result => {
          this.offerings = result.data
        })
    },
  }
}
</script>
<style lang="scss">
  .MainSection {
    min-height: 100vh;
  }
  @media(min-width:993px){
  #app {
    min-height: 100vh;
    position: relative;
  }
  }
  @media(max-width:993px){
  .view {
    min-height: 100vh;
  }
  }

  object-fit {

    opacity: 1 !important;
  }
</style>
