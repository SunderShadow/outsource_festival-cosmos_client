<section id="mission">
  <h2>Миссия проекта</h2>
  <p>
    Фестиваль «Первые в космосе» — национальный гастрономический проект, который объединяет космическую отрасль и современную гастрономию.<br>
    Через специальные блюда и авторские сеты шеф-повара предлагают новый взгляд на историю освоения космоса. Их вдохновляют орбитальные экспедиции, научные открытия и символы космической эпохи.<br>
    Космос выходит за пределы лабораторий и космодромов и становится частью современной городской культуры: встреч, разговоров и гастрономических впечатлений.
  </p>
</section>

<style lang="scss">
  @use "$lib/scss/mixins/scr";

  #mission {
    @include scr.desktop {
      margin-top: 24px;
    }
  }
  h2 {
    font-weight: 400;
    text-transform: uppercase;
    margin: 0 0 16px;
    line-height: 44px;
  }

  p {
    font-size: 13px;
    color: #828A9D;
    line-height: 16px;
    text-transform: uppercase;

    margin: 0;
    @include scr.desktop {
      font-size: 13px;
      line-height: 16px;
    }
  }
</style>