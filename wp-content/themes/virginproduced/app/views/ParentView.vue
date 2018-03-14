<template>
<transition
  appear
  appear-class="custom-appear-class"
  appear-to-class="custom-appear-to-class" (2.1.8+)
  appear-active-class="custom-appear-active-class"
>
  <div>
    <!-- 404 -->
    <div class="Jumbotron" v-if="error">
      <div class="pt5 indent center mw-85">
        <div class="Row items-center">
          <h3>Page not found...</h3>
        </div>
      </div>
    </div>
    <!-- Main -->
    <div class="container" v-if="item.content">
      <div class="Row">
        <div class="ColumnSeventy">
          <article class="PageSingle">
            <figure class="BlogPostSingle__images rellax" data-rellax-speed="2" v-if="item.better_featured_image">
              <img :src="item.better_featured_image.source_url">
            </figure>
            <header class="BlogPostSingle__header">
              <h1 class="rellax" data-rellax-speed="2">{{ item.title.rendered }}</h1>

            </header>
            <!--<aside class="BlogPostSingle__content">
              <div v-html="item.content.rendered"></div>
            </aside>-->
          </article>
        </div>
        <div class="ColumnQuarter">
          <aside class="SidebarItem">
            <header class="SidebarItem__header">
              <h3>Latest Posts</h3>
            </header>
            <ul>
              <li v-for="post in limitedPosts" v-bind:key="post.slug">
                <router-link :to="{ name: 'post', params: { id: post.slug } }">
                  {{ post.title.rendered }}
                </router-link>
              </li>
            </ul>
          </aside>
        </div>
      </div>
    </div>
  </div>
  </transition>
</template>

<script>





import PageService from '../services/PageService'
import PostService from '../services/PostService'

export default {

  data() {
    return {
      item: {},
      posts: [],
      error: false,
//      samples: [this.acfwork]
//      nestedAcf: [],
    }
  },
    created() {
      const slug = this.$route.params.slug;
      this.$store.dispatch('FETCH_PAGE', slug);
      this.fetchItem()
      this.fetchPosts()
    },

    mounted: function(){
    },

  computed: {
    slug() { return this.$route.params.slug },
    pageContent() { return this.$store.state.pages[this.slug] },
//    acf() { return this.pageContent.acf || { test: 'poop' } },
//    acfWorks() {
////      return GoodsService.getAll();
//      return this.acf.work_samples.splice(0, 5) || {
//          test: 'poo'
//      }
//    },
    limitedPosts() {
      return this.posts.splice(0, 5)
    },

  },
  watch: {
    '$route'(to, from) {
      this.fetchItem();
    }
  },

//    updated: function(){
//
//         var rellax = new Rellax('.rellax')
//
//
//    },

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

    fetchItem(slug) {
      const paramSlug = this.$route.fullPath.replace('/','').replace('/','') || '';
      const pageSlug = slug || paramSlug;

      console.log(paramSlug)

      return PageService.get(pageSlug)
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
    fetchPosts() {
      return PostService.getAll()
        .then(result => {
          this.posts = result.data
        })
    },
      // listen event
      onPlayerPlay(player) {
        // console.log('player play!', player)
      },
      onPlayerPause(player) {
        // console.log('player pause!', player)
      },
      // ...player event

      // or listen state event
      playerStateChanged(playerCurrentState) {
        // console.log('player current update state', playerCurrentState)
      },

      // player is ready
      playerReadied(player) {
        console.log('the player is readied', player)
        // you can use it to do something...
        // player.[methods]
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

@media only screen and (max-width: 640px)
  .PageSingle
    margin: 1em 0

</style>
