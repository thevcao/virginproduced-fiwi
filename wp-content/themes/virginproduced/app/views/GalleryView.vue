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



    <div class="container" v-if="item.content">
    <div class="video-input">
      <canvas id="main-crop"></canvas>
      <video autoplay loop id="main-roll" style="display:none;" :src="item.acf.main_roll">
      </video>
    </div>
    <div class="video-hover rellax" data-rellax-speed="3" v-on:click="hoverVideo">
          <video id="video"
                 class="video-js vjs-big-play-centered"
                  controls
                  autoplay
                  loop
                 muted
                  data-setup="{}">
               <source :src="item.acf.main_roll" type="video/mp4" >


          </video>
    </div>
      <div class="Row">
        <div class="ColumnSeventy">
          <article class="PageSingle">
            <figure class="BlogPostSingle__images rellax" data-rellax-speed="2" v-if="item.better_featured_image">
              <img :src="item.better_featured_image.source_url">

            </figure>


            <header class="BlogPostSingle__header">
              <h1 class="rellax" data-rellax-speed="2">{{ item.title.rendered }}</h1>



              <div class="row" v-if="acfWorks">
                <div class="col-sm-4" v-for="work in acfWorks">

                <video id="video"
                       class="video-js vjs-big-play-centered"
                        controls
                        :poster="work.acf.poster"
                        data-setup="{}">


                     <source :src="work.acf.video" type="video/mp4" >


                </video>

                <div class="over"><p>{{ work.post_title }}</p></div>
                </div>
              </div>

            </header>
            <aside class="BlogPostSingle__content">
              <div v-html="item.content.rendered"></div>
            </aside>
          </article>
        </div>
      </div>
    </div>
  </div>
  </transition>
</template>

<script>





import PageService from '../services/PageService'

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

    },

    mounted: function(){
    },

  computed: {
    slug() { return this.$route.params.slug },
    pageContent() { return this.$store.state.pages[this.slug] },
    acf() {
//      if(this.acf != false) {

      return this.item.acf || { test: 'poop' }

//      }

    },
    acfWorks() {
//      if(this.acf != false) {
      return this.acf.work_samples.splice(0, 5) || {
          test: 'poo'
      }
//      }
    },
    limitedPosts() {
      return this.posts.splice(0, 5)
    },

  },
  watch: {
    '$route'(to, from) {
      this.fetchItem();
    }
  },

    updated: function(){

         var rellax = new Rellax('.rellax');

          var canvas = document.getElementById('main-crop');
          var ctx = canvas.getContext('2d');
          var video = document.getElementById('main-roll');


          video.addEventListener('play', function() {
            var $this = this; //cache
            (function loop() {
              if (!$this.paused && !$this.ended) {
                ctx.drawImage($this, 0, 0, canvas.clientWidth / 3, canvas.clientHeight / 5 );
                setTimeout(loop, 1000 / 60); // drawing at 30fps
              }
            })();
          }, 0);


    },

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
      const paramSlug = this.$route.fullPath.replace('/content-services/','') || '';
      const pageSlug = slug || paramSlug

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
      // listen event
      onPlayerPlay(player) {
         console.log('player play!', player)
      },
      onPlayerPause(player) {
         console.log('player pause!', player)
      },
      // ...player event

      // or listen state event
      playerStateChanged(playerCurrentState) {
         console.log('player current update state', playerCurrentState)
      },

      // player is ready
      playerReadied(player) {
        console.log('the player is readied', player)
        // you can use it to do something...
        // player.[methods]
      },

      hoverVideo() {


        console.log('clicked the hover video');
        document.querySelector('.video-hover').classList.add('focus');



//        var element = this.item.afc.main_roll;


        //        function create(htmlStr) {
//          var frag = document.createDocumentFragment(),
//            temp = document.createElement('div');
//          temp.innerHTML = htmlStr;
//          while (temp.firstChild) {
//            frag.appendChild(temp.firstChild);
//          }
//          return frag;
//        }
//
//        element.classList.add('modal-player');
//
//        document.body.insertBefore(element, document.body.childNodes[0]);

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
  margin: 50vh 0;


#main-roll
  width: 100vw;
  height: auto;

canvas

    clip: polygon(20% 100%, 75% 0, 100% 0, 100% 100%);
    clip-path: polygon(20% 100%, 75% 0, 100% 0, 100% 100%);
    width: 100vw;
    height: 100vh;
    position: fixed;
    bottom: 0;
    top: 0;

.video-hover {
    position: absolute;
    z-index: 10;
    width: 80%;
    top: 30%;
    left: 33%;
    clip-path: polygon(60% 0, 25% 0, 25% 60%);
    height: 85%;
}
.video-hover.modal-player {
    clip-path: polygon(0% 0, 100% 0, 100% 100%, 0% 100%);
    position: fixed;
    z-index: 100000;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: block;
}
@media only screen and (max-width: 640px)
  .PageSingle
    margin: 1em 0

</style>
