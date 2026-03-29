<script lang="ts">
  import NewsPage from "./NewsPage.svelte"
  import bgMobile from "./assets/bg-mobile.png?enhanced&format=webp&quality=100"
  import bgDesktop from "./assets/bg-desktop.png?enhanced&format=webp&quality=100"
  import NewsList from "./NewsList.svelte"
  import Scrollbar from "$lib/components/Scrollbar/Scrollbar.svelte"

  let {
    data
  } = $props()

  let newsList = $derived(data.manyNews)
  let expanded = $state.raw(false)

  let scrollbarVisible = $state.raw(false)
  let percentScrolled = $state.raw()
</script>

<svelte:head>
  <title>Новости</title>

<!--  Preload first 3 news -->
  {#each Array(Math.min(newsList.length, 3)) as _, i}
    <link rel="preload" as="image" href={newsList[i].thumbnails.mobile} fetchpriority="high">
  {/each}
</svelte:head>

<div class="scrollbar">
  <Scrollbar bind:percentScrolled />
</div>

<div
   class="wrapper"
   style:--bg-desktop="url('{bgDesktop.img.src}')"
   style:--bg-mobile="url('{bgMobile.img.src}')"
>
  <main>
    <div class="content">
      <h1>НОВОСТИ ФЕСТИВАЛЯ</h1>
      <p>
        В этом разделе публикуются новости проекта, интервью шеф-поваров, репортажи из городов и ключевые события фестиваля.
      </p>
    </div>

    <NewsList
      bind:percentScrolled
      bind:expanded
      data={data.manyNews}
    />
  </main>

  {#if data.news}
    <NewsPage
      news={data.news}
    />
  {/if}
</div>

<style lang="scss">
  @use "$lib/env";
  @use "$lib/scss/mixins/scr";

  .scrollbar {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 85px;
    width: 3px;
    height: 500px;
    z-index: 1;

    @media (max-width: 1200px) {
      right: 20px;
    }

    @include scr.tablet-and-lower {
      display: none;
    }
  }

  .wrapper {
    height: 100svh;
    background-position: top left;
    background-size: 400px auto;
    background-repeat: no-repeat;

    background-image: var(--bg-mobile);

    @media (min-width: 400px) {
      background-size: 100%;
    }
    @include scr.desktop {
      background-size: cover;
      background-image: var(--bg-desktop);
    }

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;

      background-image: linear-gradient(180deg, transparent 24.86%, transparent 50%, #FFF 50%);

      @include scr.desktop {
        background-image: linear-gradient(90deg, transparent 0%, transparent 75.14%, #FFF -354px);
      }
    }
  }

  main {
    position: absolute;
    top: 185px;

    @media (max-height: 700px) {
      top: 150px;
    }

    left: 0;

    width: 100%;

    margin-left: auto;
    margin-right: auto;
    color: var(--text-color-dark-bg);
    padding: 20px;
  }

  .content {
    margin-left: auto;
    margin-right: auto;
    max-width: 282px;

    @include scr.desktop {
      position: fixed;
      top: 260px;
      left: 208px;
      max-width: 423px;
    }
  }

  h1 {
    font-size: 24px;
    font-weight: 400;
    line-height: 44px;

    margin-bottom: 0;

    @include scr.desktop {
      font-size: 36px;
    }
  }

  p {
    font-size: 13px;
    margin-top: 14px;

    @include scr.desktop {
      font-size: 19.5px;
    }
  }
</style>