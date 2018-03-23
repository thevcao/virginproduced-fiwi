<template>
  <div class="suits-vue">
      <vue-headful
          title="Our Suits"
          description="Virgin Produced"
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
            <div class="container">
              <div class="row">
                <div class="col-sm-4">
                      <aside class="SidebarItem">
                        <header class="SidebarItem__header">
                          <h1>Our Suits</h1>
                        </header>
                        <ul>
                          <li v-for="post in limitedPosts" v-bind:key="post.slug">
                            <router-link :to="{ name: 'suits', params: { slug: post.slug } }" :title="post.title.rendered">
                              {{ post.title.rendered }}
                            </router-link>
                          </li>
                        </ul>
                      </aside>
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
      error: false
    }
  },

  created() {
//    this.fetchItem()
    this.fetchPosts()
  },

  watch: {
//    '$route': 'fetchItem'
  },

  computed: {
    limitedPosts() {
      return this.posts.splice(0, 999)
    }
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
.BlogPostSingle
  &__header
    h1
      font-size: 4em
      padding: 0.3em 0
  &__content
    color: #444
    h1, h2, h3, h4, h5, h6
      padding: 0.3em 0

.SidebarItem
  margin-bottom: 1em
  &__header
    text-transform: uppercase

@media only screen and (max-width: 640px)
  .BlogPostSingle
    margin: 1em 0
    &__header
      h1
        font-size: 2.5em

</style>
