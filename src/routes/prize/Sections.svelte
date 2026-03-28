<script lang="ts">
</script>
<div class="sections-wrapper">
  <div class="sections">
    <section>
      <div class="order">1</div>
      <h2>Купить сет</h2>
      <p>Закажите фестивальный сет в ресторане-участнике</p>
    </section>
    <section>
      <div class="order">2</div>
      <h2>Получить номер</h2>
      <p>Получите открытку с уникальным номером</p>
    </section>
    <section>
      <div class="order">3</div>
      <h2>Зарегистрироваться</h2>
      <p>Зарегистрируйте номер на сайте проекта форму на сайте с номером</p>
    </section>
  </div>
</div>

<style lang="scss">
  @use "$lib/env";
  @use "$lib/scss/mixins/scr";

  .sections-wrapper {
    position: relative;
    z-index: 2;
    max-width: 324px;
    width: 100%;

    display: flex;
    align-items: center;
    padding: 32px;

    @include scr.tablet-and-lower {
      margin-left: auto;
      margin-right: auto;
    }

    @include scr.desktop {
      padding-top: 0;
    }
  }

  @include scr.tablet-and-lower {
    section + section {
      margin-top: 15px;
    }
  }

  .click-area {
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;

    z-index: 10;
  }

  .sections {
    flex-grow: 1;

    @include scr.desktop {
      display: flex;
      flex-direction: column;
      justify-content:  space-between;
    }
  }

  .order {
    font-size: 64px;
  }

  h2 {
    font-size: 18px;
    font-weight: 300;
  }

  p {
    font-size: 14px;
    color: #FFFFFF80;
  }
</style>