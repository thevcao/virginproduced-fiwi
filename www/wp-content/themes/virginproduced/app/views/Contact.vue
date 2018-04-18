<template>
  <div class="contact-vue" :is993="is993" :mobile="mobile" :ie="ie">
    <div v-if="item">
        <figure class="team-headshot" v-show="item && item.better_featured_image && is993 === false">

        <glitch img
          v-if="item && item.better_featured_image"
          :disabled="glitch.disabled"
          :amount="glitch.amount"
          :scale="glitch.scale"
          :tuning="glitch.tuning"
          :batshit="glitch.batshit"
        >

          <img
               :src="item.better_featured_image.media_details.sizes.medium.source_url"
               crossorigin="anonymous"
               v-if="item.better_featured_image.media_details.sizes.medium">
          <img
               :src="item.better_featured_image.source_url"
               crossorigin="anonymous"
               v-else>
        </glitch>
          <header class="float-title">
          <h2 title="Contact Us">Contact Us</h2>
          </header>
        </figure>
        <div class="crop-bg"><div></div></div>
        <div class="main">
          <vue-headful title="Contact Us" description="Virgin Produced"/>
          <div class="container ml-xl-0">
            <div class="row">
              <div class="col-xl-7">
                <aside class="SidebarItem">
                <header class="SidebarItem__header">
                  <h1>Contact Us</h1>
                </header>
              </aside>
              </div>
            </div>
            <div class="row">
              <div class="col-md-7">
                <aside class="SidebarItem">
                  <form accept-charset="UTF-8" action="https://formkeep.com/f/3580b3c5e6f4" method="POST">
                    <input type="hidden" name="utf8" value="✓">
                    <input type="text" id="name" name="name" placeholder="Name" required>
                    <input type="text" id="company" name="company" placeholder="Company" required>
                    <input type="email" id="email" name="email" placeholder="Email" required>
                    <textarea type="textarea" id="message" name="message" placeholder="Message"></textarea>
                    <div class="g-recaptcha" data-sitekey="6LdLa1EUAAAAACtjZAfrdoFQbW8zzEJo7fqkbBdM"></div>
                    <button class="btn" type="submit">Submit</button>
                  </form>
              </aside>
              </div>
              <div class="col-xl-4">
              <article class="BlogPostSingle">
                <aside class="BlogPostSingle__content mt-sm-0 mb-sm-0 mt-5 mb-5 col-sm-12 col-11 ml-auto text-sm-left text-right">
                  <SocialLinks></SocialLinks>
                  <div class="address">
                      <h4>PR/MEDIA INQUIRIES</h4>
                      <h3 class="mt-2"><a href="mailto:media@virginproduced.com">media@virginproduced.com</a></h3>
                  </div>
                </aside>
                </article>
              </div>
            </div>
          </div>
        </div>
      </div>
</div>
</template>
<script>
import PageService from '../services/PageService'
//import Glitch from '../../src/js/_Glitch.js'
import SocialLinks from '../components/SocialLinks.vue'
const Glitch = () => import(/* webpackChunkName: "glitch" */ '../components/Glitch.vue');

export default {
  components: {
    SocialLinks,
    Glitch
  },
  data() {
    return {
      item: {},
      posts: [],
      error: false,
      glitch: {
        disabled: false,
       amount: 0,
        scale: 0.06,
        tuning: 1.66,
        batshit: true,
      },
    }
  },
  props: {
    ie: {},
    mobile: {},
    is993: {}
  },
  created() {
    this.fetchItem()
  },
  watch: {
    '$route': 'fetchItem'
  },
  computed: {
    limitedPosts() {
      return this.posts.splice(0, 999)
    }
  },
  updated(){
    if(this.is993 === true){
    var body = document.querySelector('body');
      body.classList.add('no-header-bg')
    }
  },
  mounted() {
    if(this.is993 === true){
    var body = document.querySelector('body');
      body.classList.add('no-header-bg')
    }
  },
  beforeDestroy() {
    if(this.is993 === true){
    var body = document.querySelector('body');
      body.classList.remove('no-header-bg')
    }
  },
  methods: {
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
//    beforeEnter: function (el) {
//      el.style.opacity = 0
//    },
//    enter: function (el, done) {
//      Velocity(el, { opacity: 0 }, { duration: 500 });
//      setTimeout(function(){
//            Velocity(el, { opacity: 1 }, { duration: 500 });
//      }, 300);
//
//    },
//    leave: function (el, done) {
//      Velocity(el, { opacity: 1 }, { duration: 500 });
//      setTimeout(function(){
//            Velocity(el, { opacity: 0 }, { duration: 500 });
//      }, 300);
////      Velocity(el, {
////        display: 'none'
////      }, { complete: done })
//    }
  }
}
</script>
<style lang="scss">
@import '../../src/scss/main.scss';
@import '../../src/scss/components/_contact.scss';
</style>
