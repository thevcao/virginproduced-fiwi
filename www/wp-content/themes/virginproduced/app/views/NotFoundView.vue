<template>
    <div class="container main ml-lg-0 404">
    <video src="/wp-content/themes/virginproduced/src/img/404.mp4" autoplay muted loop preload="auto" class="video-404"></video>
      <div class="row">
        <div class="col-12">
          <h1 class="glitching large" title="Pardon the disruption">Pardon the disruption</h1>
          <div class="row mt-5 mb-5">
            <div class="col-sm-6">
              <MainNav
                       :pages="this.$parent.items.items"
                       ></MainNav>
            </div>
            <div class="col-sm-5 offset-sm-1">
              <div class="offerings">
              <p>Offerings</p>
              <OfferingsMenu
                             :pages="this.$parent.offerings.items"
                             ></OfferingsMenu>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
import { orderBy } from 'lodash'
//import MenuService from '../services/MenuService'
//import OfferingsMenuService from '../services/OfferingsMenuService'
//import GlobalService from '../services/GlobalService'
import MainNav from '../components/MainNav.vue'
import OfferingsMenu from '../components/OfferingsMenu.vue'
import SocialLinks from '../components/SocialLinks.vue'
export default {
  components: { MainNav, OfferingsMenu, SocialLinks },
}
</script>
<style lang="scss">
@import '../../src/scss/main.scss';
  .main-menu {
    padding: 0;
    margin: 0;
    list-style: none;
    li {
      text-align: left;
      margin: 0;
      padding: 0;
      line-height: 1.25;
      a {
        display: block;
        text-align: left;
        font-weight: 900;
        text-decoration: none;
        //      transition: .3s ease;
        padding: 1rem 0;
        font-size: 3rem;
        line-height: 1;
        letter-spacing: -.1rem;
        text-transform: uppercase;
        color: $grey;
        @include textGlitch("textGlitch", 17, $grey, white, $green, $purple, 450, 66);
              &:hover {
                //        color: black;
                &:before  {
                  background: white
                }
                &:after {
                  color: $purple
                }
              }
        //      @include glitch;
      }
    }
  }
    .offerings {
    p {
      font-weight: bold;
      font-size: 1.5rem;
      color: $grey;
      margin: 1rem 0 1rem;
      text-transform: uppercase;
      line-height: 1;
    }
    ul {
      list-style: none;
      margin: 0;
      padding: 0;
      li {
        a {
          font-family: 'Heroic Condensed';
          font-size: 3rem;
          color: $purple;
          font-weight: normal;
          line-height: 1;
          padding: .5rem 0;
          display: block;
          text-transform: uppercase;
          @include textGlitch("offerings", 17, $purple, white, $red, $green, 450, 66);
          //          letter-spacing: .25rem;
        }
      }
    }
  }
  .video-404 {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100%;
    z-index: -1;
    object-fit: cover;
    font-family: 'object-fit: cover;';
    opacity: .1;
  }
</style>
