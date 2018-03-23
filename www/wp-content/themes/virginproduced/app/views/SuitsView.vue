<template>
  <div class="suits-vue">
    <!-- 404 -->
    <div class="container main" v-if="error">
      <div class="row">
        <div class="col-12">
          <h1 class="glitching" title="Pardon the disruption">Pardon the disruption</h1>
        </div>
      </div>
    </div>

    <transition>
      <figure class="team-headshot" v-if="item.better_featured_image">
        <img :src="item.better_featured_image.source_url">{{ glitchMe() }}
        <header class="float-title">
        <h2 :title="item.title.rendered">{{ item.title.rendered }}<span>{{ item.acf.position }}</span></h2>
        </header>
      </figure>
    </transition>

    <div class="crop-bg"><div></div></div>

    <div class="main" v-if="item.content">

      <vue-headful :title="item.title.rendered" description="Virgin Produced"/>

      <div class="container">
        <div class="row">
          <div class="col-sm-4">
            <aside class="SidebarItem">
            <header class="SidebarItem__header">
              <h1>Our Suits</h1>
            </header>

          </aside>

          </div>


        </div>
        <div class="row">
          <div class="col-xl-3 col-lg-3 col-sm-8">
            <aside class="SidebarItem">
            <ul>
              <li v-for="post in limitedPosts" v-bind:key="post.slug">
                <router-link :to="{ name: 'suits', params: { slug: post.slug } }" :title="post.title.rendered">{{ post.title.rendered }}</router-link>
              </li>
            </ul>
          </aside>

          </div>
          <div class="col-xl-4 col-lg-6 col-sm-8">

          <article class="BlogPostSingle">


            <aside class="BlogPostSingle__content">

              <div v-html="item.content.rendered"></div>

            </aside>

            </article>

          </div>

        </div>




      </div>
    </div>

  </div>
</template>

<script>

import SuitsService from '../services/SuitsService'
//import Glitch from '../../src/js/_Glitch.js'

export default {

  data() {
    return {
      item: [],
      posts: [],
      error: false
    }
  },

  created() {
    this.fetchItem()
    this.fetchPosts()





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

    function init() {
    let windowW = window.innerWidth;
    let windowH = window.innerHeight;
    let isLoaded = false;
    let glitch;
    let imgSrc = 'http://localhost:8000/wp-content/uploads/2018/03/richard-1.jpg';

    function setup() {
      background(0);
      createCanvas(windowW, windowH);
      loadImage(imgSrc, function(img) {
          glitch = new Glitch(img);
          isLoaded = true;
      });
    }

    function draw() {
      clear();
      background(0);

      if (isLoaded) {
          glitch.show();
      }

      // fill(255, 255, 255);
      // textSize(14);
      // text('FPS: ' + floor(frameRate()), 20, 30);

    }

    class Glitch {
      constructor(img) {
          this.channelLen = 4;
          this.imgOrigin = img;
          this.imgOrigin.loadPixels();
          this.copyData = [];
          this.flowLineImgs = [];
          this.shiftLineImgs = [];
          this.shiftRGBs = [];
          this.scatImgs = [];
          this.throughFlag = true;
          this.copyData = new Uint8ClampedArray(this.imgOrigin.pixels);

          // flow line
          for (let i = 0; i < 1; i++) {
              let o = {
                  pixels: null,
                  t1: floor(random(0, 1000)),
                  speed: floor(random(4, 24)),
                  randX: floor(random(24, 80))
              };
              this.flowLineImgs.push(o);
          }

          // shift line
          for (let i = 0; i < 6; i++) {
              let o = null;
              this.shiftLineImgs.push(o);
          }

          // shift RGB
          for (let i = 0; i < 1; i++) {
              let o = null;
              this.shiftRGBs.push(o);
          }

          // scat imgs
          for (let i = 0; i < 3; i++) {
              let scatImg = {
                  img: null,
                  x: 0,
                  y: 0
              };
              this.scatImgs.push(scatImg);
          }
      }

      replaceData(destImg, srcPixels) {
          for (let y = 0; y < destImg.height; y++) {
              for (let x = 0; x < destImg.width; x++) {
                  let r, g, b, a;
                  let index;
                  index = (y * destImg.width + x) * this.channelLen;
                  r = index;
                  g = index + 1;
                  b = index + 2;
                  a = index + 3;
                  destImg.pixels[r] = srcPixels[r];
                  destImg.pixels[g] = srcPixels[g];
                  destImg.pixels[b] = srcPixels[b];
                  destImg.pixels[a] = srcPixels[a];
              }
          }
          destImg.updatePixels();
      }

      flowLine(srcImg, obj) {

          let destPixels,
              tempY;
          destPixels = new Uint8ClampedArray(srcImg.pixels);
          obj.t1 %= srcImg.height;
          obj.t1 += obj.speed;
          //tempY = floor(noise(obj.t1) * srcImg.height);
          tempY = floor(obj.t1);
          for (let y = 0; y < srcImg.height; y++) {
              if (tempY === y) {
                  for (let x = 0; x < srcImg.width; x++) {
                      let r, g, b, a;
                      let index;
                      index = (y * srcImg.width + x) * this.channelLen;
                      r = index;
                      g = index + 1;
                      b = index + 2;
                      a = index + 3;
                      destPixels[r] = srcImg.pixels[r] + obj.randX;
                      destPixels[g] = srcImg.pixels[g] + obj.randX;
                      destPixels[b] = srcImg.pixels[b] + obj.randX;
                      destPixels[a] = srcImg.pixels[a];
                  }
              }
          }
          return destPixels;
      }

      shiftLine(srcImg) {

          let offsetX;
          let rangeMin, rangeMax;
          let destPixels;
          let rangeH;

          destPixels = new Uint8ClampedArray(srcImg.pixels);
          rangeH = srcImg.height;
          rangeMin = floor(random(0, rangeH));
          rangeMax = rangeMin + floor(random(1, rangeH - rangeMin));
          offsetX = this.channelLen * floor(random(-40, 40));

          for (let y = 0; y < srcImg.height; y++) {
              if (y > rangeMin && y < rangeMax) {
                  for (let x = 0; x < srcImg.width; x++) {
                          let r, g, b, a;
                          let r2, g2, b2, a2;
                          let index;

                          index = (y * srcImg.width + x) * this.channelLen;
                          r = index;
                          g = index + 1;
                          b = index + 2;
                          a = index + 3;
                          r2 = r + offsetX;
                          g2 = g + offsetX;
                          b2 = b + offsetX;
                          destPixels[r] = srcImg.pixels[r2];
                          destPixels[g] = srcImg.pixels[g2];
                          destPixels[b] = srcImg.pixels[b2];
                          destPixels[a] = srcImg.pixels[a];
                  }
              }
          }
          return destPixels;
      }

      shiftRGB(srcImg) {

          let randR, randG, randB;
          let destPixels;
          let range;

          range = 16;
          destPixels = new Uint8ClampedArray(srcImg.pixels);
          randR = (floor(random(-range, range)) * srcImg.width + floor(random(-range, range))) * this.channelLen;
          randG = (floor(random(-range, range)) * srcImg.width + floor(random(-range, range))) * this.channelLen;
          randB = (floor(random(-range, range)) * srcImg.width + floor(random(-range, range))) * this.channelLen;

          for (let y = 0; y < srcImg.height; y++) {
              for (let x = 0; x < srcImg.width; x++) {
                  let r, g, b, a;
                  let r2, g2, b2, a2;
                  let index;

                  index = (y * srcImg.width + x) * this.channelLen;
                  r = index;
                  g = index + 1;
                  b = index + 2;
                  a = index + 3;
                  r2 = (r + randR) % srcImg.pixels.length;
                  g2 = (g + randG) % srcImg.pixels.length;
                  b2 = (b + randB) % srcImg.pixels.length;
                  destPixels[r] = srcImg.pixels[r2];
                  destPixels[g] = srcImg.pixels[g2];
                  destPixels[b] = srcImg.pixels[b2];
                  destPixels[a] = srcImg.pixels[a];
              }
          }

          return destPixels;
      }

      getRandomRectImg(srcImg) {
          let startX;
          let startY;
          let rectW;
          let rectH;
          let destImg;
          startX = floor(random(0, srcImg.width - 30));
          startY = floor(random(0, srcImg.height - 50));
          rectW = floor(random(30, srcImg.width - startX));
          rectH = floor(random(1, 50));
          destImg = srcImg.get(startX, startY, rectW, rectH);
          destImg.loadPixels();
          return destImg;
      }

      show() {

          // restore the original state
          this.replaceData(this.imgOrigin, this.copyData);

          // sometimes pass without effect processing
          let n = floor(random(100));
          if (n > 75 && this.throughFlag) {
              this.throughFlag = false;
              setTimeout(() => {
                  this.throughFlag = true;
              }, floor(random(40, 400)));
          }
          if (!this.throughFlag) {
              push();
              translate((width - this.imgOrigin.width) / 2, (height - this.imgOrigin.height) / 2);
              image(this.imgOrigin, 0, 0);
              pop();
              return;
          }

          // flow line
          this.flowLineImgs.forEach((v, i, arr) => {
              arr[i].pixels = this.flowLine(this.imgOrigin, v);
              if (arr[i].pixels) {
                  this.replaceData(this.imgOrigin, arr[i].pixels);
              }
          })

          // shift line
          this.shiftLineImgs.forEach((v, i, arr) => {
              if (floor(random(100)) > 50) {
                  arr[i] = this.shiftLine(this.imgOrigin);
                  this.replaceData(this.imgOrigin, arr[i]);
              } else {
                  if (arr[i]) {
                      this.replaceData(this.imgOrigin, arr[i]);
                  }
              }
          })

          // shift rgb
          this.shiftRGBs.forEach((v, i, arr) => {
              if (floor(random(100)) > 65) {
                  arr[i] = this.shiftRGB(this.imgOrigin);
                  this.replaceData(this.imgOrigin, arr[i]);
              }
          })

          push();
          translate((width - this.imgOrigin.width) / 2, (height - this.imgOrigin.height) / 2);
          image(this.imgOrigin, 0, 0);
          pop();

          // scat image
          this.scatImgs.forEach((obj) => {
              push();
              translate((width - this.imgOrigin.width) / 2, (height - this.imgOrigin.height) / 2);
              if (floor(random(100)) > 80) {
                  obj.x = floor(random(-this.imgOrigin.width * 0.3, this.imgOrigin.width * 0.7));
                  obj.y = floor(random(-this.imgOrigin.height * 0.1, this.imgOrigin.height));
                  obj.img = this.getRandomRectImg(this.imgOrigin);
              }
              if (obj.img) {
                  image(obj.img, obj.x, obj.y);
              }
              pop();
          })

      }

    }



    }

    init()
  },

  methods: {


    fetchItem() {
      return SuitsService.get(this.$route.params.slug)
        .then(result => {
          this.item = result.data[0]
        })
        .catch(err => {
          this.error = true
        })
    },
    fetchPosts() {
      return SuitsService.getAll()
        .then(result => {
          this.posts = result.data
        })
    },
    glitchMe: function (img) {

    }


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


.fade-enter-active
  transition: opacity 0.5s

.fade-leave-active
  @extend .fade-enter-active

.fade-enter
  opacity: 0

.fade-leave
  @extend .fade-enter





@media only screen and (max-width: 640px)
  .BlogPostSingle
    margin: 1em 0
    &__header
      h1
        font-size: 2.5em

</style>
