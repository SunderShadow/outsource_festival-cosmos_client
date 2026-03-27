<section id="first_in_cosmos">
  <h1>Первые в космосе</h1>
  <p>
    Национальный гастрономический фестиваль 1–30 апреля 2026<br>
    <br>
    70 ресторанов в 18 городах России создают специальные гастрономические сеты, вдохновлённые космосом и историей российской космонавтики.<br>
    <br>
    Закажите фестивальный сет, получите открытку с уникальным номером и примите участие в розыгрыше поездки на запуск космического корабля «Союз МС-29» на космодроме Байконур.<br>
    <br>
  </p>
</section>

<style lang="scss">
  @use "$lib/scss/mixins/scr";

  h1 {
    margin: 0;
    letter-spacing: -3%;

    font-size: 24px;
    font-weight: 400;
    text-transform: uppercase;

    @include scr.desktop {
      margin-top: 0;
      font-size: 24px;
    }
  }

  p {
    font-size: 13px;
    max-width: 308px;
    color: var(--text-color-bright-bg);
    line-height: 16px;

    @include scr.desktop {

      max-width: 423px;
      margin-bottom: 0;
      color: #FFFFFF;
      font-size: 13px;
      line-height: 16px;
      text-transform: uppercase;
    }
  }

  @include scr.desktop {
    #first_in_cosmos {
      left: 157px;
    }

    #first_in_cosmos {
      position: fixed;
      top: calc(233px + var(--delta-y));
      width: 324px;
    }
  }
</style>