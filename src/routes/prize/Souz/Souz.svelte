<script lang="ts">
  import bgMobile from "./assets/bg-desktop.jpg?enhanced&format=webp&w=475&h=1900&quality=100"
  import bgTablet from "./assets/bg-desktop.jpg?enhanced&format=webp&w=768&h=1900&quality=100"
  import bgDesktop from "./assets/bg-desktop.jpg?enhanced&format=webp&w=1920&h=2900&quality=100"

  import Countdown from "$lib/components/Countdown/Countdown.svelte"

  import {desktopWidth, mobileWidth} from "$lib/_env"
  import ThreeStepsToCosmodrome from "../ThreeStepsToCosmodrome.svelte"
  import Partners from "../Partners.svelte"
  import MainPrize from "../MainPrize.svelte"
</script>

<svelte:head>
  <link rel="preload" as="image" href={bgMobile.img.src} fetchpriority="high" media="(width < {desktopWidth})">
  <link rel="preload" as="image" href={bgTablet.img.src} fetchpriority="high" media="(width < {desktopWidth}) and (width > {mobileWidth})">
  <link rel="preload" as="image" href={bgDesktop.img.src} fetchpriority="high" media="(width > {desktopWidth})">
</svelte:head>

<section
    class="wrapper"
    style:--bg-desktop="url('{bgDesktop.img.src}')"
    style:--bg-tablet="url('{bgDesktop.img.src}')"
    style:--bg-mobile="url('{bgMobile.img.src}')"
>
  <div class="content">
    <Countdown />

    <h1>
      <span>ДО ЗАПУСКА КОСМИЧЕСКОГО КОРАБЛЯ</span>
      <br>
      <span>СОЮЗ МС-29</span>
    </h1>

    <ThreeStepsToCosmodrome />

    <div class="main-prize">
      <MainPrize />
    </div>

    <div class="partners">
      <Partners />
    </div>
  </div>
</section>

<style lang="scss">
  @use "$lib/env";
  @use "$lib/scss/mixins/scr";

  .partners {
    padding-bottom: 46px;
    margin-top: 87px;
    background: linear-gradient(180deg, rgba(183, 182, 189, 0) 0%, rgba(96, 98, 101, 0.4) 23.6%, rgba(31, 36, 47, 0.5) 40.32%, #1F2533 75.14%);

    @include scr.desktop {
      background: linear-gradient(180deg, rgba(183, 182, 189, 0) 0%, rgba(31, 36, 47, 0.5) 20.32%, #1F2533 55.14%);
    }
  }

  .main-prize {
    @include scr.tablet-and-lower {
      display: none;
    }
  }

  .wrapper {
    position: relative;
    background-repeat: no-repeat;

    :global {
      #three-steps-to-cosmodrome {
        margin-top: 65px;
      }
    }

    @include scr.desktop {
      background-image: var(--bg-desktop);
      background-position: 42% -700px;
      background-size: 150%;

      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background-color: rgba(#000, .2);
        background-position: 42% -700px;
      }
    }

    @include scr.tablet {
      background-image: linear-gradient(rgba(#000, .35) 400px, rgba(#000, .1)), var(--bg-tablet);
      background-position: 45% -200px;
    }

    @include scr.mobile {
      background-image: linear-gradient(rgba(#000, .35) 400px, rgba(#000, .1)), var(--bg-mobile);
      background-position: center -20px;
    }
  }

  .content {
    position: relative;
    padding-top: 84px;

    @include scr.desktop {
      padding-top: 176px;
    }
  }

  h1 {
    font-size: 16px;
    font-weight: 300;
    text-align: center;
    margin-top: 95px;

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