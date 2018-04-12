<template>
  <div class="" >
    <video-player id="home-modal"
                  v-if="mobile === false"
                  class="video-js vjs-big-play-centered vjs-volume-vertical"
                  controls
                  playsinline
                  preload="auto"
                  :options="options"
                  :first="first"
                  :mobile="mobile"
                  >
  </video-player>
    <video-player id="home-modal"
                  v-else
                  class="video-js vjs-big-play-centered vjs-volume-vertical"
                  controls
                  preload="auto"
                  :options="options"
                  :first="first"
                  :mobile="mobile"
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
      first: {},
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
            src: "/wp-content/themes/virginproduced/src/img/virgin-glitched.mp4"
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


      const getID = document.querySelector('#home-modal .video-js').id;

        var Button = videojs.getComponent('Button');
        var MyButton = videojs.extend(Button, {
          constructor: function() {
            Button.apply(this, arguments);
            this.addClass( 'close-modal' );
            /* initialize your button */
          },
          handleClick: function() {


            vm.$emit('closeModal');

          }
        });
        videojs.registerComponent('closeModal', MyButton);

        var player = videojs(getID);

        player.getChild('controlBar').addChild('closeModal', {});
        if( (vm.$cookie.get('first') === 'false' || vm.$cookie.get('first') === null) && window.innerWidth > 993){

        console.log('video delayed for intro')
        setTimeout(function(){
        player.play();
        }, 7000);

        } else {


        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {


//          setTimeout(function(){
//
//          player.play();
//          player.requestFullscreen();
//
//          }, 1000);

         } else {


          setTimeout(function(){

          player.play();

          }, 300);

         }


        }
        player.on('ended', function() {



        if( vm.$cookie.get('first') === 'false' || vm.$cookie.get('first') === null){

          vm.$cookie.set('first', 'true', 1);
          vm.$emit('closeIntro');

        }



        });
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


        this.$emit.closePlayer();
      },
      onPlayerEnded() {

        this.$emit.closeIntro();


      },

    }



  }


</script>
