<section id="first_in_cosmos">
  <h1>Первые в космосе</h1>
  <p>
    Национальный гастрономический фестиваль 1–30 апреля 2026<br>
    <br>
    70 ресторанов в 18 городах России создают специальные гастрономические сеты, вдохновлённые космосом и историей российской космонавтики.<br>
    <br>
    Закажите фестивальный сет, получите открытку с уникальным номером и примите участие в розыгрыше поездки на запуск космического корабля «Союз МС-29» на космодроме Байконур.<br>
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
    line-height: 44px;

    @include scr.desktop {
      margin-top: 0;
      font-size: 24px;
    }
  }

  p {
    font-size: 13px;
    color: var(--text-color-bright-bg);
    line-height: 16px;

    margin: 14px 0 0;

    @include scr.desktop {
      margin-bottom: 0;

      color: #828A9D;
      font-size: 13px;
      line-height: 16px;
      text-transform: uppercase;
    }
  }

</style>