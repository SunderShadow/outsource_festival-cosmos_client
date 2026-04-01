<script lang="ts">
  import Article from "./Article.svelte"
  import Restaurant from "./Restaurant.svelte"

  import {getContext, onMount} from "svelte"
  import {detect as swipeDetect} from "$lib/tools/swipe-detect"
  import {browser} from "$app/environment"
  import {goto} from "$app/navigation"
  import mapSvgImg from "./assets/map.svg?no-inline"
  import Dropdown from "$lib/components/Dropdown/Dropdown.svelte"
  import Roscosmos from "$lib/components/_logos/Roscosmos.svelte"
  import Poehaly65 from "$lib/components/_logos/Poehaly65.svelte"
  import Button from "$lib/components/Button/Button.svelte"

  let articlesEl = $state.raw()

  const config = getContext('layout-config')
  config.darkHeader = false

  onMount(() => {
    swipeDetect(articlesEl, direction => {
      if (direction === 'left') {
        moveNextArticles()
      }

      if (direction === 'right') {
        movePrevArticles()
      }
    })
  })

  let perPage = 4

  if (browser && window.innerWidth > 700) {
    perPage = 1
  }

  function moveNextArticles() {
    if (articlesPage < articlesPageTotal - 1) {
      articlesPage += 1
    }
  }

  function movePrevArticles() {
    if (articlesPage > 0) {
      articlesPage -= 1
    }
  }

  let {
    data
  } = $props()

  const articleWidth = 315 // px

  let articlesPageTotal = $derived(Math.ceil((data.restaurants.length ?? 0) / perPage))
  let articlesPage = $state.raw(0)

  function scrollArticles(e: WheelEvent) {
    e.stopPropagation()

    const maxPage = articlesPageTotal - Math.floor(window.innerWidth / articleWidth) + 1
    if (e.deltaY < 0 && articlesPage > 0) {
      articlesPage -= 1
    }

    if (e.deltaY > 0 && articlesPage < maxPage) {
      articlesPage += 1
    }
    // @ts-ignore
    const el: HTMLDivElement = e.currentTarget
  }


  function getQueryStr() {
    return `?q=${searchStr}&city=${city}&cost=${cost}`
  }


  let searchStr = $state.raw(data.searchValue)
  let searchTimeout

  function toSearch() {
    goto(getQueryStr(), {
      invalidateAll: true,
      noScroll: true
    })
  }
  function search(e) {
    clearTimeout(searchTimeout)
    searchTimeout = setTimeout(() => {
      toSearch()
    }, 500)
  }

  let city = $state.raw(data.city)
  function selectCity(v) {
    toSearch()
  }

  let cost = $state.raw(null)
  function selectCost(v) {
    toSearch()
  }
</script>

<svelte:head>
  <title>География фестиваля</title>
  <link rel="preload" as="image" href={mapSvgImg} fetchpriority="high">
</svelte:head>
<main class="wrapper">
  <div class="map">
    <img src={mapSvgImg} alt="">
  </div>

  <div class="content">
    <div class="top-logos"><Roscosmos /><Poehaly65 /></div>
    <h1>ГЕОГРАФИЯ ФЕСТИВАЛЯ</h1>
    <p>
      Фестиваль объединяет 18 городов России, каждый из которых внес вклад в развитие космонавтики, науки, инженерии
      и подготовки кадров.
    </p>

    <Button white href="#restaurants">Смотреть рестораны</Button>

    <div id="restaurants" class:hidden={data.restaurant}>
      <div class="filters">
        <div class="title">
          Приятного аппетита!
        </div>

        <div id="search">
          <input type="text" placeholder="Название ресторана" oninput={search} bind:value={searchStr}>
          <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_d_571_227)">
              <rect x="1.85327" y="0.926758" width="29.654" height="29.654" rx="14.827" fill="black"/>
              <path d="M22.279 21.3522L19.3831 18.4563M11.0815 14.9813C11.0815 12.3157 13.2424 10.1548 15.908 10.1548C18.5736 10.1548 20.7345 12.3157 20.7345 14.9813C20.7345 17.6469 18.5736 19.8078 15.908 19.8078C13.2424 19.8078 11.0815 17.6469 11.0815 14.9813Z" stroke="white" stroke-width="1.39003" stroke-linecap="round" stroke-linejoin="round"/>
            </g>
            <defs>
              <filter id="filter0_d_571_227" x="-0.00010097" y="7.15852e-05" width="33.3608" height="33.3606" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dy="0.926686"/>
                <feGaussianBlur stdDeviation="0.926686"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0.121569 0 0 0 0 0.160784 0 0 0 0 0.215686 0 0 0 0.08 0"/>
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_571_227"/>
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_571_227" result="shape"/>
              </filter>
            </defs>
          </svg>
        </div>

        <div class="dropdowns">
          <Dropdown title="Город" bind:value={city} onselect={selectCity} options={data.cities.map(it => ({
            _t: it,
            _v: it
          }))} />
          <Dropdown title="Цена" bind:value={cost} onselect={selectCost} options={[
            {
              _t: 'От 2000',
              _v: 1
            },
            {
              _t: 'От 5000',
              _v: 2
            },
            {
              _t: 'От 10000',
              _v: 3
            }
          ]} />
        </div>
      </div>
    </div>
  </div>

  <div class="articles" bind:this={articlesEl} style:--page={articlesPage} ontouchstart={e => {e.stopPropagation()}}>
    <div class="articles-inner_wrapper">
      <div class="tape">
        {#each data.restaurants as article}
          <Article {article} />
        {/each}
      </div>
    </div>
    <div class="pagination">
      {#each Array(articlesPageTotal) as _, i}
        <div class="page" class:active={i === articlesPage}></div>
      {/each}
    </div>
  </div>

  {#if data.restaurant}
    <Restaurant restaurant={data.restaurant}/>
  {/if}
</main>

<style lang="scss">
  @use "$lib/env";
  @use "$lib/scss/mixins/scr";

  .wrapper {
    background-color: #95A9BB;
    @include scr.desktop {
      min-height: 100vh;
    }
  }

  .top-logos {
    height: 16px;

    display: flex;
    gap: 17px;

    :global svg {
      height: 16px;
      width: fit-content;
      *[fill=black] {
        fill: #FFF;
      }
    }

    @include scr.desktop {
      margin-bottom: 10px;
    }
  }

  .map {
    position: absolute;
    top: 0;
    left: 0;
    height: 510px;
    overflow: hidden;
    width: 100%;

    @include scr.desktop {
      width: 63vw;
      right: 0;
      left: auto;
      height: auto;

      @media (min-width: 1500px) {
        width: 54vw;
      }
      @media (max-width: 1400px) {
        width: 55vw;
        top: 50px;
      }

      @media (max-width: 1150px) {
        width: 50vw;
        top: 100px;
      }
    }

    img {
      @include scr.desktop {
        width: 100%;
      }

      position: relative;
      object-fit: cover;
      height: inherit;
      left: -50px;
    }
  }

  h1 {
    font-size: 24px;
    font-weight: 400;
    line-height: 66px;
    margin: 0;

    color: #FFFFFF;

    @include scr.desktop {
      font-size: 36px;
    }
  }

  p {
    margin-top: 5px;
    font-size: 13px;

    line-height: 24px;
    max-width: 257px;
    color: #FFFFFF;

    @include scr.desktop {
      font-size: 16px;
      text-transform: uppercase;
      max-width: 423px;
      color: #FFFFFFB2;

      margin-bottom: 70px;
    }
  }

  .filters {
    padding: 15px 7.5px;
    border: 1px solid #F5F5F5;
    border-radius: 20px;
    margin-top: 24px;
    margin-bottom: 24px;
    color: #F1F2F2;
    font-family: "Poppins", sans-serif;

    @include scr.desktop {
      width: 316px;
    }
  }

  .dropdowns {
    display: flex;
    gap: 5px;


  }

  #search {
    margin-bottom: 14px;
  }

  #search {
    position: relative;

    margin-top: 15px;
    width: 100%;
    background: #fff;
    border-radius: 10em;
    border: 1px solid #E5E7EB;
    height: 45px;

    display: flex;

    svg {
      position: absolute;
      right: 7px;
      top: 7px;
    }

    input {
      margin: auto 0;
      padding: 12px 22px;
      border: none;
      outline: none;
      border-radius: inherit;
    }
  }

  .articles {
    --page: 0;
    --article-width: 315px;
    --article-height: 168px;
    --gap-y: 8px;
    --gap-x: calc(100vw - 308px);
    --row-count: 4;

    position: relative;
    margin-top: 12px;

    :global article {
      width: var(--article-width);
    }

    @include scr.tablet-and-lower {
      height: calc((var(--article-height) + var(--gap-y)) * var(--row-count) + 90px);
      overflow: hidden;
    }

    @include scr.desktop {
      height: auto;
      --article-width: 100%;
    }

    &-inner_wrapper {
      position: relative;

      @include scr.tablet-and-lower {
        max-width: 308px;
        margin-left: auto;
        margin-right: auto;
      }

      @include scr.desktop {
        padding-left: 185px;
        overflow-x: hidden;
        padding-right: 20px;
        padding-bottom: 20px;

        &::-webkit-scrollbar {
          scrollbar-width: thin;
        }
      }
    }

    .tape {
      transform: translateX(calc(-1 * var(--page) * (var(--article-width) + var(--gap-x))));
      width: 100%;

      display: grid;
      gap: var(--gap-y) var(--gap-x);

      @include scr.tablet-and-lower {
        grid-template-rows: repeat(4, var(--article-height));
        grid-auto-flow: column;
      }

      @include scr.desktop {
        grid-template-columns: repeat(4, 1fr);
        gap: 10px;

        @media (max-width: 1439px) {
          grid-template-columns: repeat(3, 1fr);
        }

        @media (max-width: 1150px) {
          grid-template-columns: repeat(2, 1fr);
        }
      }

      height: inherit;

      @include scr.tablet-and-lower {
        position: absolute;
        top: 0;
        left: 0;
      }

      transition: transform 300ms;
    }

    .pagination {
      display: flex;
      justify-content: center;
      gap: 8px;

      max-width: 80%;
      width: 100%;
      flex-wrap: wrap;

      position: absolute;
      top: calc(100% - 80px);
      left: 50%;
      transform: translateX(-50%);

      @include scr.desktop {
        display: none;
      }

      .page {
        width: 8px;
        height: 8px;
        background: #50505080;
        border-radius: 10em;

        transition: width 300ms ease-in-out, background 300ms 200ms ease-in-out;

        &.active {
          width: 32px;
          background-color: #fFF;
        }
      }
    }
  }

  .content {
    margin-left: auto;
    margin-right: auto;

    padding-left: 20px;
    padding-right: 20px;
    box-sizing: content-box;

    @include scr.desktop {
      padding: 136px 0 0 185px;
    }

    @include scr.tablet-and-lower {
      max-width: 316px;
      padding-top: 519px;
    }
  }

  .title {
    font-size: 15px;
    font-weight: 600;
    font-family: "Poppins", sans-serif;

    margin-left: 8px;
  }
</style>