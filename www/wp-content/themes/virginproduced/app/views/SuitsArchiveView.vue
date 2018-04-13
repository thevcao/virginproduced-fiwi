<template>
  <div class="suits-vue" :ie="ie" :is993="is993" :mobile="mobile" contextual_menu="Our Suits">
      <vue-headful
                  title="Our Suits"
                  description="Virgin Produced"
                  v-if="item"
      />
          <!-- 404 -->
    <div class="container main" v-if="error">
      <div class="row">
        <div class="col-12">
          <h1 class="glitching" title="Pardon the disruption">Pardon the disruption</h1>
        </div>
      </div>
    </div>
          <!-- Main -->
          <div class="main">
        <div class="container ml-xl-0">
              <div class="row" v-if="is993 === false">
              <div class="col-sm-4">
                <header class="SidebarItem__header">
                  <h1>Our Suits</h1>
                </header>
              </div>
              </div>
              <div class="row">
                <div class="col-xl-3 col-lg-3 col-sm-8" v-if="is993 === false">
                      <aside class="SidebarItem">
                        <ul>
                          <li v-for="post in limitedPosts" v-bind:key="post.slug" v-if="post.better_featured_image">
                            <router-link :to="{ name: 'suits', params: { slug: post.slug } }" :title="post.title.rendered">{{ post.title.rendered }}</router-link>
                          </li>
                          <li v-else>
                            <a href="" class="title-only" :title="post.title.rendered">{{ post.title.rendered }}<span>{{ post.acf.position }}</span></a>
                          </li>
                        </ul>
                      </aside>
                  </div>
                  <div class="col-xl-4 col-lg-6 col-sm-8">
                  <article class="BlogPostSingle">
                    <aside class="BlogPostSingle__content">
                      <h2 v-if="is993 === false">Select a Bio to Read More</h2>
                      <h2 v-else class="large glitching">Select a Bio to Read More</h2>
                    </aside>
                    </article>
                  </div>
              </div>
            </div>
          </div>
  </div>
</template>
<script>
import SuitsArchiveService from '../services/SuitsArchiveService'
export default {
  data() {
    return {
      item: [],
      posts: [],
      error: false,
      contextual_menu: 'Our Suits'
    }
  },
  props: {
    ie: {},
    mobile: {},
    is993: {},
  },
  beforeDestroy() {
  },
  created() {
//    this.fetchItem()
    this.fetchPosts()
  },
  mounted: function(){
      if(this.is993 === true){
      var vm = this;
      setTimeout(function(){
      if (window.navigator.standalone == true) {
      var heroHeight = window.innerHeight - 80 + 'px'
      } else {
      var heroHeight = window.innerHeight - 65 + 'px'
      }
      vm.$el.querySelector('.main').style.height=heroHeight
       }, 500);
      }
  },
  updated: function(){
        if(this.is993 === true){
      var vm = this;
      setTimeout(function(){
      if (window.navigator.standalone == true) {
      var heroHeight = window.innerHeight - 80 + 'px'
      } else {
      var heroHeight = window.innerHeight - 65 + 'px'
      }
      vm.$el.querySelector('.main').style.height=heroHeight
       }, 500);
      }
      this.$parent.$emit('contextual_menu', {
      contextual_menu : 'Our Suits'
      })

      this.$parent.$emit('contextual_menu_links', {
      contextual_menu_links : ''
      })
  },
  watch: {
//    '$route': 'fetchItem'
  },
  computed: {
    limitedPosts() {
      return this.posts.splice(0, 999)
    }
  },
  beforeDestroy() {

    this.$parent.$emit('contextual_menu', {
    contextual_menu : ''
    })

    this.$parent.$emit('contextual_menu_links', {
    contextual_menu_links : ''
    })

  },
  methods: {
//    fetchItem() {
//      return SuitsArchiveService.get(this.$route.params.slug)
//        .then(result => {
//          this.item = result.data[0]
//        })
//        .catch(err => {
//          this.error = true
//        })
//    },
    fetchPosts() {
      return SuitsArchiveService.getAll()
        .then(result => {
          this.posts = result.data
        })
    },
  }
}
</script>
<style lang="scss" scoped>
@import '../../src/scss/main.scss';
@import '../../src/scss/components/_suits.scss';
</style>
