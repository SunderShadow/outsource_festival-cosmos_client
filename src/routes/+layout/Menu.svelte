<script lang="ts">
  import {page} from "$app/state"
  import {onMount} from "svelte"
  import SocialLinks from "$lib/components/SocailLinks/SocialLinks.svelte"

  let {
    hidden = $bindable(false)
  } = $props()

  function hideIfMenuShadowClicked(e) {
    if (e.target.classList.contains('menu')) {
      e.stopPropagation()
      hidden = true
    }
  }

  // @ts-ignore
  let menuEl: HTMLDivElement = $state()

  onMount(() => {
    menuEl.onclick = hideIfMenuShadowClicked
  })
</script>

<div class="menu" class:hidden bind:this={menuEl}>
  <div class="wrapper">
    <nav>
      <a class="active" class:active={page.url.pathname === '/'} href="/">О проекте</a>
      <a class="active" class:active={page.url.pathname === '/restaurants'}  href="/restaurants">Рестораны</a>
      <a class="active" class:active={page.url.pathname === '/prize'} href="/prize">Конкурс</a>
      <a class="active" class:active={page.url.pathname === '/news'} href="/news">Новости</a>
    </nav>

    <div class="bottom">
      <SocialLinks links={[
        {href: 'https://max.ru/join/go1b5aULgVBhToyvGxlWgrLyrDdldN_J675W7B5Gr3Q', type: 'max'},
        {href: 'https://t.me/festival_koskos', type: 'telegram'}
      ]}/>
      <p class="copyright">
        Copyright © <b>Первые
        в космосе.</b> All rights reserved
      </p>
    </div>
  </div>
</div>

<style lang="scss">
  .wrapper {
    width: 192px;
    margin-left: auto;
    background: #F4F4F5;
    height: 100%;
  }

  .menu {
    position: fixed;
    right: 0;
    top: 0;
    height: 100%;
    width: 100%;
    z-index: 100;
    background-color: rgba(#000, .3);

    transition-property: background-color, transform;
    transition-duration: 300ms;
    transition-delay: 300ms, 0ms;

    &.hidden {
      transform: translateX(100%);
      background-color: rgba(#000, 0);
      transition-delay: 0ms, 300ms;
    }
  }

  nav {
    display: flex;
    gap: 10px;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    padding: 64px 0;

    a {
      border: 2.87px solid;
      border-image-source: linear-gradient(180deg, #FFFFFF 0%, #ECECEC 100%);
      color: #000000;
      text-decoration: none;
      padding: 10px;
      border-radius: 10px;
      box-shadow:
          0 0.96px 1.92px 0 #00000033,
          0 0.48px 2.39px 0 #0000001A,
          0 0.96px 0.96px 0.96px #00000026,
          0 0 0.24px 0.48px #0000001A;

      &.active {
        box-shadow: 0 0 1px 0 #0000000D inset;
        background: linear-gradient(180deg, #E9E9E9 0%, #E9E9E9 0.01%, #FFFFFF 100%);
      }
    }
  }

  .bottom {
    background-color: #1C212B;
    height: 100%;
    padding-top: 50px;

    :global .social-links {
      border: none;
      padding: 0;
    }
  }

  .copyright {
    color: #E8ECEF80;
    max-width: 90px;
    margin-left: auto;
    margin-right: auto;

    line-height: 24px;
  }
</style>