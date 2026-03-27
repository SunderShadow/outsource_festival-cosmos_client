<script lang="ts">
  import animation_bgMobile from "./assets/animation_bg.png?enhanced&format=webp"
  import animation_bgDesktop from "./assets/animation_bg-desktop.png?enhanced&format=webp"
  import bg2 from "./assets/bg2.png?enhanced&format=webp"
  import bg2Desktop from "../assets/bg-desktop.png?enhanced&format=webp"

  import AnimationCircle from "./AnimationCircle.svelte"
  import Logo from "$lib/components/Logo.svelte"
  import Roscosmos from "$lib/components/_logos/Roscosmos.svelte"
  import Poehaly65 from "$lib/components/_logos/Poehaly65.svelte"
  import GastronomyInstitute from "$lib/components/_logos/GastronomyInstitute.svelte"
  import ProstoCosmos from "$lib/components/_logos/ProstoCosmos.svelte"
  import PSB from "$lib/components/_logos/PSB.svelte"
  import {tabletWidth} from "$lib/_env"
  import Sber from "$lib/components/_logos/Sber.svelte"
  import Sisoev from "$lib/components/_logos/Sisoev.svelte"
  import Inkerman from "$lib/components/_logos/Inkerman.svelte"
  import CosmosHotels from "$lib/components/_logos/CosmosHotels.svelte"
  import {onDestroy, onMount} from "svelte"
  import {browser} from "$app/environment"

  let hidden = $state.raw(false)
  let {
    onAnimationEnd
  } = $props()

  function hide() {
    setTimeout(() => {
      hidden = true
    }, 1000)
  }

  onMount(() => {
    if (browser) {
      document.body.style.overflow = 'hidden'
      document.body.style.height = '1000svh'
    }
  })

  onDestroy(() => {
    if (browser) {
      document.body.style.removeProperty('overflow')
      document.body.style.removeProperty('height')
    }
  })

  let nextBgActive = $state.raw(true)
  function nextBg() {
    setTimeout(() => {
      nextBgActive = false
    }, 1000)
  }
</script>

<svelte:head>
  <link rel="preload" as="image" href={animation_bgMobile.img.src} fetchpriority="high" media="width < {tabletWidth}">
  <link rel="preload" as="image" href={animation_bgDesktop.img.src} fetchpriority="high" media="width > {tabletWidth}">
</svelte:head>

<div
    class="bg"
    style:--bg-mobile="url('{animation_bgMobile.img.src}')"
    style:--bg-desktop="url('{animation_bgDesktop.img.src}')"
    class:hidden
    ontransitionend={nextBg}
>
</div>

<div class="content" class:hidden>
  <div class="circle">
    <AnimationCircle />
  </div>
  <div class="text" onanimationend={hide}>
    <Logo />
    <div>
      Г А С Т Р О Н О М И Ч Е С К И Й<br>
      Н А Ц И О Н А Л Ь Н Ы Й<br>
      Ф Е С Т И В А Л Ь<br>
    </div>
  </div>
</div>

<div
   class="bg2"
   class:hidden={!nextBgActive}

   style:--bg-mobile="url('{bg2.img.src}')"
   style:--bg-desktop="url('{bg2Desktop.img.src}')"
 >
  <div class="bg2-content" ontransitionend={() => {onAnimationEnd()}}>
    <div>
      <Roscosmos />
      <Poehaly65 />
      <GastronomyInstitute />
      <div class="prosto_cosmos white"><ProstoCosmos /></div>
      <div class="sber white"><Sber /></div>
      <div class="sisoev white"><Sisoev /></div>
      <div class="inkerman white"><Inkerman /></div>
      <div class="comso_hotels white"><CosmosHotels /></div>
    </div>
  </div>
</div>

<style lang="scss">
  @use "$lib/env";

  @keyframes animate-circle {
    0% {
      width: 0;
      opacity: 0;
    }

    50% {
      opacity: .5;
    }
    100% {
      width: 800px;
      opacity: 0;
    }
  }

  @keyframes animate-bg {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
  @keyframes animate-text {
    0% {
      transform: scale(.8);
      opacity: 0;
    }

    100% {
      transform: scale(1);
      opacity: 1;
    }
  }

  .bg2 {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;

    z-index: 99;

    background-size: cover;
    opacity: 1;

    transition-property: transform, opacity;
    transition-duration: 1000ms;

    @media (min-width: env.$tablet-width) {
      :global svg {
        *[fill=black] {
          fill: #fff;
        }
      }
    }

    @media (max-width: env.$tablet-width) {
      background-image: var(--bg-mobile);
    }

    @media (min-width: env.$tablet-width) {
      background-image: var(--bg-desktop);
    }

    &.hidden {
      opacity: 0;
    }

    &.hidden &-content {
      height: 600px;
      opacity: 0;

      & > div {
        transform: translateX(100px);
        @media (min-width: env.$tablet-width) {
          transform: translate(-50%, -300px);
        }
      }
    }

    &-content {
      display: flex;

      position: absolute;
      bottom: 0;
      right: 0;
      left: 0;

      height: 418px;

      @media (max-width: env.$tablet-width) {
        background: linear-gradient(180deg, rgba(247, 248, 248, 0) 0%, #F7F8F8 30.61%, #F7F8F8 100%);
      }

      transition-property: height, opacity;
      transition-duration: 1000ms;

      & > div {
        position: fixed;
        bottom: 70px;
        left: 50%;

        transform: translateX(-50%);
        width: 300px;

        @media (min-width: env.$tablet-width) {
          top: 89px;
          width: 400px;
          left: 20%;
          height: 150px;

          :global {
            svg {
              max-height: 34px;
              height: 100%;
              width: auto;
            }
          }
          .white :global svg *[fill] {
            fill: #FFF;
          }
        }

        display: flex;
        flex-wrap: wrap;
        gap: 24px;
        align-items: center;
        justify-content: center;
        margin-left: auto;
        margin-right: auto;

        transition-property: transform;
        transition-duration: 700ms;
      }
    }
  }

  .bg {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;

    z-index: 100;

    transition: opacity 700ms;
    background-color: #000;
    background-size: cover;

    @media (max-width: env.$tablet-width) {
      background-image: var(--bg-mobile);
    }

    @media (min-width: env.$tablet-width) {
      background-image: var(--bg-desktop);
    }

    &.hidden {
      opacity: 0;
    }

    &::before {
      content: '';
      position: absolute;

      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #0D0F10;
      opacity: 0;

      animation: 1000ms animate-bg linear;
    }
  }

  .content {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    opacity: 1;
    z-index: 100;

    transition-property: transform, opacity;
    transition-duration: 700ms;

    &.hidden {
      opacity: 0;
      transform: translate(-50%, -65%);
    }

    .circle {
      :global svg {
        opacity: 0;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        animation: 1000ms animate-circle;
        height: auto;
      }
    }
  }

  .text {
    color: #F0F3F5;
    font-size: 10px;
    text-align: center;

    animation: animate-text 1000ms;

    :global svg {
      display: block;
      max-width: fit-content;
      margin-left: auto;
      margin-right: auto;

      width: auto;
      height: 120px;
    }

    div {
      margin-top: 10px;
    }
  }
</style>