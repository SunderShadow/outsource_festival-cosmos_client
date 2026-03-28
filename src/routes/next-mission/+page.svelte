<script lang="ts">
  import bgMobile from "./assets/bg.png?enhanced&format=webp"
  import bgDesktop from "./assets/bg-desktop.png?enhanced&format=webp"

  import bgMaskMobile from "./assets/bg_mask.svg?no-inline"
  import bgMaskDesktop from "./assets/bg_mask-desktop.svg?no-inline"

  import Logo from "$lib/components/Logo.svelte"
  import Button from "$lib/components/Button/Button.svelte"
  import SocialLinks from "$lib/components/SocailLinks/SocialLinks.svelte"
  import {tabletWidth} from "$lib/_env"

  import Partners from "./Partners.svelte"
  import {getContext} from "svelte"

  const config = getContext('layout-config')
  config.darkHeader = false
</script>

<svelte:head>
  <title>Фестиваль 2027</title>

  <link rel="preload" as="image" href={bgMobile.img.src} fetchpriority="high" media="width < {tabletWidth}">
  <link rel="preload" as="image" href={bgMaskMobile} fetchpriority="high" media="width < {tabletWidth}">

  <link rel="preload" as="image" href={bgDesktop.img.src} fetchpriority="high" media="width > {tabletWidth}">
  <link rel="preload" as="image" href={bgMaskDesktop  } fetchpriority="high" media="width > {tabletWidth}">
</svelte:head>

<div class="wrapper">
  <div
    class="top"
    style:--bg-desktop="url('{bgDesktop.img.src}')"
    style:--bg-mobile="url('{bgMobile.img.src}')"
    style:--mobile-mask-image="url('{bgMaskMobile}')"
    style:--desktop-mask-image="url('{bgMaskDesktop}')"
  >
    <div class="info">
      <Logo />
      <div class="sub-text">ПРИНЯТЬ УЧАСТИЕ В ФЕСТИВАЛЕ 2027</div>
      <Button href="" white>Оставить заявку на участие</Button>
    </div>
  </div>

  <div class="social-links">
    <SocialLinks links={[
      {href: 'https://max.ru/join/go1b5aULgVBhToyvGxlWgrLyrDdldN_J675W7B5Gr3Q', type: 'max'},
      {href: 'https://t.me/festival_koskos', type: 'telegram'}
    ]}/>
  </div>

  <p>
    Фестиваль «Первые в космосе» объединяет рестораны, шеф-поваров и города по всей стране.
    Если вы хотите стать частью следующего фестиваля и представить свой космический гастрономический сет, оставьте заявку на участие.
  </p>

  <div class="footer">
    <Partners />
  </div>
</div>

<style lang="scss">
  @use "$lib/env";
  @use "$lib/scss/mixins/scr";

  .info {
    position: absolute;
    bottom: 90px;
    left: 0;

    width: 100%;

    @include scr.desktop {
    }

    :global svg {
      display: block;
      width: 158px;
      height: 103px;
      margin-left: auto;
      margin-right: auto;

      @include scr.desktop {
        width: 237px;
        height: 154px;
      }
    }

    .sub-text {
      margin-top: 10px;
      text-align: center;
      font-size: 11px;
      text-transform: uppercase;

      @include scr.desktop {
        font-size: 16.5px;
        margin-top: 14px;
        margin-bottom: 30px;
      }

      color: #fff;
    }

    :global .button {
      display: block;
      margin-top: 20px;
      margin-left: auto;
      margin-right: auto;
    }
  }

  .wrapper {
    background-color: #181D26;
    min-height: 100svh;
  }

  .social-links :global .social-links {
    @include scr.desktop {
      border-radius: 32px;
      padding-bottom: 14px;
      padding-top: 14px;

    }
  }

  .divider,
  hr {
    position: relative;
    background-color: #828A9D33;
    width: 100%;
    height: 1px;
    border: none;
    margin-top: 24px;
    margin-bottom: 24px;
  }

  .divider {
    height: auto;
    display: flex;
    background: none;
    align-items: center;

    > span {
      display: block;
      font-size: 12px;

      text-wrap: nowrap;
      text-align: center;

      color: #828A9D;
      width: 188px;
    }

    > div {
      flex-grow: 1;
      height: 1px;
      background-color: #828A9D33;

      color: #828A9D;
    }
  }

  .top {
    position: relative;
    height: 480px;

    // Background
    background-size: 100%;
    background-repeat: no-repeat;

    @include scr.tablet-and-lower {
      background-image: var(--bg-mobile);
    }

    @include scr.desktop {
      background-image: var(--bg-desktop);
      margin-bottom: -30px;

      height: 436px;
    }

    // Mask
    mask-image: var(--mobile-mask-image);

    @include scr.desktop {
      mask-image: var(--desktop-mask-image);
    }

    mask-position: bottom center;
    mask-size: cover;
    mask-repeat: no-repeat;

    @include scr.tablet {
      @media (min-width: 850px) {
        mask-image: var(--desktop-mask-image);
      }
    }
  }

  p {
    max-width: 338px;
    margin-top: 15px;

    color: #fff;
    margin-left: auto;
    margin-right: auto;

    text-align: center;
    font-size: 13px;

    padding: 0 20px;

    @include scr.desktop {
      max-width: 908px;
      color: #9C9C9C;
      font-size: 19.5px;
      margin-top: 5px;
    }
  }

  .footer :global #partners {
    .logos {
      .prosto_cosmos,
      .sisoev,
      .sber,
      .inkerman,
      .hotels {
        :global svg *[fill]{
          fill: #FFF;
        }
      }

      :global svg {
        *[fill=black] {
          fill: #FFF;
        }
      }
    }
  }

  .footer {
    max-width: 308px;
    margin: 0 auto;

    @include scr.desktop {
      max-width: 700px;
      margin-left: auto;
      margin-right: auto;

      :global #partners {
        position: static;

        .phone {
          font-size: 14px;
        }
        .phone svg {
          *[fill] {
            fill: #fff;
          }
        }
      }

      hr {
        display: none;
      }
    }
  }

  .phone {
    color: #FFFFFF;
    margin-left: auto;
    margin-right: auto;
    width: fit-content;

    margin-top: 18px;
    font-size: 14px;
    padding-bottom: 20px;

    div:first-child {
      max-width: fit-content;
      margin-left: auto;
      margin-right: auto;
    }

    div:last-child {
      color: #828A9D;
    }
  }
</style>