<script lang="ts">
  import {fade} from "svelte/transition"
  import SocialLinks from "$lib/components/SocailLinks/SocialLinks.svelte"
  import {mobileWidth, tabletWidth} from "$lib/_env"
  import Lenis from "lenis"
  import {onDestroy, onMount} from "svelte"
  import Scrollbar from "$lib/components/Scrollbar/Scrollbar.svelte"

  let {
    news
  } = $props()

  const dateFormatter = Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: "long",
    year: 'numeric',
  })

  let socialLinks = $derived.by(() => {
    let output = []
    for (let linkType in news.social_links) {

      output.push({
        type: linkType,
        href: news.social_links[linkType]
      })
    }

    return output
  })

  let articleEl: HTMLDivElement = $state.raw()
  let bodyEl: HTMLDivElement = $state.raw()
  let lenis: Lenis

  let percentScrolled = $state.raw()
  onMount(() => {
    lenis = new Lenis({
      autoRaf: true,
      wrapper: bodyEl
    });

    lenis.on('scroll', e => {
      percentScrolled = e.progress
    })
  })

  onDestroy(() => {
    lenis?.destroy()
  })
</script>

<svelte:head>
  <title>{news.title}</title>
  <link rel="preload" as="image" href={news.thumbnails.mobile} fetchpriority="high" media="(width <= {tabletWidth})px">
  <link rel="preload" as="image" href={news.thumbnails.desktop} fetchpriority="high" media="(width >= {tabletWidth}px)">
</svelte:head>

<article
    bind:this={articleEl}
    class="news"
    transition:fade
    ontouchstart={e => {e.stopPropagation()}}
    onwheel={e => {e.stopPropagation()}}
>
  <picture>
    <source
        srcset={news.thumbnails.desktop}
        media="(width >= 700px)" />
    <source
        srcset={news.thumbnails.mobile}
        media="(width < 700px)" />
    <img src={news.thumbnails.desktop} alt="" />
  </picture>

  <div class="scrollbar">
    <Scrollbar bind:percentScrolled/>
  </div>

  <div class="body" bind:this={bodyEl}>
    <a class="goback" href="/news" aria-label="Назад">
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 3.75C16.7861 3.75 13.6443 4.70305 10.972 6.48862C8.29969 8.27419 6.21689 10.8121 4.98696 13.7814C3.75704 16.7507 3.43524 20.018 4.06225 23.1702C4.68926 26.3224 6.23692 29.2179 8.50952 31.4905C10.7821 33.7631 13.6776 35.3107 16.8298 35.9378C19.982 36.5648 23.2493 36.243 26.2186 35.013C29.1879 33.7831 31.7258 31.7003 33.5114 29.028C35.297 26.3557 36.25 23.2139 36.25 20C36.2455 15.6916 34.5319 11.561 31.4855 8.51454C28.439 5.46806 24.3084 3.75455 20 3.75ZM20 33.75C17.2805 33.75 14.6221 32.9436 12.3609 31.4327C10.0997 29.9218 8.33737 27.7744 7.29666 25.2619C6.25596 22.7494 5.98366 19.9847 6.51421 17.3175C7.04476 14.6503 8.35432 12.2003 10.2773 10.2773C12.2003 8.35431 14.6503 7.04475 17.3175 6.5142C19.9848 5.98366 22.7494 6.25595 25.2619 7.29666C27.7744 8.33736 29.9218 10.0997 31.4327 12.3609C32.9436 14.6221 33.75 17.2805 33.75 20C33.7459 23.6455 32.2959 27.1404 29.7182 29.7182C27.1404 32.2959 23.6455 33.7459 20 33.75ZM23.3844 14.6344L18.0172 20L23.3844 25.3656C23.5005 25.4818 23.5926 25.6196 23.6555 25.7714C23.7184 25.9231 23.7507 26.0858 23.7507 26.25C23.7507 26.4142 23.7184 26.5769 23.6555 26.7286C23.5926 26.8804 23.5005 27.0182 23.3844 27.1344C23.2682 27.2505 23.1304 27.3426 22.9786 27.4055C22.8269 27.4683 22.6643 27.5007 22.5 27.5007C22.3358 27.5007 22.1731 27.4683 22.0214 27.4055C21.8696 27.3426 21.7318 27.2505 21.6156 27.1344L15.3656 20.8844C15.2494 20.7683 15.1572 20.6304 15.0943 20.4787C15.0314 20.3269 14.999 20.1643 14.999 20C14.999 19.8357 15.0314 19.6731 15.0943 19.5213C15.1572 19.3696 15.2494 19.2317 15.3656 19.1156L21.6156 12.8656C21.7318 12.7495 21.8696 12.6574 22.0214 12.5945C22.1731 12.5317 22.3358 12.4993 22.5 12.4993C22.6643 12.4993 22.8269 12.5317 22.9786 12.5945C23.1304 12.6574 23.2682 12.7495 23.3844 12.8656C23.5005 12.9818 23.5926 13.1196 23.6555 13.2714C23.7184 13.4231 23.7507 13.5858 23.7507 13.75C23.7507 13.9142 23.7184 14.0769 23.6555 14.2286C23.5926 14.3804 23.5005 14.5182 23.3844 14.6344Z" fill="black"/>
      </svg>
    </a>

    <h2>{news.title}</h2>
    <time>{dateFormatter.format(new Date(news.created_at))}</time>
    <div class="content">
      {#if socialLinks.length}
        <SocialLinks links={socialLinks}/>
      {/if}

      {@html news.body}
    </div>
  </div>
</article>

<style lang="scss">
  @use "$lib/env";
  @use "$lib/scss/mixins/scr";

  $inline-container-scr-width: 700px;

  .scrollbar {
    @media (max-width: $inline-container-scr-width) {
      display: none;
    }

    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 85px;
    width: 3px;
    height: 500px;
    z-index: 1;

    @media (max-width: 1350px) {
      right: 20px;
    }

    @media (max-width: 1200px) {
      right: 5px;
    }
  }

  article {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;

    color: #000000;
    box-shadow: 0 40px 40px 0 #0000001A;
    background-color: #FFFFFF;
    z-index: calc(var(--header-z-index) + 2);

    padding: 60px 10px 10px;

    @include scr.tablet-and-lower {
      overflow: auto;
    }

    @media (min-width: $inline-container-scr-width) {
      display: flex;
      border-radius: 16px;


      padding: 15px;

      box-shadow: 0 0 50vw rgba(0, 0, 0, 1);

      @include scr.desktop {
        height: 80svh;
        width: 80vw;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }

      img {
        object-fit: cover;
        height: 100%;

        border-top-left-radius: 16px;
        border-bottom-left-radius: 16px;
      }
    }

    @include scr.desktop {
      gap: 96px;
    }
  }

  .goback {
    padding: 0;
    margin: 0;
    background: none;
    outline: none;
    border: none;

    cursor: pointer;

    @include scr.desktop {
      margin-top: 40px;
    }

    @media (max-width: $inline-container-scr-width - 1px) {
      position: absolute;
      top: 10px;
      left: 10px;
    }
  }

  img {
    border-top-left-radius: 18px;
    border-top-right-radius: 18px;
    width: 100%;
  }

  .body {
    padding: 20px;
    width: 100%;

    @media (min-width: $inline-container-scr-width) {
      width: min(100%, 459px);
      overflow-y: auto;

      &::-webkit-scrollbar {
        display: none;
      }

      @include scr.desktop-xl {
        width: 700px;
      }
    }

    @include scr.tablet-and-higher {
      margin-left: auto;
      margin-right: auto;
    }
  }

  article h2 {
    @include scr.tablet-and-higher {
      margin-top: 37px;
      font-size: 40px;
    }
  }

  h2 {
    font-size: 24px;
    font-weight: 400;
    margin: 0;
  }

  time {
    display: block;
    margin: 15px 0 10px 0;
    color: #78858F;
  }

  p {
    margin-top: 0;
    margin-bottom: 0;
    font-size: 14px;
  }

  div + .excerpt {
    margin-top: 0;
  }

  .excerpt + div {
    margin-top: 0;
  }

  .content {
    width: 100%;

    margin-left: auto;
    margin-right: auto;

    :global {
      p {
        margin: 22px 0;
        font-size: 14px;
      }

      h2:first-child {
        margin-top: 0;
      }

      h2 {
        font-size: 24px;
        font-weight: 400;
        margin-top: 28px;
        margin-bottom: 22px;
      }

      :global .social-links {
        padding: 10px;
        background-color: #373737;
        border-radius: 32px;
      }
    }
  }
</style>