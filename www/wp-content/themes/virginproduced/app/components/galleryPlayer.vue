<template>
  <div class="" :mobile="mobile">
    <video-player id="gallery-player"
           class="video-js vjs-big-play-centered vjs-volume-vertical"
            controls
            preload="none"
           :options="options">
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
      poster: {},
      mobile: {}
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

      objectFitImages()
      objectFitVideos()

      var vm = this;

      setTimeout(function(){


        const getID = document.querySelector('#gallery-player .video-js').id;

        var player = videojs(getID);

        if(this.mobile === false){

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
          options.poster = this.$props.poster
          return options
        }
        return this.playerOptions
      },

      player() {

        var vm = this

        return this.$refs.videoPlayer.player
      }
    },

    methods: {

      closeModal(){

        this.$emit.closePlayer();
      }


    }



  }


</script>

