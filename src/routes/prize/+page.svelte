<script lang="ts">
  import bgMobile from "./assets/bg_top.png?enhanced&format=webp"
  import bgDesktop from "./assets/bg-desktop.png?enhanced&format=webp"

  import {desktopWidth} from "$lib/_env"
  import Souz from "./Souz/Souz.svelte"
  import {getContext} from "svelte"
  import MainPrize from "./MainPrize.svelte"

  const config = getContext('layout-config')
  config.darkHeader = false
</script>

<svelte:head>
  <title>Три шага к космодрому</title>
  <link rel="preload" as="image" href={bgMobile.img.src} fetchpriority="high" media="width < {desktopWidth}">
</svelte:head>

<div
    class="wrapper"
    style:--bg-mobile="url('{bgMobile.img.src}')"
>
  <main>
    <div class="main-prize">
      <MainPrize />
    </div>

    <Souz />
  </main>
</div>

<style lang="scss">
  @use "$lib/env";
  @use "$lib/scss/mixins/scr";

  .main-prize {
    @include scr.desktop {
      display: none;
    }
  }

  .wrapper {
    background-size: 100%;
    background-repeat: no-repeat;
    background-color: #FFF;

    @include scr.tablet-and-lower {
      background-image: var(--bg-mobile);
    }
  }

  main {
    @include scr.tablet-and-lower {
      padding-top: calc(389px - calc(375px - 100vw));
    }

    color: var(--text-color-dark-bg);
  }

  #three-steps-to-cosmodrome {
    --circle-offset: 25px;
    position: relative;

    @media (min-width: 400px) {
      --circle-offset: 30px;
    }

    @media (min-width: 450px) {
      --circle-offset: 35px;
    }

    @media (min-width: 550px) {
      --circle-offset: 55px;

      margin-top: 30px;
    }

    @media (min-width: 750px) {
      margin-bottom: -30px;
    }

    @media (min-width: 850px) {
      --circle-offset: 85px;

      margin-top: 100px;
    }

    .content {
      position: relative;
      max-width: 282px;
      margin-left: auto;
      margin-right: auto;
      text-align: center;

      z-index: 1;
    }

  }

  h2 {
    font-size: 24px;
    font-weight: 400;
    letter-spacing: -3%;

    line-height: 40px;
    margin: 0;
  }

  p {
    margin-top: 20px;
    font-size: 13px;
    line-height: 16px;
    margin-bottom: 0;
  }
</style>