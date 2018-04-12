<template v-if="item">

  <div class="about-vue" :is993="is993" :mobile="mobile" :ie="ie">

          <!-- 404 -->
    <div class="container main" v-if="error">
      <div class="row">
        <div class="col-12">
          <h1 class="glitching" title="Pardon the disruption">Pardon the disruption</h1>
        </div>
      </div>
    </div>
    <!-- Main -->
    <div class="main" v-if="item.content">

      <figure class="BlogPostSingle__images rellax" data-rellax-speed="2" v-if="item.better_featured_image">
        <div class="bg-video" v-if="is993 === false">
          <video :src="item.acf.background_video" autoplay loop muted></video>

        </div>
        <div class="img">
          <img :src="item.better_featured_image.media_details.sizes.large.source_url">
          <div class="mask"></div>
        </div>

        <header class="BlogPostSingle__header">
          <div class="hero-text">
            <h1 class="rellax" data-rellax-speed="2">{{ item.title.rendered }}</h1>
            <ul v-if="is993 === false">
              <li><router-link to="/our-suits" title="Our Suits">Our Suits</router-link></li>
              <li><a href="#" title="Virgin News" @click.prevent="scroll()">Virgin News</a></li>
            </ul>


          </div>

        </header>


      </figure>

      <vue-headful
        title="About Us"
        description="Virgin Produced"
    />

      <div class="start">
        <div class="">

          <article class="">
            <div class="container-fluid">
            <div class="row">

              <div class="col-sm-5 mr-auto">

                <div id="content" class="content" v-html="item.content.rendered">
                </div>
              </div>
              <div
                   id="news"
                   class="col-sm-4 ml-auto pr-0 news-sidebar"
                   data-bottom-top="transform: translateY(5%); opacity: 0"
                   data-top="transform: translateY(-0%); opacity: 1">

                <h2>Virgin News</h2>
                <div v-for="post in limitedPosts" class="news-item">
                  <img v-if="post.better_featured_image" :src="post.better_featured_image.media_details.sizes.medium.source_url">
                  <div class="title">
                      <h3>{{ post.title.rendered }}</h3>
                  </div>
                </div>


              </div>
            </div>

            </div>

          </article>
          <section class="suits-cta">



            <router-link v-if="is993 === false" to="/our-suits">

            <div class="title-holder" data-start="transform: translateY(-25%); opacity: 0" data-end="transform: translateY(-0%); opacity: 1">

              <h2>Meet<br>Our Suits</h2>
              <div class="over">
                <div class="tag">
                  <h3>We are against type casting<br>Our suits are creative</h3>
                </div>
                <h2>Meet</h2>
                <h2 class="glitching" title="Our Suits">Our Suits</h2>
            </div>
          </div>

          </router-link>

          <a v-else href="/our-suits">
            <div class="title-holder" data-start="transform: translateY(-25%); opacity: 0" data-end="transform: translateY(-0%); opacity: 1">

              <h2>Meet<br>Our Suits</h2>
              <div class="over">
                <h2>Meet</h2>
                <h2 class="glitching" title="Our Suits">Our Suits</h2>
                <div class="tag">
                  <h3>We are against type casting<br>Our suits are creative</h3>
                </div>
            </div>
          </div>

          </a>

        </section>
        </div>
      </div>


            <div class="suits-bg"
                 data-anchor-target=".suits-cta"
                 data-bottom-top="transform: translateY(10%); opacity: 0"
                 data-center-top="transform: translateY(0%); opacity: 1"
                 v-if="is993 === false"
                 ></div>

    </div>


  </div>

</template>

<script>





import AboutService from '../services/AboutService'
import PostService from '../services/PostService'

export default {



  data() {
    return {
      item: [],
      posts: [],
      error: false,
    }
  },
  props: {

    ie: {},
    is993: {},
    mobile: {}
  },
    created() {
      const slug = this.$route.params.slug;
      this.$store.dispatch('FETCH_PAGE', slug);
      this.fetchItem()
      this.fetchPosts()
    },

    mounted: function(){

      this.$nextTick(function () {
      if(this.is993 === false) {

      this.initView()

      }

      setTimeout(function(){
      document.querySelector('.main').style.height='auto'
      }, 1000);


      });

    },
    updated: function(){
      if(this.is993 === true) {


      document.querySelector('.BlogPostSingle__header').style.height=window.innerHeight - 65 + 'px'
      document.querySelector('figure .img img').style.height=window.innerHeight - 65 + 'px'

      if( this.mobile === false) {


      window.addEventListener('resize', function(){
      document.querySelector('.BlogPostSingle__header').style.height=window.innerHeight - 65 + 'px'
      document.querySelector('figure .img img').style.height=window.innerHeight - 65 + 'px'


      })

      }

      }
    },
    computed: {
      slug() { return this.$route.params.slug },
      pageContent() { return this.$store.state.pages[this.slug] },
      limitedPosts() {
        return this.posts.splice(0, 5)
      },

    },
    watch: {
      '$route'(to, from) {
        this.fetchItem();
      }
    },
    beforeDestroy: function(){

      skrollr.init().destroy();

    },
    methods: {

      initView: function(){
        console.log('mounting...')
        document.querySelector('body').style.pointerevents="hidden";

        setTimeout(function(){

          skrollr.init({});
          document.querySelector('body').style.overflow="";


        }, 3000);

      },
      fetchItem() {
        return AboutService.get(this.$route.params.slug)
          .then(result => {
            this.item = result.data[0]
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
      fetchPosts() {
        return PostService.getAll()
          .then(result => {
            this.posts = result.data
          })
      },

      scroll() {

      var el = document.querySelector('.news-sidebar').scrollIntoView({
        behavior: 'smooth'
      });

    }

    }

}




</script>

<style lang="scss">

@import '../../src/scss/main.scss';
@import '../../src/scss/components/_about.scss';

</style>
