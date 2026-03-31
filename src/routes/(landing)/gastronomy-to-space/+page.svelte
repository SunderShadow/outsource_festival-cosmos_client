<script lang="ts">
  import bgMobile from "./assets/bg.png?enhanced&format=webp"
  import bgDesktop from "./assets/bg-desktop.png?enhanced&format=webp"

  import Roscosmos from "$lib/components/_logos/Roscosmos.svelte"
  import Poehaly65 from "$lib/components/_logos/Poehaly65.svelte"
  import ProstoCosmos from "$lib/components/_logos/ProstoCosmos.svelte"
  import CosmosHotels from "$lib/components/_logos/CosmosHotels.svelte"
  import Sber from "$lib/components/_logos/Sber.svelte"
  import Inkerman from "$lib/components/_logos/Inkerman.svelte"
  import GastronomyInstitute from "$lib/components/_logos/GastronomyInstitute.svelte"
  import {tabletWidth} from "$lib/_env"
  import {getContext} from "svelte"

  getContext('layout-config').darkHeader = false
</script>

<svelte:head>
  <title>Гастрономия отравляется в космос</title>
  <link rel="preload" as="image" href={bgMobile.img.src} fetchpriority="high" media="width < {tabletWidth}">
  <link rel="preload" as="image" href={bgDesktop.img.src} fetchpriority="high" media="width > {tabletWidth}">
</svelte:head>

<div class="wrapper"
     style:--bg-desktop="url('{bgDesktop.img.src}')"
     style:--bg-mobile="url('{bgMobile.img.src}')">

  <main>
    <h1>ОНЛАЙН-УЖИН <br> <span>ЗЕМЛЯ — МКС</span></h1>
    <p class="first_text">
      Уникальное событие проекта «Первые в космосе», в котором гастрономия становится языком диалога между Землёй и орбитой.<br>
      Владимир Мухин проведёт авторский гастрономический ужин, который одновременно пройдет на Земле и на орбите.<br>
      Экипаж Международной космической станции подключится по связи и вместе с шефом примет участие в создании новых вкусовых сочетаний.
    </p>

    <section id="space_travel">
      <h2>ГАСТРОНОМИЯ ОТПРАВЛЯЕТСЯ В КОСМОС</h2>

      <p>
        Фестиваль — только начало.<br>
        После завершения гастрономической части проект продолжится несколькими событиями, которые связывают гастрономию и космическую отрасль.<br>
        Институт гастрономии СФУ совместно с бренд-шефом ресторанной группы Bellini Романом Чемеренко сформируют гастрономическую посылку для космонавтов.<br>
        Посылка будет отправлена на Международную космическую станцию для экипажа корабля «Союз МС-29».
      </p>
    </section>

<!--    <hr>-->

    <div class="logos">
      <Roscosmos />
      <Poehaly65 />
      <GastronomyInstitute />
      <div class="prosto_cosmos"><ProstoCosmos /></div>
      <div class="sber"><Sber /></div>
      <div class="inkerman"><Inkerman /></div>
      <div class="hotels"><CosmosHotels /></div>
    </div>

    <div class="divider">
      <div></div>
      <span>Команда проекта</span>
      <div></div>
    </div>

    <p class="phone">+7 (913) 049-36-60</p>
  </main>
</div>

<style lang="scss">
  @use "$lib/env";

  .wrapper {
    background-size: 100%;
    background-position: top;
    background-repeat: no-repeat;
    background-color: #000;

    background-image: var(--bg-mobile);

    @media (min-width: env.$tablet-width) {
      height: 100vh;
      background-image: var(--bg-desktop);
      background-size: cover;
    }
  }

  main {
    color: var(--text-color-dark-bg);

    @media (max-width: env.$tablet-width) {
      padding-top: 259px;
      max-width: 320px;
      padding-left: 10px;
      padding-right: 10px;
      margin-left: auto;
      margin-right: auto;
      box-sizing: content-box;
    }
  }

  .divider,
  hr {
    position: relative;
    background-color: #FFFFFF33;
    width: 100%;
    height: 1px;
    border: none;
    margin-top: 24px;
    margin-bottom: 24px;

    @media (min-width: env.$tablet-width) {
      display: none;
    }
  }

  .divider {
    height: auto;
    display: flex;
    background: none;
    align-items: center;

    @media (min-width: env.$tablet-width) {
      display: none;
    }
  }

  .divider {
    > span {
      display: block;
      font-size: 12px;

      text-wrap: nowrap;
      text-align: center;

      opacity: .5;
      width: 188px;
    }

    > div {
      flex-grow: 1;
      height: 1px;
      background-color: #FFFFFF33;

      color: #828A9D;
    }
  }

  @media (min-width: env.$tablet-width) {
    #space_travel {
      position: fixed;

      left: 50%;
      top: 476px;
      margin-left: 20px;
      max-width: 321px;

      @media (min-height: 950px) {
        top: 600px;
      }
    }
  }

  .phone {
    text-align: center;
    max-width: 100%;
    margin-bottom: 0;
    padding-bottom: 30px;

    @media (min-width: env.$tablet-width) {
      display: none;
    }
  }

  h1 {
    font-size: 24px;
    font-weight: 400;
    text-align: center;
    line-height: 44px;

    margin-bottom: 0;

    @media (min-width: env.$tablet-width) {
      position: fixed;
      top: 176px;
      left: 50%;
      transform: translateX(-50%);

      span {
        font-size: 50px;
      }
    }
  }

  h2 {
    font-size: 24px;
    font-weight: 400;
    margin: 0;
    line-height: 30px;
  }

  p {
    font-size: 13px;
    line-height: 16px;
    max-width: 282px;

    &.first_text {
      margin-top: 184px;
      @media (min-width: 380px) {
        margin-top: 240px;
      }

      @media (min-width: env.$tablet-width) {
        margin-top: 0;
        position: fixed;
        right: 50%;
        margin-right: 20px;
        top: 476px;
        max-width: 321px;

        @media (min-height: 950px) {
          top: 600px;
        }
      }
    }
  }

  .logos {
    display: flex;
    gap: 24px;
    flex-wrap: wrap;

    @media (max-width: env.$mobile-width) {
      justify-content: center;
    }

    @media (min-width: env.$tablet-width) {
      width: max-content;

      position: fixed;
      margin-top: 30px;
      top: 311px;
      left: 50%;
      transform: translateX(-50%);
      gap: 36px;
    }

    .inkerman :global svg {
      height: 10px;
    }
    .cosmos :global svg {
      height: 18px;
    }

    .prosto_cosmos,
    .sber,
    .inkerman,
    .hotels {
      :global svg *[fill]{
        fill: #FFF;
      }
    }

    :global svg {
      height: 23px;
      width: fit-content;

      *[fill=black] {
        fill: #FFF;
      }
    }

    &.partners :global svg {
      height: 30px;
    }
  }
</style>