<template>
  <div class="flex flex-column">
    <header-bar></header-bar>
    <section class="MainSection">
      <transition name="fade">
        <router-view class="view"></router-view>
      </transition>
      <vue-progress-bar></vue-progress-bar>
    </section>
    <footer-bar></footer-bar>
  </div>
</template>

<script>
import { orderBy } from 'lodash'

import HeaderBar from '../components/Header.vue'
import FooterBar from '../components/Footer.vue'
import VueProgressBar from 'vue-progressbar'
//import OfferingsMenuService from '../services/OfferingsMenuService'


export default {
 ready() {
    this.addOfferings()
  },
  components: { HeaderBar, FooterBar },
  updated: function(){

  console.log('global from the app');

  },
  mounted () {
    //  [App.vue specific] When App.vue is finish loading finish the progress bar
    this.$Progress.finish()
  },
  created () {
    //  [App.vue specific] When App.vue is first loaded start the progress bar
    this.$Progress.start()
    //  hook the progress bar to start before we move router-view
    this.$router.beforeEach((to, from, next) => {
      //  does the page we want to go to have a meta.progress object
      if (to.meta.progress !== undefined) {
        let meta = to.meta.progress
        // parse meta tags
        this.$Progress.parseMeta(meta)
      }
      //  start the progress bar
      this.$Progress.start()
      //  continue to next page
      next()
    })
    //  hook the progress bar to finish after we've finished moving router-view
    this.$router.afterEach((to, from) => {
      //  finish the progress bar
      this.$Progress.finish()
    })
  },
  methods: {

    beforeEnter: function (el) {
      el.style.opacity = 0
    },
    enter: function (el, done) {

      Velocity(el, { opacity: 1 }, { duration: 500 });


    },
    leave: function (el, done) {
      Velocity(el, { opacity: 0 }, { duration: 500 });

      Velocity(el, {
        display: 'none'
      }, { complete: done })
    },


  }
}

</script>

<style lang="stylus">

$primary = #5C5F61

.primary
  color: $primary

.bg-primary
  background-color: $primary

.b--primary
  border-color: $primary

.mw-85
  max-width: 85vw

.mw-87
  max-width: 87vw

*
  box-sizing: border-box
  margin: 0
  padding: 0

body
  background: #fff
  font-family: 'Montserrat', Helvetica, sans-serif
  font-weight: 300
  font-size: 0.9em
  height: 100%
  overflow-x: hidden

a
  text-decoration: none

p
  color: #444
  font-family: 'Open Sans', sans-serif, Arial

ul
  padding: 1em

ol
  @extend ul

h1, h2, h3, h4, h5, h6
  color: #343434
  transition: all 0.5s ease-in-out

img
  display: block
  width: 100%

button
  background: transparent

.Container
  margin: 0 auto
  max-width: 80vw

.Row
  display: flex
  flex-flow: row wrap
  margin: 0 -0.8em
  margin-bottom: 0.8em
  &:last-child
    margin-bottom: 0

.ColumnFull
  padding: 1em
  width: 100%

.Btn
  border-radius: 2em
  padding: 0.5em 1.5em
  font-size: 0.9em
  transition: all 0.5s ease-in-out

.Btn--primary
  border: 1px solid $primary
  color: $primary
  &:hover
    background: $primary
    color: #fff

.MainSection
  min-height: 100vh

.fade-enter-active, .fade-leave-active {
  transition-property: opacity;
  transition-duration: .3s;
}

.fade-enter-active {
  transition-delay: .3s;
}

.fade-enter, .fade-leave-active {
  opacity: 0
}


.spinner
  background: #fff
  height: 2px
  box-shadow: 0px 1px 3px #ccc

@media only screen and (max-width: 640px)

  .ColumnHalf
    width: 100%

@media all and (min-width: 600px)

  .global-column-padding
    padding: 1em

  .ColumnSeventy
    width: 75%
    @extend .global-column-padding

  .ColumnHalf
    width: 50%
    @extend .global-column-padding

  .ColumnThird
    width: 33.33%
    @extend .global-column-padding

  .ColumnQuarter
    width: 25%
    @extend .global-column-padding


</style>
