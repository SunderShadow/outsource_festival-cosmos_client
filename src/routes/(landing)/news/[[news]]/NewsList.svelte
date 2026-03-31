<script lang="ts">
  import {detect as detectSwipe} from "$lib/tools/swipe-detect.js"
  import {page} from "$app/state"
  import News from "./News.svelte"
  import {onDestroy, onMount} from "svelte"
  import client_type from "$lib/store/client_type"

  import Lenis from "lenis"

  let {
    percentScrolled = $bindable(),
    expanded = $bindable(),
    data
  } = $props()

  let newsEl: HTMLDivElement = $state()

  function expand() {
    if (!expanded) {
      expanded = true
      bindCloseOnSwipeDown()
    }
  }

  function shrink() {
    if (expanded) {
      expanded = false
      bindOpenOnSwipeUp()
    }
  }

  let unbindOpenEvent = () => {}
  function bindOpenOnSwipeUp() {
    const unbindOpenEvent = detectSwipe(newsEl, (direction, e) => {
      if (direction === 'up') {
        e.stopPropagation()
        expand()
        unbindOpenEvent()
      }

      if (page.params.news) {
        return
      }
    })
  }

  let unbindCloseEvent = () => {}
  function bindCloseOnSwipeDown() {
    if (newsEl.scrollTop === 0) {
      unbindCloseEvent = detectSwipe(newsEl, (direction, e ) => {
        if (direction === 'up') {
          unbindCloseEvent()
          e.stopPropagation()
        }

        if (direction === 'down') {
          shrink()
          unbindCloseEvent()
          e.stopPropagation()
        }
      })
    }
  }

  function onWheel(e: WheelEvent) {
    e.stopPropagation()
  }

  let lenis: Lenis
  onMount(() => {
    lenis = new Lenis({
      autoRaf: true,
      wrapper: newsEl
    });

    // Listen for the scroll event and log the event data
    lenis.on('scroll', (e) => {
      percentScrolled = e.progress
    });

    if (expanded) {
      bindCloseOnSwipeDown()
    } else {
      bindOpenOnSwipeUp()
    }
  })

  onDestroy(() => {
    lenis?.destroy()

    unbindOpenEvent()
    unbindCloseEvent()
  })
</script>

<div
  onclick={expand}

  class="news"
  class:expanded
  onwheel={onWheel}
  bind:this={newsEl}
>
  {#each data as news}
    <News {news} disabled={!$client_type.isDesktop && !expanded} />
  {/each}
</div>

<style lang="scss">
  @use "$lib/env";
  @use "$lib/scss/mixins/scr";

  .news {
    position: fixed;

    bottom: 0;
    left: 0;
    right: 0;

    padding: 0 25px 25px;

    height: 50lvh;
    display: flex;
    flex-direction: column;
    align-items: center;

    background-color: transparent;

    gap: 25px;

    z-index: calc(var(--header-z-index) + 1);

    overflow: hidden;
    transition-property: height, padding, background-color;
    transition-duration: 600ms;

    box-sizing: content-box;

    &::-webkit-scrollbar {
      display: none;
    }

    @include scr.desktop {
      width: 326px;
      right: 164px;

      top: 0;
      bottom: 0;
      left: auto;

      overflow-y: auto;
      overflow-x: visible;
      height: auto;
      padding-top: 193px;
      transition-property: height, padding, background-color, left, top, right, transform, width;

      @media (max-width: 1200px) {
        right: 20px;
      }
    }

    :global > article {
      transition-property: margin-top, padding;
      transition-duration: 300ms;
    }

    @include scr.tablet-and-lower {
      &.expanded {
        height: calc(100lvh - 60px);
        background-color: #FFF;
        overflow: auto;
        padding-top: 60px;
      }
      &:not(.expanded) :global > article:not(:first-of-type) {
        margin-top: -300px;
      }
    }

    &.full-screen {
      padding-left: 0;
      padding-right: 0;
    }
  }
</style>