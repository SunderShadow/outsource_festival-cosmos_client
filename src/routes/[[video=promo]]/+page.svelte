<script lang="ts">
  import bgMobile from "./assets/bg-mobile.png?enhanced&format=webp"
  import bgDesktop from "./assets/bg-desktop.png?enhanced&format=webp"

  import EntranceAnimation from "./+page/EntranceAnimation.svelte"

  import Button from "$lib/components/Button/Button.svelte"
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
  <link rel="preload" as="image" href={bgMobile.img.src} fetchpriority="high" media="width < {desktopWidth}">
  <link rel="preload" as="image" href={bgDesktop.img.src} fetchpriority="high" media="width => {desktopWidth}">
</svelte:head>

<!-- Entrance Animation -->
{#if !$animationStore.animationEnded}
<!--  <EntranceAnimation onAnimationEnd={onPageEntranceAnimationEnd}/>-->
{/if}

<div
  class="page-wrapper"
  style:--bg-desktop="url('{bgDesktop.img.src}')"
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
      <FirstInCosmos />

      <div class="actions">
        <Button dark filled href="/restaurants">Выбрать ресторан</Button>
        <Button dark filled href="/prize">Участвовать в розыгрыше</Button>
        <Button dark filled href="/promo">
          <span>Видеоролик</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22Z" stroke="white" stroke-linejoin="round"/>
            <path d="M10 12.0001V8.53613L13 10.2681L16 12.0001L13 13.7321L10 15.4641V12.0001Z" stroke="white" stroke-linejoin="round"/>
          </svg>

        </Button>
      </div>

      <hr>

      <Mission />

      <hr>

      <Partners />
    </div>
  </main>
</div>

<style lang="scss">
  @use "$lib/scss/mixins/scr";
  @use "$lib/env";

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
      background: linear-gradient(180deg, rgba(247, 248, 248, 0) 0%, #F7F8F8 110px);
    }
  }

  .page-wrapper {
    --delta-y: 0px;

    @media (max-height: 960px) {
      --delta-y: -100px;
    }

    @media (max-height: 824px) {
      --delta-y: -200px;
    }

    width: 100%;
    height: 100svh;

    background-size: 100%;
    background-repeat: no-repeat;
    background-position: top right;

    @include scr.tablet-and-lower {
      padding-top: 268px;
      background-image: var(--bg-mobile);
    }

    @include scr.desktop {
      background-size: cover;
      background-position-x: right;
      background-image: var(--bg-desktop);
    }
  }

  .content-wrapper {
    @include scr.tablet-and-lower {
      margin-top: 90px;
      max-width: 308px;
      margin-left: auto;
      margin-right: auto;
    }

    @include scr.desktop {
      position: fixed;
      top: var(--stepper-desktop-top-offset);
      left: calc(var(--stepper-desktop-width) + 36px);

      color: #FFFFFF;
    }
  }

  .actions {
    margin-top: 16px;

    :global .button {
      display: flex;
      max-width: fit-content;
      height: 46px;
      box-sizing: border-box;

      &:last-child {
        line-height: 75%;
      }
    }

    @include scr.desktop {
      position: fixed;
      top: calc(550px + var(--delta-y));
      display: flex;
      flex-wrap: wrap;
      width: 328px;
      gap: 16px;

      justify-content: space-between;
      left: 158px;

      :global .button {
        &:first-child {
          width: 136px;
          text-wrap: nowrap;
          font-size: 10px;
        }

        &:nth-child(2) {
          width: 176px;
          text-wrap: nowrap;
          font-size: 10px;
        }

        &:last-child {
          flex-grow: 1;
          max-width: 100%;
          justify-content: space-between;
        }

        &:not(:hover) {
          background-color: transparent;
        }

        &:hover {
          background-color: rgba(255, 255, 255, 0.2);
        }

        --btn-color: #fff;

        font-size: 12px;
      }
    }

    @include scr.tablet-and-lower {
      :global .button + .button {
        margin-top: 12px;
      }
    }
  }

</style>