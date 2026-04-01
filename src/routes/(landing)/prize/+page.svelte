<script lang="ts">
  import bgMobile from "./assets/bg.png?enhanced&format=webp"
  import bgTablet from "./assets/bg-desktop.jpg?enhanced&format=webp&w=768&h=1900&quality=100"
  import bgDesktop from "./assets/bg-desktop.jpg?enhanced&format=webp&w=1920&h=2900&quality=100"

  import Countdown from "$lib/components/Countdown/Countdown.svelte"

  import {desktopWidth, mobileWidth} from "$lib/_env"
  import ThreeStepsToCosmodrome from "./ThreeStepsToCosmodrome.svelte"
  import Partners from "./Partners.svelte"
  import MainPrize from "./MainPrize.svelte"
  import Roscosmos from "$lib/components/_logos/Roscosmos.svelte"
  import Poehaly65 from "$lib/components/_logos/Poehaly65.svelte"
</script>

<svelte:head>
  <title>Главный приз</title>
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
    <div class="top-logos"><Roscosmos /><Poehaly65 /></div>

    <h1>
      <span>ДО ЗАПУСКА КОСМИЧЕСКОГО КОРАБЛЯ</span>
      <br>
      <span>СОЮЗ МС-29</span>
    </h1>

    <Countdown />

    <ThreeStepsToCosmodrome />

    <div class="main-prize">
      <hr style="">

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

  .wrapper {
    color: #FFF;
  }

  .top-logos {
    height: 16px;
    width: fit-content;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 20px;

    display: flex;
    gap: 17px;

    :global svg {
      height: 16px;
      width: fit-content;

      @include scr.desktop {
        height: 32px;
      }

      *[fill=black] {
        fill: #FFF;
      }
    }

    @include scr.desktop {
      margin-bottom: 20px;
    }
  }

  .partners {
    padding-bottom: 46px;
    background: linear-gradient(180deg, rgba(31, 36, 47, 0) 0%, #1F2533 100%);

    @include scr.tablet-and-lower {
      margin-top: 87px;
    }
  }

  #desktop_logos {
    display: block;
    width: fit-content;
    margin-left: auto;
    margin-right: auto;

    @include scr.tablet-and-lower {
      display: none;
    }
  }
  hr {
    border-color: #FFFFFF33;
    padding-left: -50px;
    max-width: 965px;
    margin: 44px auto;
  }

  .wrapper {
    position: relative;
    background-repeat: no-repeat;
    padding-top: 150px;

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
      background-position: top center;
    }
  }

  .content {
    position: relative;
    padding-top: 84px;

    @include scr.desktop {
      padding-top: 0;
    }
  }

  h1 {
    font-size: 16px;
    font-weight: 300;
    text-align: center;

    margin-bottom: 26px;
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