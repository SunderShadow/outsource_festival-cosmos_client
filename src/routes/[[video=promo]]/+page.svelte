<script lang="ts">
  import bgMobile from "./assets/bg-mobile.png?enhanced&format=webp"
  import bgTablet from "./assets/bg-tablet.png?enhanced&format=webp&quality=100"
  import bgDesktop from "./assets/bg-desktop.png?enhanced&format=webp&quality=100"

  import EntranceAnimation from "./+page/EntranceAnimation.svelte"

  import {desktopWidth, tabletWidth} from "$lib/_env"

  import {store as animationStore} from "$lib/store/entrance_animation"
  import {getContext, onMount} from "svelte"
  import videoDesktop from "./assets/promo-desktop.mp4"
  import videoMobile from "./assets/promo.mp4"
  import {page} from "$app/state"
  import {goto} from "$app/navigation"

  import FirstInCosmos from "./FirstInCosmos.svelte"
  import Partners from "./Partners.svelte"
  import Mission from "./Mission.svelte"

  const config = getContext('layout-config')

  config.noChangeOnSwipe = !$animationStore.animationEnded

  function onPageEntranceAnimationEnd() {
    animationStore.set({animationEnded: true})
    config.noChangeOnSwipe = false
  }

  let showPromo = $derived(!!page.params.video)
  let videoSrc = $state.raw()

  let wrapperEl = $state.raw()
  onMount(() => {
    if (window.innerWidth > tabletWidth) {
      videoSrc = videoDesktop
    } else {
      videoSrc = videoMobile
    }
  })
</script>

<svelte:head>
  <title>Первые в космосе</title>
  <link rel="preload" as="image" href={bgMobile.img.src} fetchpriority="high" media="(width < {desktopWidth})">
  <link rel="preload" as="image" href={bgTablet.img.src} fetchpriority="high" media="(width < {desktopWidth}) and (width > {tabletWidth})">
  <link rel="preload" as="image" href={bgDesktop.img.src} fetchpriority="high" media="(width => {desktopWidth})">
</svelte:head>

<!-- Entrance Animation -->
{#if !$animationStore.animationEnded}
  <EntranceAnimation onAnimationEnd={onPageEntranceAnimationEnd}/>
{/if}

<div
  bind:this={wrapperEl}
  class="page-wrapper"
  style:--bg-desktop="url('{bgDesktop.img.src}')"
  style:--bg-tablet="url('{bgTablet.img.src}')"
  style:--bg-mobile="url('{bgMobile.img.src}')"
>
<!--  Promo video -->
  {#if showPromo}
    <div class="promo-wrapper">
      <video onclick={() => {goto('/')}} src={videoSrc} autoplay preload muted></video>
    </div>
  {/if}

  <main>
    <div class="content-wrapper">
      <div class="inline-desktop">
        <FirstInCosmos />

        <hr>

        <Mission />
      </div>

      <hr>

      <Partners />
    </div>
  </main>
</div>

<style lang="scss">
  @use "$lib/scss/mixins/scr";
  @use "$lib/env";

  @include scr.desktop {
    .inline-desktop {
      display: flex;
      gap: 24px;
    }
  }

  .promo-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    overflow: hidden;
    background-color: #000;
    display: flex;

    flex-direction: column;
    z-index: calc(var(--header-z-index) + 1);

    video {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  hr {
    position: relative;
    background-color: #828A9D33;
    width: 100%;
    height: 1px;
    border: none;
    margin-top: 24px;
    margin-bottom: 24px;

    @include scr.desktop {
      display: none;
    }
  }

  p {
    font-size: 13px;
    max-width: 282px;
    color: var(--text-color-bright-bg);
    line-height: 16px;

    @include scr.desktop {
      max-width: 423px;
      margin-bottom: 0;
      color: #FFFFFF;
      font-size: 13px;
      line-height: 16px;
    }
  }

  main {
    padding: 20px;

    @include scr.tablet-and-lower {
      margin-top: 90px;
      background: #F7F8F8;
    }
  }

  .page-wrapper {
    --delta-y: 0px;

    @media (max-height: 960px) {
      --delta-y: -100px;
    }

    @media (max-height: 824px) {
      --delta-y: -150px;
    }

    width: 100%;
    min-height: 100svh;

    background-repeat: no-repeat;
    background-position: top right;

    @include scr.mobile {
      background-position: top left;
      background-image: var(--bg-mobile);
    }

    @include scr.tablet-and-lower {
      padding-top: 268px;
      background-position: top left;
    }

    @include scr.tablet {
      background-image: var(--bg-tablet);
      background-position: top center;
    }

    @include scr.desktop {
      background-size: cover;
      background-position: left;
      background-image: var(--bg-desktop);
    }
  }

  .content-wrapper {
    @include scr.tablet-and-lower {
      max-width: 500px;
      margin-left: auto;
      margin-right: auto;
    }

    @include scr.mobile {
      max-width: 308px;
    }

    @include scr.desktop {
      max-width: 718px;
      margin-top: 142px;
      margin-left: 136px;
      color: #FFFFFF;
    }
  }

  .desktop-transform {
    display: contents;

    @include scr.desktop {
      width: 720px;
      display: block;
      position: fixed;
      top: calc(550px + var(--delta-y));
    }
  }

</style>