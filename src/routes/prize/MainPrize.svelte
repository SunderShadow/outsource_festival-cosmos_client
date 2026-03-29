<script>
import Button from "$lib/components/Button/Button.svelte"

import {desktopWidth} from "$lib/_env.js"
import bgDesktop from "./assets/bg-desktop.png?enhanced&format=webp"
</script>

<svelte:head>
  <link rel="preload" as="image" href={bgDesktop.img.src} fetchpriority="high" media="width > {desktopWidth}">
</svelte:head>

<section
    id="main_prize"
    style:--bg-desktop="url('{bgDesktop.img.src}')"
>
  <div class="content">
    <div>
      <h1>ГЛАВНЫЙ ПРИЗ</h1>
      <p>
        Главный приз фестиваля — поездка на космодром Байконур.<br>
        <br>
        Победитель увидит пилотируемый запуск космического корабля «Союз МС-29», который отправится к Международной космической станции.<br>
        <br>
        Это один из самых впечатляющих моментов современной космонавтики — старт ракеты и начало космической экспедиции.
      </p>
    </div>

    <div>
      <h2>СЛЕДУЮЩАЯ ОСТАНОВКА — БАЙКОНУР</h2>
      <p>
        Закажите фестивальный сет.<br>
        Получите открытку с номером.<br>
        Зарегистрируйте его на сайте.<br>
        И, возможно, именно вы окажетесь на старте космического корабля.
      </p>
    </div>

    <div class="btn_restaurants">
      <Button href="/restaurants">Выбрать ресторан</Button>
    </div>
  </div>
</section>

<style lang="scss">
  @use "$lib/scss/mixins/scr";

  #main_prize {
    @include scr.tablet-and-lower {
      background: linear-gradient(180deg, rgba(247, 248, 248, 0) 0%, rgba(247, 248, 248, 0.6) 60px, #FFF 90px);
    }

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

      @include scr.desktop {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 44px;
        color: #FFF;
        max-width: 1024px;
        padding: 0 100px 0 150px;
        box-sizing: content-box;
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