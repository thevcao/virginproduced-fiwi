<template>
  <div class="contact-vue">

    <div>
        <div class="crop-bg"><div></div></div>


        <div class="main">

          <vue-headful title="Contact Us" description="Virgin Produced"/>

          <div class="container ml-xl-0">
            <div class="row">
              <div class="col-sm-4">
                <aside class="">
                <header class="">
                  <h1 class="large glitching" title="Thanks">Thanks</h1>
                </header>

              </aside>

              </div>


            </div>
            <div class="row">
              <div class="col-xl-7">
                <aside class="SidebarItem">


                  <h2>Something pithy here.</h2>

              </aside>

              </div>
              <div class="col-xl-4">

              <article class="BlogPostSingle">


                <aside class="BlogPostSingle__content">
                  <SocialLinks></SocialLinks>


                  <div class="address">
                      <h4>PR/MEDIA INQUIRIES</h4>
                      <h4><a href="mailto:media@virginproduced.com">media@virginproduced.com</a></h4>
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

export default {

  components: {

    SocialLinks
  },
  data() {
    return {
      item: {},
      posts: [],
      error: false
    }
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
  updated: function(){



  },
  mounted() {


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
