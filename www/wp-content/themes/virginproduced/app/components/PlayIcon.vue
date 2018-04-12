<template>
  <div class="">
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
   width="32.974px" height="34px" viewBox="0 0 32.974 34" style="enable-background:new 0 0 32.974 34;" xml:space="preserve">

<g id="Home">
  <g id="Home---Desktop" transform="translate(-226.000000, -661.000000)">
    <g>
      <path id="Shape" class="st0" d="M258.974,677.487c0-9.122-7.365-16.487-16.487-16.487S226,668.365,226,677.487
        c0,9.122,7.365,16.487,16.487,16.487S258.974,686.609,258.974,677.487z M239.006,670.746l10.258,6.741l-10.258,6.741V670.746z" fill="#ffffff"/>
    </g>
  </g>
</g>
</svg>
    <div class="glitch-1">
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
   width="32.974px" height="34px" viewBox="0 0 32.974 34" style="enable-background:new 0 0 32.974 34;" xml:space="preserve">

<g id="Home">
  <g id="Home---Desktop" transform="translate(-226.000000, -661.000000)">
    <g>
      <path id="Shape" class="st0" d="M258.974,677.487c0-9.122-7.365-16.487-16.487-16.487S226,668.365,226,677.487
        c0,9.122,7.365,16.487,16.487,16.487S258.974,686.609,258.974,677.487z M239.006,670.746l10.258,6.741l-10.258,6.741V670.746z" fill="#50E3C2"/>
    </g>
  </g>
</g>
</svg>
    </div>
    <div class="glitch-2">
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
   width="32.974px" height="34px" viewBox="0 0 32.974 34" style="enable-background:new 0 0 32.974 34;" xml:space="preserve">

<g id="Home">
  <g id="Home---Desktop" transform="translate(-226.000000, -661.000000)">
    <g>
      <path id="Shape" class="st0" d="M258.974,677.487c0-9.122-7.365-16.487-16.487-16.487S226,668.365,226,677.487
        c0,9.122,7.365,16.487,16.487,16.487S258.974,686.609,258.974,677.487z M239.006,670.746l10.258,6.741l-10.258,6.741V670.746z" fill="#E01931"/>
    </g>
  </g>
</g>
</svg>
    </div>

  </div>
</template>

<script>



</script>


<style lang="scss" scoped>
@import '../../src/scss/main.scss';

  div {

    position: relative;
    width: 32px;
    height: 32px;
    display: inline-block;

    svg {

    width: 32px;
    height: 32px;


    }



  .glitch-1,
  .glitch-2 {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    opacity: 1;
  }
  .glitch-1 {}
  .glitch-2 {}
    .glitch-1,
    .glitch-2 {
      opacity: 1;
    }
    .glitch-1 {
      animation: textGlitch-anim-2-data-v-26ccff6c 3s infinite linear alternate-reverse;
      opacity: 1;
      z-index: 1;
    }
    .glitch-2 {
      animation: offerings-anim-2 3s infinite linear alternate-reverse;
      opacity: 1;
      z-index: 0;
    }

  }
</style>
