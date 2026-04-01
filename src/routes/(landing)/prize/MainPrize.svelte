<script lang="ts">
  import Button from "$lib/components/Button/Button.svelte"
</script>

<section
    id="main_prize"
>
  <div class="content">
    <h2>ГЛАВНЫЙ ПРИЗ</h2>
    <p>
      Главный приз фестиваля — поездка на космодром Байконур.<br>
      <br>
      Победитель увидит пилотируемый запуск космического корабля «Союз МС-29», который отправится к Международной космической станции.<br>
      <br>
      Это один из самых впечатляющих моментов современной космонавтики — старт ракеты и начало космической экспедиции.
    </p>
    <div class="choose-restaurant"><Button white href="/restaurants#restaurants">Выбрать ресторан</Button></div>
  </div>
</section>

<style lang="scss">
  @use "$lib/scss/mixins/scr";

  #main_prize {
    .content {
      max-width: 262px;
      margin-left: auto;
      margin-right: auto;

      text-align: center;

      @include scr.desktop {
        max-width: 395px;
        padding: 0 100px 0 150px;
        box-sizing: content-box;
      }
    }
  }

  .choose-restaurant {
    margin-top: 16px;
  }

  h2 {
    color: #FFF;
    font-size: 24px;
    font-weight: 400;
    letter-spacing: -3%;
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
    margin-bottom: 0;
    margin-top: 20px;

    font-size: 13px;
    line-height: 16px;

    color: #FFFFFFB2;

    @include scr.desktop {
      margin-bottom: 2em;

      font-size: 13px;
    }
  }
</style>