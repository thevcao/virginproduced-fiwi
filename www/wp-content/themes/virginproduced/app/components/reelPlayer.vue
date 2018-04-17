<template>
  <div class="" :is993="is993" :mobile="mobile" :ie="ie" :desktop="desktop">
    <video-player id="reel-player"
                  v-if="desktop === true"
                  class="video-js vjs-big-play-centered vjs-volume-vertical"
                  controls
                  playsinline
                  preload="auto"
                  :options="options"
                  >
  </video-player>
    <video-player id="reel-player"
                  v-else
                  class="video-js vjs-big-play-centered vjs-volume-vertical"
                  controls
                  autoplay
                  preload="auto"
                  :options="options"
                  >
  </video-player>
  </div>
</template>
<script>
import 'video.js/dist/video-js.css'
import videojs from 'video.js'
import { videoPlayer } from 'vue-video-player'
  export default {
   components: {
      videoPlayer
    },
    props: {
      src: {
        type: String,
        default: '/wp-content/themes/virginproduced/src/img/virgin-glitched.mp4'
      },
      ie: {},
      mobile: {},
      is993: {},
      desktop: {}
    },
    data() {
      return {
        playerOptions: {
          // videojs options
          muted: false,
          language: 'en',
          sources: [{
            type: "video/mp4",
            src: "asdfasdfasdf"
          }],
        controlBar: {
          volumePanel: false,
          muteToggle: false,
          PlayToggle: false,
          RemainingTimeDisplay: false
        },
        }
      }
    },
    mounted: function(){
      var vm = this;
      setTimeout(function(){
      const getID = document.querySelector('#reel-player .video-js').id;
        var Button = videojs.getComponent('Button');
        var MyButton = videojs.extend(Button, {
          constructor: function() {
            Button.apply(this, arguments);
            this.addClass( 'close-modal' );
            /* initialize your button */
          },
          handleClick: function() {
            vm.$emit('closeReel');
          }
        });
        videojs.registerComponent('closeModal', MyButton);
        var player = videojs(getID);
        player.getChild('controlBar').addChild('closeModal', {});
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
//          setTimeout(function(){
//
//          player.play();
////          player.requestFullscreen();
//
//          }, 1000);
         } else {
          setTimeout(function(){
          player.play();
          }, 300);
         }
      }, 300);

      },
    computed: {
      options() {
        if (this.$props.src) {
          // Create new clone of default options
          const options = {...this.playerOptions};
          options.sources[0].src = this.$props.src
          return options
        }
        return this.playerOptions
      },
    },
    methods: {
      closeModal(){
        this.$emit.closeReel();
      }
    }
  }
</script>
<style lang="scss">
@import '../../src/scss/main.scss';
@import '../../src/scss/components/videojs.scss';
  .mobile {
    #app #reel-player {
      display: none;
    }
  }
#app #reel-player {
    position: fixed;
    height: auto;
    width: auto;
    padding-bottom: 0;
    bottom: 0;
    top: 0;
    left: 0;
    right: 0;
    padding: 2rem;
    background: white;
    overflow: hidden;
    // (768px)
    @include media-breakpoint-down(sm) {
          z-index: 10;
    }
    .video-js  {
        padding-bottom: 0;
        height: 100%;
        position: relative;
        overflow: hidden;
          .vjs-fullscreen-control {
            display: none;
          }
        .vjs-tech {
          object-fit: cover;
          // (768px)
          @include media-breakpoint-down(sm) {
                object-fit: contain;
          }
        }
      }
  }
</style>
