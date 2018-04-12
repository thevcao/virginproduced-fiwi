
<template>
  <div class="mobile-bar-container" :mobile="mobile" :is993="is993" :contextual_menu="contextual_menu" :contextual_menu_links="contextual_menu_links">
    <!-- Mobile Nav Wrap -->
  <transition
    v-on:before-enter="beforeEnter"
    v-on:enter="enter"
    v-on:leave="leave"
    v-bind:css="false"
  >

      <div class="mobile-nav" v-if="navigation">

        <div class="container">

          <div class="menu-transition">

          <div class="row">
            <div class="col-sm-8">

              <MainNav
                       @togglenav="toggleNavigation"
                       :mobile="mobile"
                       :pages="this.$parent.items.items"
                       ></MainNav>

            </div>
            <div class="col-sm-8 offerings">
              <p>Offerings</p>
              <OfferingsMenu
                             @togglenav="toggleNavigation"
                             :mobile="mobile"
                             :pages="this.$parent.offerings.items"
                             ></OfferingsMenu>



            </div>
              <SocialLinks></SocialLinks>

          </div>
          </div>



        </div>
      </div>
    </transition>

    <div class="mobile-bar" :class="{ 'bg-white-90': !navigation }">

            <a href="#"
               @click="toggleContextmenu"
               @click.prevent
               v-if="this.$parent.contextual_menu"
               class="context-toggle">{{ this.$parent.contextual_menu }}
              <i class="fa fa-caret-up" v-if="this.$parent.contextual_menu"></i>
            </a>
            <a href="#"
               @click.prevent
               v-else
               class="context-toggle"
               v-html="getTitle()">
            </a>
            <a href="#"
               @click="toggleContextmenu"
               @click.prevent

               v-if="main === 'our-suits'"
               class="context-toggle">Our Suits
              <i class="fa fa-caret-up"></i>
            </a>


            <a @click="toggleNavigation" @click.prevent class="toggle">
                <span v-if="!navigation">
                  <MenuIcon></MenuIcon>
                  </span>
                <span class="">
                  <CloseIcon></CloseIcon>
                </span>
              </a>

    </div>


    <div
         v-if="this.$parent.contextual_menu_links"
         class="contextual-menu">


      <ul>
        <li v-for="item in this.$parent.contextual_menu_links">
          <a :href="item.link" v-if="item.link_type === 'internal'" @click.native="toggleContextmenu">{{ item.text }}</a>
          <a :href="item.custom" v-else @click="toggleContextmenu">{{ item.text }}</a>

        </li>
      </ul>

    </div>
    <div
         v-else="main === 'our-suits'"
         class="contextual-menu">


      <ul>
        <li v-for="item in posts" v-bind:key="item.slug" v-if="item.better_featured_image">
          <router-link :to="{name: 'suits', params: { slug: item.slug } }" @click.native="toggleContextmenu">{{ item.title.rendered }}</router-link>

        </li>
        <li v-else>
          <a @click.prevent>{{ item.title.rendered }}</a>

        </li>
      </ul>

    </div>
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
import SuitsArchiveService from '../services/SuitsArchiveService'

export default {

  components: { MainNav, OfferingsMenu, SocialLinks, CloseIcon, MenuIcon, Logo },


  data() {
    return {
//      items: [],
//      infoData: [],
      navigation: false,
      target: null,
      posts: []
    }
  },
  props: {

    src: {},
    videotime: {},
    is993: {},
    contextual_menu: {},
    contextual_menu_links: {},
    mobile: {},
    title: {}
  },
  watch: {


  },
  created() {
//    this.fetchItems()
//    this.fetchInfoData()
      this.fetchPosts();

  },

  computed: {
      main(){
          return this.$route.path === '/'
      }

  },
  updated: function () {





  },
  mounted: function () {



      if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {

        function hasClass(element, className) {
            return element.className && new RegExp("(^|\\s)" + className + "(\\s|$)").test(element.className);
        }


        const viewportInitial = window.innerHeight;
        console.log('viewport:' + viewportInitial)
        const screenSize = screen.height;

        console.log('screen:' + screenSize)


        window.addEventListener('resize', function(){

        var viewportScroll = window.innerHeight;
        console.log('viewport full UI:' + viewportInitial)
        console.log('viewport updated:' + viewportScroll)


          var bar = document.querySelector('.mobile-bar');
          if(viewportInitial < viewportScroll) {


          bar.classList.add('down')

          } else {


          bar.classList.remove('down')

          }


        })
        }


      this.$nextTick(function () {


        setTimeout(function(){


        var menu = document.querySelector('.contextual-menu ul').getElementsByTagName("li");
        var menuHeight = menu.length;


          console.log(menuHeight);

        if(menuHeight > 5) {



          document.querySelector('.contextual-menu').classList.add('has-overflow');
        }



        }, 2000);




      })





  },
  methods: {

   click (e) {
     e.preventDefault();
    },
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

      if(this.navigation) {


        var header = document.querySelector('.nav-bar');

        header.classList.add('menu-open');

      } else {

        var header = document.querySelector('.nav-bar');

        header.classList.remove('menu-open');

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

      var header = document.querySelector('.nav-bar');
      this.navigation = !this.navigation;
      header.classList.remove('menu-open');
      }


    },

    beforeEnter: function (el) {
      el.style.opacity = 0
    },
    enter: function (el, done) {
      Velocity(el, { opacity: 1 }, { duration: 300 });

        var toggle = document.querySelector('.mobile-bar .toggle');
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

      var toggle = document.querySelector('.mobile-bar .toggle');



      setTimeout(function(){
        toggle.classList.remove('active');
      }, 0);

      Velocity(el, {
        display: 'none'
      }, { complete: done })
    },
    toggleContextmenu() {


      function hasClass(element, className) {
          return element.className && new RegExp("(^|\\s)" + className + "(\\s|$)").test(element.className);
      }


      var menu = document.querySelector('.contextual-menu');
      var button = document.querySelector('.context-toggle');
      var text = this.contextual_menu;

      if(hasClass(button, 'toggled')){

      menu.classList.remove('open');

      if(this.contextual_menu == ''){

      button.innerHTML='Our Suits <i class="fa fa-caret-up"></i>';

      } else {

      button.innerHTML=text + ' <i class="fa fa-caret-up"></i>';


      }
      button.classList.remove("toggled");

      } else {

      menu.classList.add('open');
      button.innerHTML="<i class='fa fa-caret-left'></i> Back";
      button.classList.add("toggled");

      }






    },

    fetchPosts() {
      return SuitsArchiveService.getAll()
        .then(result => {
          this.posts = result.data
        })
    },

    getSuits() {

    },
    getTitle(){

      return this.title

    }
  }

}

</script>

<style lang="scss">
@import '../../src/scss/main.scss';
@import '../../src/scss/layout/_mobilebar.scss';
</style>
