<template>
  <div :is993="is993" :mobile="mobile" :ie="ie">
    <!-- 404 -->
    <Error404 v-if="item === undefined"></Error404>
    <!-- Main -->
      <transition
      v-on:before-enter="beforeEnter"
      v-on:enter="enter"
      v-on:leave="leave"
      v-bind:css="false"
      >
      <AboutView
                 v-on:update="onElementChange()"
                 :src="elementChange()"
                 v-if="item && item.template === 'about-us.php'"
                 :is993="is993" :mobile="mobile" :ie="ie"
                 >
      </AboutView>
      </transition>
      <transition
      v-on:before-enter="beforeEnter"
      v-on:enter="enter"
      v-on:leave="leave"
      v-bind:css="false"
      >
      <GalleryView
                   v-on:update="onElementChange()"
                   :src="elementChange()"
                   v-if="item && item.template === 'service-gallery.php'"
                   :is993="is993" :mobile="mobile" :ie="ie"
                   >
      </GalleryView>
      </transition>
      <transition
      v-on:before-enter="beforeEnter"
      v-on:enter="enter"
      v-on:leave="leave"
      v-bind:css="false"
      >
      <ParentService
                     v-on:update="onElementChange()"
                     :src="elementChange()"
                     v-if="item && item.template === 'parent-service.php'"
                     :is993="is993" :mobile="mobile" :ie="ie"
                     >
      </ParentService>
      </transition>
      <transition
      v-on:before-enter="beforeEnter"
      v-on:enter="enter"
      v-on:leave="leave"
      v-bind:css="false"
      >
      <ChildService
                    v-on:update="onElementChange()"
                    :src="elementChange()"
                    v-if="item && item.template === 'child-service.php'"
                    :is993="is993" :mobile="mobile" :ie="ie"
                     >
      </ChildService>
      </transition>
      <transition
      v-on:before-enter="beforeEnter"
      v-on:enter="enter"
      v-on:leave="leave"
      v-bind:css="false"
      >
      <Contact
               v-on:update="onElementChange()"
               :src="elementChange()"
               v-if="item && item.template === 'contact.php'"
               :is993="is993" :mobile="mobile" :ie="ie"
                     >
      </Contact>
      </transition>
  </div>
</template>
<script>
import PageService from '../services/PageService'
import PostService from '../services/PostService'
import GoodsService from '../services/GoodsService'
import GalleryView from './GalleryView.vue'
import ParentService from './ParentView.vue'
import ChildService from './ChildView.vue'
import AboutView from './AboutView.vue'
import Contact from './Contact.vue'
import Error404 from './NotFoundView.vue'
import videojs from 'video.js'
export default {
  components: {
  GalleryView,
  ParentService,
  AboutView,
  ChildService,
  Contact,
  Error404
  },
  data() {
    return {
      item: {},
      posts: [],
      error: false,
//      samples: [this.acfwork]
//      nestedAcf: [],
    }
  },
  props: {
      items: {},
      offerings: {},
      ie: {},
      mobile: {},
      is993: {}
  },
    created() {
      const slug = this.$route.params.slug;
      this.$store.dispatch('FETCH_PAGE', slug);
      this.fetchItem()
    },
    mounted: function(){
    },
  computed: {
    slug() { return this.$route.params.slug },
    pageContent() { return this.$store.state.pages[this.slug] },
  },
  watch: {
    '$route'(to, from) {
      this.fetchItem();
    }
  },
    updated: function(){
    },
  methods: {
    elementChange() {
    this.$on('broll', (payload) => {
//      console.log(payload.src);
//
//      return payload.src;
//      this.src = payload.src
        this.$parent.$emit('broll', {
        src : payload.src
        })
    });
    this.$on('reelPlay', (payload) => {
//      console.log(payload.src);
//
//      return payload.src;
//      this.src = payload.src
//      setTimeout(function(){
//      const getID = document.querySelector('#reel-player .video-js').id;
//
//      var player = videojs(getID);
//
//      player.play();
//      player.requestFullscreen();
//
//      }, 3000);
      this.$parent.$emit('reelPlay')
    });
    this.$on('title', (payload) => {
//      console.log(payload.src);
//
//      return payload.src;
//      this.src = payload.src
//      setTimeout(function(){
//      const getID = document.querySelector('#reel-player .video-js').id;
//
//      var player = videojs(getID);
//
//      player.play();
//      player.requestFullscreen();
//
//      }, 3000);
        this.$parent.$emit('title', {
        title : payload.title
        })
    });
    this.$on('contextual_menu', (payload) => {
//      console.log(payload.src);
//
//      return payload.src;
//      this.src = payload.src
        this.$parent.$emit('contextual_menu', {
        contextual_menu : payload.contextual_menu
        })
    });
    this.$on('contextual_menu_links', (payload) => {
//      console.log(payload.src);
//
//      return payload.src;
//      this.src = payload.src
        this.$parent.$emit('contextual_menu_links', {
        contextual_menu_links : payload.contextual_menu_links
        })
    });
      // payload is what you want here
    },
    fetchItem(slug) {
      const paramSlug = this.$route.params.slug
      const pageSlug = slug || paramSlug
      return PageService.get(paramSlug)
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
    beforeEnter: function (el) {
      el.style.opacity = 0
    },
    enter: function (el, done) {
      Velocity(el,
               {
        opacity: 1,
      }, {
        duration: 500,
        delay: 1000
      });
    },
    leave: function (el, done) {
      Velocity(el,
               {
        opacity: 0
      }, {
        duration: 300
      });
      Velocity(el, {
        display: 'none'
      }, {
        delay: 250,
        complete: done
      })
    },
  }
}
</script>
