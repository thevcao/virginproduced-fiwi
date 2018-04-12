<template>


  <div class="intro">

      <Player
              src = "/wp-content/themes/virginproduced/dist/img/intro.mp4"
             :first="first"
              @closeIntro="closeIntro"
              >
      </Player>
    <h4 class="glitching skip" title="Skip">
      <a
           href="#"
           v-on:click="closeIntro()"
           >Skip</a>
    </h4>
  </div>
</template>


<script>
import Player from '../components/home-player.vue'


export default {

  components: {
    Player
  },
  props: {

    first: {}

  },
    mounted() {
//      console.log('this is current player instance object', this.player)
    },
  computed: {
//    player() {
//      return this.$refs.Player.player
//    }
  },
  methods: {

    closeIntro(){


      var vm = this;
      vm.$cookie.set('first', 'true', 1);
      vm.$emit('closeIntro');
//      var el = document.querySelector('.intro');
//      Velocity(el, {
//        opacity: 0
//      }, {
//        complete: function(){
//
//          el.style.display="none";
//
//        },
//        delay: 300
//      })

    },

  },

}

</script>


<style lang="scss">
@import '../../src/scss/main.scss';

#app .intro {
    background: white;
    position: fixed;
    z-index: 1000000;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100vh;
    width: 100%;
    pointer-events: none;

  .video-js {

    position: absolute;
    top: 0;
    height: 100%;
    padding-bottom: 0;

    video {

      object-fit: cover;
    }

    .vjs-control-bar, .vjs-big-play-button {

      display: none;
    }
  }

  .skip {
      position: absolute;
      right: 2rem;
      bottom: 2rem;
      line-height: 1;
      margin: 0;
      z-index: 1;
      color: white;
      text-transform: uppercase;
      font-size: 2rem;
      pointer-events: all;
      font-family: 'Heroic Condensed';
      text-transform: uppercase;
      color: #E01931;
      line-height: 1;

      a {

        color: $red;
      }
  }
}

</style>
