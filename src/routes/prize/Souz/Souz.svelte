<script lang="ts">
  import bgMobile from "./assets/bg.png?enhanced&format=webp"
  import bgDesktop from "./assets/bg-desktop.png?enhanced&format=webp"
  import decoration from "./assets/decoration.png?enhanced&format=webp"
  import decorationDesktop from "./assets/decoration-desktop.png?enhanced&format=webp"

  import Countdown from "$lib/components/Countdown/Countdown.svelte"
  import Roscosmos from "$lib/components/_logos/Roscosmos.svelte"
  import Poehaly65 from "$lib/components/_logos/Poehaly65.svelte"
  import ProstoCosmos from "$lib/components/_logos/ProstoCosmos.svelte"
  import CosmosHotels from "$lib/components/_logos/CosmosHotels.svelte"
  import Sber from "$lib/components/_logos/Sber.svelte"
  import Inkerman from "$lib/components/_logos/Inkerman.svelte"
  import GastronomyInstitute from "$lib/components/_logos/GastronomyInstitute.svelte"
  import {desktopWidth, tabletWidth} from "$lib/_env"
</script>

<svelte:head>
  <link rel="preload" as="image" href={bgMobile.img.src} fetchpriority="high" media="width < {desktopWidth}">
  <link rel="preload" as="image" href={bgDesktop.img.src} fetchpriority="high" media="width > {desktopWidth}">
</svelte:head>

<section
    class="wrapper"
    style:--bg-desktop="url('{bgDesktop.img.src}')"
    style:--bg-mobile="url('{bgMobile.img.src}')"
>
  <div class="content">
    <Countdown />

    <h1>
      <span>ДО ЗАПУСКА КОСМИЧЕСКОГО КОРАБЛЯ</span>
      <br>
      <span>СОЮЗ МС-29</span>
    </h1>

    <div class="logos">
      <Roscosmos />
      <Poehaly65 />
      <GastronomyInstitute />
      <div class="prosto_cosmos"><ProstoCosmos /></div>
      <div class="sber"><Sber /></div>
      <div class="inkerman"><Inkerman /></div>
      <div class="hotels"><CosmosHotels /></div>
    </div>
  </div>

  <div class="decoration">
    <picture>
      <source srcset={decorationDesktop.img.src} media="(width > {tabletWidth}px)">
      <img src={decoration.img.src} alt="">
    </picture>
  </div>
</section>

<style lang="scss">
  @use "$lib/env";
  @use "$lib/scss/mixins/scr";

  .wrapper {
    position: relative;
    background-size: cover;
    background-repeat: no-repeat;
    padding-bottom: 227px;
    height: 908px;

    @include scr.tablet-and-lower {
      background-image: var(--bg-mobile);
    }

    @include scr.desktop {
      background-image: var(--bg-desktop);
      position: fixed;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      height: auto;
    }
  }

  .content {
    position: relative;
    padding-top: 184px;

    @media (min-width: 750px) {
      padding-top: 250px;
    }

    @media (min-width: 850px) {
      padding-top: 300px;
    }

    @include scr.desktop {
      padding-top: 20vh;
    }
  }

  h1 {
    font-size: 16px;
    font-weight: 300;
    text-align: center;
    margin-top: 140px;

    @include scr.desktop {
      font-size: 32px;
    }

    span:last-of-type {
      font-weight: 600;
      font-size: 2em;

    }
  }

  .logos {
    display: flex;
    gap: 24px;
    flex-wrap: wrap;
    max-width: 280px;
    margin-left: auto;
    margin-right: auto;

    @include scr.tablet-and-lower {
      justify-content: center;
    }

    @include scr.desktop {
      gap: 16px;
      max-width: 700px;
    }

    .inkerman :global svg {
      height: 10px;
    }
    .cosmos :global svg {
      height: 18px;
    }

    .prosto_cosmos,
    .sber,
    .inkerman,
    .hotels {
      :global svg *[fill]{
        fill: #FFF;
      }
    }

    :global svg {
      height: 23px;
      width: fit-content;

      *[fill=black] {
        fill: #FFF;
      }
    }

    &.partners :global svg {
      height: 30px;
    }
  }

  p {
    margin-top: 20px;
    font-size: 13px;
  }

  .decoration {
    position: absolute;
    bottom: -2px;
    left: 0;

    @include scr.desktop {
      bottom: -6px;
    }

    width: 100%;

    background-size: 100%;
    background-repeat: no-repeat;
    background-position: bottom;

    img {
      display: block;
      width: fit-content;
      margin-left: auto;
      margin-right: auto;
      max-height: 20vh;

      @include scr.tablet-and-lower {
        width: 100%;
        height: auto;
      }
    }
  }
</style>