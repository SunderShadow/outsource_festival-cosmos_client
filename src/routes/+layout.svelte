<script lang="ts" module>
  export function hidePage(node: HTMLElement) {
    return {
      duration: 300,
      css: (t: number) => {
        return `
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: ${t};
          z-index: -1;
        `
      }
    }
  }

  export function showPage(node: HTMLElement) {
    return {
      duration: 300,
      css: (t: number, u: number) => {
        return `
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: ${t};
          z-index: 1
        `
      }
    }
  }
</script>
<script lang="ts">
  import "./env.scss"
  import "./global.scss"
  import Stepper from "$lib/components/Stepper/Stepper.svelte"
  import {onMount, setContext} from "svelte"
  import {page} from "$app/state"

  import {detect as detectSwipe} from '$lib/tools/swipe-detect'
  import Header from "./+layout/Header.svelte"
  import {afterNavigate, beforeNavigate} from "$app/navigation"
  import {store as animationStore} from "$lib/store/entrance_animation"
  import steps from "./stepper"

  animationStore.set({
    animationEnded: page.url.pathname !== '/'
  })

  let {
    children
  } = $props()

  let toNextSection: Function = $state(() => {})
  let toPreviousSection: Function = $state(() => {})

  let canChangePageByWheel = $state.raw(false)

  onMount(() => {
    window.addEventListener('wheel', (e) => {
      if (!canChangePageByWheel) {
        return
      }

      if (e.deltaY > 0) {
        toNextSection()
      } else if (e.deltaY < 0) {
        toPreviousSection()
      }
    })

    detectSwipe(document.body, (direction: 'left' | 'right' | 'up' | 'down') => {
      if (config.noChangeOnSwipe) {
        return
      }

      if (direction === 'left') {
        toNextSection()
      }
      if (direction === 'right') {
        toPreviousSection()
      }
    })
  })

  const darkPages = [
    '/organizers',
    '/baikonur'
  ]

  // If one of these pages is current
  // And another one is next to load
  // Prevent from reloading
  const noReloadingPages: Array<Array<RegExp>> = [
    [new RegExp('/organizers'), new RegExp('/baikonur')],
    [new RegExp('/restaurants'), new RegExp('\/restaurants\/*')],
    [new RegExp('/news'), new RegExp('\/news\/*')]
  ]

  afterNavigate(() => {
    setTimeout(() => {
      canChangePageByWheel = true
    }, 300)
  })

  beforeNavigate((navigation) => {
    canChangePageByWheel = false
    for (const pages of noReloadingPages) {
      let pageFromIsNoReloadOne = false
      let pageToIsNoReloadOne = false

      for (const _page of pages) {
        if (!pageFromIsNoReloadOne && _page.test(navigation.from.url.pathname)) {
          pageFromIsNoReloadOne = true
        }

        if (!pageToIsNoReloadOne && _page.test(navigation.to.url.pathname)) {
          pageToIsNoReloadOne = true
        }

        if (pageFromIsNoReloadOne && pageToIsNoReloadOne) {
          return
        }
      }

      pageFromIsNoReloadOne = pages.includes(page.url.pathname)
    }

    currentPagePath = navigation.to.url.pathname
  })

  let currentPagePath: string = $state.raw(page.url.pathname)

  const darkParts = $derived(darkPages.includes(page.url.pathname))
  let config = $state({
    noChangeOnSwipe: false,
    darkHeader: false
  })

  setContext('layout-config', config)
</script>

<Header dark={darkParts || config.darkHeader}/>

<div class="wrapper">
  <div class="stepper">
    <Stepper
        dark={darkParts}
        {steps}
        activeHref={page.url.pathname}

        bind:toNext={toNextSection}
        bind:toPrevious={toPreviousSection}
    />
  </div>
  {#key currentPagePath}
    <div in:showPage out:hidePage>
      {@render children()}
    </div>
  {/key}
</div>

<style lang="scss">
  @use "$lib/env";
  @use "$lib/scss/mixins/scr";

  .wrapper {
    display: contents;

    > .stepper {
      position: absolute;
      top: 122px;
      width: 100%;
      transform: translateX(-12px);
      z-index: var(--stepper-z-index);
      overflow: hidden;

      @include scr.desktop {
        z-index: calc(var(--header-z-index) + 1);
        padding-top: var(--stepper-desktop-top-offset);
        top: 0;
        left: 20px;
        transform: none;
        width: var(--stepper-desktop-width);
      }
    }
  }
</style>