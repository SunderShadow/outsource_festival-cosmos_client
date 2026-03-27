<script lang="ts">
  import bgMobile from "./assets/bg_top.png?enhanced&format=webp"
  import bgDesktop from "./assets/bg-desktop.png?enhanced&format=webp"

  import {tabletWidth} from "$lib/_env"
  import Button from "$lib/components/Button/Button.svelte"
  import Sections from "./Sections.svelte"
  import Souz from "./Souz/Souz.svelte"
  import {getContext} from "svelte"

  const config = getContext('layout-config')
  config.darkHeader = false
</script>

<svelte:head>
  <title>Три шага к космодрому</title>
  <link rel="preload" as="image" href={bgMobile.img.src} fetchpriority="high" media="width < {tabletWidth}">
  <link rel="preload" as="image" href={bgDesktop.img.src} fetchpriority="high" media="width > {tabletWidth}">
</svelte:head>

<div
    class="wrapper"
    style:--bg-desktop="url('{bgDesktop.img.src}')"
    style:--bg-mobile="url('{bgMobile.img.src}')"
>
  <main>
    <section id="main_prize">
      <div class="content">
        <h1>ГЛАВНЫЙ ПРИЗ</h1>
        <p>
          Главный приз фестиваля — поездка на космодром Байконур.<br>
          <br>
          Победитель увидит пилотируемый запуск космического корабля «Союз МС-29», который отправится к Международной космической станции.<br>
          <br>
          Это один из самых впечатляющих моментов современной космонавтики — старт ракеты и начало космической экспедиции.
        </p>

        <h2>СЛЕДУЮЩАЯ ОСТАНОВКА — БАЙКОНУР</h2>
        <p>
          Закажите фестивальный сет.<br>
          Получите открытку с номером.<br>
          Зарегистрируйте его на сайте.<br>
          И, возможно, именно вы окажетесь на старте космического корабля.
        </p>

        <div class="btn_restaurants">
          <Button href="/restaurants">Выбрать ресторан</Button>
        </div>
      </div>
    </section>

    <section id="three-steps-to-cosmodrome">
      <div class="circle"></div>
      <div class="content">
        <h2>ТРИ ШАГА К КОСМОДРОМУ</h2>
        <p>Все зарегистрированные участники автоматически принимают участие в розыгрыше поездки на запуск ракеты.</p>
      </div>

      <Sections />
    </section>

    <Souz />

    <section id="phone">
      <div>Команда проекта:</div>
      <div class="phone">+7 (913) 049-36-60</div>
    </section>
  </main>
</div>

<style lang="scss">
  @use "$lib/env";

  .wrapper {
    background-size: 100%;
    background-repeat: no-repeat;
    background-color: #FFF;

    @media (max-width: env.$tablet-width) {
      background-image: var(--bg-mobile);
    }

    @media (min-width: env.$tablet-width) {
      background-image: var(--bg-desktop);
    }
  }

  main {
    color: var(--text-color-dark-bg);

    padding-top: calc(389px - calc(375px - 100vw));
  }

  #main_prize {
    background: linear-gradient(180deg, rgba(247, 248, 248, 0) 0%, rgba(247, 248, 248, 0.6) 60px, #FFF 90px);

    padding-top: 135px;
    margin-top: 30px;

    color: #1C212B;
    padding-bottom: 93px;

    h2 {
      margin-top: 24px;
    }
    .content {
      max-width: 282px;
      margin-left: auto;
      margin-right: auto;
    }
  }

  #three-steps-to-cosmodrome {
    --circle-offset: 25px;
    position: relative;

    @media (min-width: 400px) {
      --circle-offset: 30px;
    }

    @media (min-width: 450px) {
      --circle-offset: 35px;
    }

    .content {
      position: relative;
      max-width: 282px;
      margin-left: auto;
      margin-right: auto;
      text-align: center;

      z-index: 1;
    }

    .circle {
      position: absolute;
      top: calc(var(--circle-offset) * -1);
      left: 0;
      bottom: calc(var(--circle-offset) * -1);
      right: 0;
      z-index: 1;

      overflow: hidden;

      margin-top: calc(var(--circle-offset) * -1);
      margin-bottom: calc(var(--circle-offset) * -1);

      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 50%;
        height: 100%;
        transform: translateX(-50%);
        aspect-ratio: 1 / 1;
        background-color: #1C212B;
        border-radius: 100%;
      }
    }
  }

  #phone {
    background-color: #161A22;

    padding: 16px 0 24px 0;
    text-align: center;
    color: #FFF;

    .phone {
      color: #828A9D;
    }
  }
  h1, h2 {
    font-size: 24px;
    font-weight: 400;
    letter-spacing: -3%;

    @media (min-width: env.$tablet-width) {
      font-size: 36px;
    }
  }

  .btn_restaurants {
    margin-top: 34px;
  }

  h2 {
    line-height: 40px;
    margin: 0;
  }

  p {
    margin-top: 20px;
    font-size: 13px;
    line-height: 16px;
    margin-bottom: 0;

    @media (min-width: env.$tablet-width) {
      font-size: 19.5px;
      margin-bottom: 2em;
    }
  }
</style>