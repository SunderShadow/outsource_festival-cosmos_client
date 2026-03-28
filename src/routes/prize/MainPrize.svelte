<script>
import Button from "$lib/components/Button/Button.svelte"

import {desktopWidth} from "$lib/_env.js"
import bgDesktop from "./assets/bg-desktop.png?enhanced&format=webp"
import bgMobile from "./assets/bg_top.png"
</script>

<svelte:head>
  <link rel="preload" as="image" href={bgDesktop.img.src} fetchpriority="high" media="width > {desktopWidth}">
</svelte:head>

<section
    id="main_prize"
    style:--bg-desktop="url('{bgDesktop.img.src}')"
>
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

<style lang="scss">
  @use "$lib/scss/mixins/scr";

  #main_prize {
    background: linear-gradient(180deg, rgba(247, 248, 248, 0) 0%, rgba(247, 248, 248, 0.6) 60px, #FFF 90px);

    padding-top: 135px;
    margin-top: 30px;

    color: #1C212B;
    padding-bottom: 93px;

    @include scr.desktop {
      position: absolute;
      top: 0;
      left: 100vw;
      bottom: 0;
      width: 100%;
      height: 100%;
      z-index: 1;

      background-image:
          linear-gradient(270deg, rgba(183, 182, 189, 0) 0%, rgba(96, 98, 101, 0.4) 23.6%, rgba(31, 36, 47, 0.5) 40.32%, #1F242F 75.14%),
          var(--bg-desktop);
      background-size: cover;
      background-position: right;
      padding: 0;
      margin: 0;
    }

    h2 {
      margin-top: 24px;
    }

    .content {
      max-width: 282px;
      margin-left: auto;
      margin-right: auto;

      @include scr.desktop {
        width: 100%;
        position: absolute;
        left: 550px;
        top: 170px;
        z-index: 3;
        color: #FFF;
      }
    }
  }

  h1, h2 {
    font-size: 24px;
    font-weight: 400;
    letter-spacing: -3%;
  }

  h2 {
    line-height: 40px;
    margin: 0;
  }

  .btn_restaurants {
    margin-top: 34px;

    :global .button {
      @include scr.desktop {
        --btn-color: #fff;
        --btn-color-hover: rgba(255, 255, 255, 0.1);
      }
    }
  }

  p {
    margin-top: 20px;
    font-size: 13px;
    line-height: 16px;
    margin-bottom: 0;

    @include scr.desktop {
      font-size: 13px;
      margin-bottom: 2em;
    }
  }
</style>