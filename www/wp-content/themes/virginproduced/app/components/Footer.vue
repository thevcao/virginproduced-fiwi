<template>
  <footer id="footer" :ie="ie" :is993="is993" :mobile="mobile" :tablet="tablet" :desktop="desktop" :landscape="landscape" v-in-viewport>
    <div class="bg"><div></div></div>
      <div class="container max-margin ml-xl-0">
        <div class="row align-items-center">
          <div class="col-lg-6">
            <div class="row align-items-sm-center">
              <div class="col-sm-4" v-if="is993 === false">
                    <router-link to="/">
                        <Logo></Logo>
                    </router-link>
              </div>
              <div class="col-md-3 col-6" v-else>
                    <router-link to="/">
                      <Logo></Logo>
                    </router-link>
              </div>
              <div class="col-sm-8 address" v-if="is993 === false">
                <p class="name">Virgin Produced</p>
                <p>12575 Beatrice</p>
                <p>Playa Vista, CA 90066</p>
              </div>
              <div class="col-md-9 col-6 text-right" v-else>
                <div class="footer-menu">
                    <p>Offerings</p>
                    <OfferingsMenu
                                   :pages="this.$parent.offerings.items"
                                   ></OfferingsMenu>

                    <div class="main-nav" v-if="tablet === true && landscape === false">
                    <MainNav
                    :pages="this.$parent.items.items"
                    ></MainNav>


                    </div>


                  </div>
                    <div v-if="tablet === true && landscape === false">
                    <p>© Virgin Produced {{ new Date().getFullYear() }}.</p>
                    <SocialLinks></SocialLinks>

                  </div>

              </div>
              <div class="col-12" v-if="is993 === false">
                <p>© Virgin Produced {{ new Date().getFullYear() }}.</p>
                <SocialLinks></SocialLinks>
              </div>
              <div class="col-12 text-sm-left text-center address" v-else-if="desktop === true || (tablet === true && landscape === true) || mobile === true">
                <SocialLinks></SocialLinks>
                <p class="name">Virgin Produced</p>
                <p>12575 Beatrice</p>
                <p>Playa Vista, CA 90066</p>
              </div>
            </div>
          </div>
        <div class="col-lg-6" v-if="is993 === false">
          <div class="footer-menu">
              <p>Offerings</p>
              <OfferingsMenu
                             :pages="this.$parent.offerings.items"
                             ></OfferingsMenu>
            <div class="main-nav">
                <MainNav
                         :pages="this.$parent.items.items"
                         ></MainNav>
            </div>
            </div>
        </div>
      </div>
    </div>
  </footer>
</template>
<script>
import { orderBy } from 'lodash'
import OfferingsMenuService from '../services/OfferingsMenuService'
import GlobalService from '../services/GlobalService'
import inViewportDirective from 'vue-in-viewport-directive'
import inViewport from 'vue-in-viewport-mixin'
import OfferingsMenu from './OfferingsMenu.vue'
import SocialLinks from './SocialLinks.vue'
import MenuService from '../services/MenuService'
import MainNav from './MainNav.vue'
import Logo from './Logo.vue'
//inViewport = require('vue-in-viewport-mixin');
// module.exports = {
//
// }
export default {
  components: { MainNav, OfferingsMenu, SocialLinks, Logo },
  data() {
    return {
            items: [],
    }
  },
  created() {
    this.fetchItems()
  },
  props: {
    ie: {},
    is993: {},
    mobile: {},
    tablet: {},
    desktop: {},
    landscape: {}
  },
   mixins: [ inViewport ],
   watch: {
     'inViewport.now': function(visible) {
       var galleryVue = document.querySelector('.view > div');
       if(visible){
       document.querySelector('.toggle').classList.add('footer-in-view');
       } else {
       document.querySelector('.toggle').classList.remove('footer-in-view');
       }
     }
   },
  computed: {
    orderedPages() {
      return orderBy(this.items.items, 'order')
    }
  },
   methods: {
      fetchItems() {
        return OfferingsMenuService.getAll()
          .then(result => {
            this.items = result.data
          })
      },
      getLinks() {
        return MenuService.getAll()
          .then(result => {
            this.items = result.data
          })
      },
   }
}
</script>
<style lang="scss">
@import '../../src/scss/main.scss';
@import '../../src/scss/layout/_footer.scss';
</style>
