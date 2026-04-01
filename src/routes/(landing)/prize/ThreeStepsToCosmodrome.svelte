<section id="three-steps-to-cosmodrome">
  <div class="content">
    <div class="header">
      <h2>ТРИ ШАГА К КОСМОДРОМУ</h2>
      <p>Все зарегистрированные участники автоматически принимают участие в розыгрыше поездки на запуск ракеты.</p>
    </div>
  </div>

  <div class="steps">
    <div class="step">
      <div>
        <div class="number">1</div>
        <div class="title">Купить сет</div>
        <p>Закажите фестивальный сет в ресторане-участнике</p>
      </div>
    </div>
    <div class="step">
      <div>
        <div class="number">2</div>
        <div class="title">Получить номер</div>
        <p>Получите открытку с уникальным номером</p>
      </div>
    </div>
    <div class="step">
      <div>
        <div class="number">3</div>
        <div class="title">Зарегистрироваться</div>
        <p>Зарегистрируйте номер на сайте проекта форму на сайте с номером</p>
      </div>
    </div>
  </div>
</section>

<style lang="scss">
  @use "$lib/scss/mixins/scr";

  h2 {
    font-size: 24px;
    line-height: 44px;
    font-weight: 400;
    margin: 0;
  }

  .header {
    max-width: 282px;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
  }

  p {
    font-size: 13px;
    line-height: 16px;
    margin: 11px 0 0;
  }

  .steps {
    max-width: 260px;
    margin-top: 39px;

    margin-left: auto;
    margin-right: auto;

    @include scr.tablet {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      max-width: none;
      gap: 20px
    }

    @include scr.desktop {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 44px;
      max-width: 800px;
      padding: 0 100px 0 150px;
      box-sizing: content-box;
    }
  }

    @include scr.mobile {
      .step + .step {
        margin-top: 16px;
      }
    }

  .step {
    display: flex;
    justify-content: center;

    width: 260px;

    @include scr.tablet {
      > div {
        width: 200px;
        flex-shrink: 1;
        flex-grow: 0;
      }
    }

    .number {
      font-size: 64px;
    }

    .title {
      font-size: 18px;
      font-weight: 500;
    }

    p {
      font-size: 14px;
      color: #FFFFFF80;
    }
  }
</style>