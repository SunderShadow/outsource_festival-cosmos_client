<script lang="ts" module>
  export function hidePage(node: HTMLElement) {
    return {
      duration: 300,
      css: (t: number) => {
        return `
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
          position: fixed;
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
  import {onMount, setContext, tick} from "svelte"
  import {page} from "$app/state"

  import {detect as detectSwipe} from '$lib/tools/swipe-detect'
  import Header from "./+layout/Header.svelte"
  import {afterNavigate, beforeNavigate} from "$app/navigation"
  import {store as animationStore} from "$lib/store/entrance_animation"
  import steps from "./stepper"
  import client_type from "$lib/store/client_type"
  import Lenis from "lenis"

  animationStore.set({
    animationEnded: page.url.pathname !== '/'
  })

  let {
    children
  } = $props()

  let toNextSection: Function = $state(() => {})
  let toPreviousSection: Function = $state(() => {})

  let canChangePageByWheel = $state.raw(false)
  let canGoPrevPage = $state.raw(false)
  let canGoNextPage = $state.raw(false)
  // @ts-ignore
  let wrapperEl: HTMLDivElement = $state.raw()

  let lenis: Lenis

  function bindLenis() {
    lenis = new Lenis({
      autoRaf: true,
      wrapper: wrapperEl,
      duration: 1,
    })

    if ($client_type.isDesktop) {
      lenis.on('virtual-scroll', (e) => {
        if (canChangePageByWheel) {
          if (canGoNextPage && e.deltaY > 0) {
            toNextSection()
          }

          if (canGoPrevPage && e.deltaY < 0) {
            toPreviousSection()
          }
        }
      })

      lenis.on('scroll', (e) => {
        if (!canChangePageByWheel) {
          return
        }

        canGoNextPage = e.scroll === lenis.limit;
        canGoPrevPage = e.scroll === 0;
      })
    }
  }
  onMount(() => {
    window.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowUp') {
        toPreviousSection()
      }
      if (e.key === 'ArrowDown') {
        toNextSection()
      }
    })

    bindLenis()
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

  function lenisResize() {
    setTimeout(() => {
      lenis.resize()
      canChangePageByWheel = true

      canGoPrevPage = true
      if (lenis.limit === 0) {
        canGoNextPage = true
      }
    }, 500)
  }

  afterNavigate(() => {
    tick().then(() => {
      lenisResize()
    })
  })

  beforeNavigate((navigation) => {
    canChangePageByWheel = false
    canGoPrevPage = false
    canGoNextPage = false

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
    darkHeader: false,
  })

  setContext('layout-config', config)
</script>

<Header dark={darkParts || config.darkHeader}/>

<div class="stepper">
  <Stepper
      dark={darkParts}
      {steps}
      activeHref={page.url.pathname}

      bind:toNext={toNextSection}
      bind:toPrevious={toPreviousSection}
  />
</div>

<div class="wrapper" bind:this={wrapperEl}>
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
    @include scr.desktop {
      height: 100vh;
    }
    overflow: auto;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .stepper {
    position: fixed;
    top: 122px;
    width: 100%;
    transform: translateX(-12px);
    z-index: var(--stepper-z-index);
    overflow: hidden;

    @include scr.desktop {
      z-index: calc(var(--header-z-index) + 1);
      margin-top: var(--stepper-desktop-top-offset);
      padding-top: 120px;
      top: 0;
      bottom: 0;
      left: 20px;
      transform: none;
      width: var(--stepper-desktop-width);
    }
  }
</style>