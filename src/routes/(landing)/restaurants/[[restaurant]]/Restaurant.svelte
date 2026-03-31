<script lang="ts">
  import {slide} from "svelte/transition"
  import {onDestroy, onMount} from "svelte"
  import {goto} from "$app/navigation"

  import restaurantEnhanced from "./assets/restaurant.png?enhanced&format=webp&quality=100"
  import client_type from "$lib/store/client_type"
  import Button from "$lib/components/Button/Button.svelte"
  import {browser} from "$app/environment"

  let {
    restaurant
  } = $props()

  const dragDistanceForClosing = 200 // px
  function closeDrag(e: TouchEvent) {
    e.stopPropagation()
    const initY = e.touches[0].clientY
    const initHeight = restaurantEl.offsetHeight

    restaurantEl.style.setProperty('transition-duration', '0ms')

    function calcDragDistance(e: TouchEvent) {
      e.stopPropagation()
      const distanceY = initY - e.touches[0].clientY

      restaurantEl.style.height = Math.min(initHeight, initHeight + distanceY).toString() + 'px'

      if (dragDistanceForClosing < Math.abs(distanceY)) {
        stopDrag(e)
        goto('/restaurants', {
          noScroll: true
        })
      }
    }

    function stopDrag(e: TouchEvent) {
      e.stopPropagation()
      closeDragEl.removeEventListener('touchmove', calcDragDistance)
      closeDragEl.removeEventListener('touchend', stopDrag)

      restaurantEl.style.removeProperty('transition-duration')
      restaurantEl.style.removeProperty('height')
    }

    closeDragEl.addEventListener('touchmove', calcDragDistance)
    closeDragEl.addEventListener('touchend', stopDrag)
  }

  onMount(() => {
    if (browser) {
      document.body.style.setProperty('height', '100svh')
      document.body.style.setProperty('overflow', 'hidden')
    }
    closeDragEl.addEventListener('touchstart', closeDrag)
  })

  onDestroy(() => {
    if (browser) {
      document.body.style.removeProperty('height')
      document.body.style.removeProperty('overflow')
    }
  })

  // @ts-ignore
  let closeDragEl: HTMLDivElement = $state()
  // @ts-ignore
  let restaurantEl: HTMLElement = $state()

  let selectedMeal = $state(restaurant.meals.length ? restaurant.meals[0] : null)
</script>

<svelte:head>
  <title>{restaurant.title}</title>
  <link rel="preload" as="image" href={restaurantEnhanced.img.src} fetchpriority="high">
</svelte:head>

<article class="restaurant" transition:slide bind:this={restaurantEl} onwheel={e => {e.stopPropagation()}}>
  <div class="drag-area" bind:this={closeDragEl}>
    <svg width="62" height="5" viewBox="0 0 62 5" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path opacity="0.2" d="M2.5 2.5H58.6" stroke="black" stroke-width="5" stroke-miterlimit="3.99933" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </div>

  <div class="content">
    <section class="fast-content" style:--bg="url('{restaurant.thumbnails.desktop}')">
      <div class="header">
        <a class="back" href="/restaurants" aria-label="Обратно">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 3.75C16.7861 3.75 13.6443 4.70305 10.972 6.48862C8.29969 8.27419 6.21689 10.8121 4.98696 13.7814C3.75704 16.7507 3.43524 20.018 4.06225 23.1702C4.68926 26.3224 6.23692 29.2179 8.50952 31.4905C10.7821 33.7631 13.6776 35.3107 16.8298 35.9378C19.982 36.5648 23.2493 36.243 26.2186 35.013C29.1879 33.7831 31.7258 31.7003 33.5114 29.028C35.297 26.3557 36.25 23.2139 36.25 20C36.2455 15.6916 34.5319 11.561 31.4855 8.51454C28.439 5.46806 24.3084 3.75455 20 3.75ZM20 33.75C17.2805 33.75 14.6221 32.9436 12.3609 31.4327C10.0997 29.9218 8.33737 27.7744 7.29666 25.2619C6.25596 22.7494 5.98366 19.9847 6.51421 17.3175C7.04476 14.6503 8.35432 12.2003 10.2773 10.2773C12.2003 8.35431 14.6503 7.04475 17.3175 6.5142C19.9848 5.98366 22.7494 6.25595 25.2619 7.29666C27.7744 8.33736 29.9218 10.0997 31.4327 12.3609C32.9436 14.6221 33.75 17.2805 33.75 20C33.7459 23.6455 32.2959 27.1404 29.7182 29.7182C27.1404 32.2959 23.6455 33.7459 20 33.75ZM23.3844 14.6344L18.0172 20L23.3844 25.3656C23.5005 25.4818 23.5926 25.6196 23.6555 25.7714C23.7184 25.9231 23.7507 26.0858 23.7507 26.25C23.7507 26.4142 23.7184 26.5769 23.6555 26.7286C23.5926 26.8804 23.5005 27.0182 23.3844 27.1344C23.2682 27.2505 23.1304 27.3426 22.9786 27.4055C22.8269 27.4683 22.6643 27.5007 22.5 27.5007C22.3358 27.5007 22.1731 27.4683 22.0214 27.4055C21.8696 27.3426 21.7318 27.2505 21.6156 27.1344L15.3656 20.8844C15.2494 20.7683 15.1572 20.6304 15.0943 20.4787C15.0314 20.3269 14.999 20.1643 14.999 20C14.999 19.8357 15.0314 19.6731 15.0943 19.5213C15.1572 19.3696 15.2494 19.2317 15.3656 19.1156L21.6156 12.8656C21.7318 12.7495 21.8696 12.6574 22.0214 12.5945C22.1731 12.5317 22.3358 12.4993 22.5 12.4993C22.6643 12.4993 22.8269 12.5317 22.9786 12.5945C23.1304 12.6574 23.2682 12.7495 23.3844 12.8656C23.5005 12.9818 23.5926 13.1196 23.6555 13.2714C23.7184 13.4231 23.7507 13.5858 23.7507 13.75C23.7507 13.9142 23.7184 14.0769 23.6555 14.2286C23.5926 14.3804 23.5005 14.5182 23.3844 14.6344Z" fill="white"/>
          </svg>
        </a>

        <div class="img">
          <img src={restaurant.thumbnails.mobile} alt="">
        </div>

        <div class="header-content">
          <div class="header-content--inner-wrapper">
            <div class="title">
              <h1>{restaurant.title}</h1>
              <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_414_3453)">
                  <path d="M12.0829 1.29086C13.1527 0.209687 14.8993 0.209688 15.9691 1.29086L17.1176 2.45157C17.693 3.03312 18.4987 3.32636 19.3133 3.25075L20.9392 3.09984C22.4537 2.95927 23.7916 4.08195 23.9162 5.59783L24.0499 7.22523C24.1169 8.04061 24.5456 8.78311 25.2182 9.24882L26.5608 10.1783C27.8113 11.0441 28.1146 12.7642 27.2356 14.0055L26.2919 15.3381C25.8192 16.0058 25.6703 16.8501 25.8862 17.6392L26.3171 19.2142C26.7186 20.6813 25.8453 22.1939 24.374 22.5798L22.7946 22.994C22.0032 23.2016 21.3464 23.7527 21.0046 24.496L20.3224 25.9795C19.6869 27.3614 18.0456 27.9588 16.6705 27.3087L15.1943 26.6108C14.4547 26.2611 13.5973 26.2611 12.8577 26.6108L11.3814 27.3087C10.0064 27.9588 8.36512 27.3614 7.72961 25.9795L7.04736 24.496C6.70552 23.7527 6.04874 23.2016 5.25738 22.994L3.67793 22.5798C2.2067 22.1939 1.33341 20.6813 1.73483 19.2142L2.16578 17.6392C2.3817 16.8501 2.23282 16.0058 1.76003 15.3381L0.816391 14.0055C-0.0625862 12.7642 0.240707 11.0441 1.49122 10.1783L2.83373 9.24882C3.50637 8.78311 3.93506 8.04061 4.00205 7.22523L4.13577 5.59783C4.26032 4.08195 5.59828 2.95927 7.11277 3.09984L8.73866 3.25075C9.55328 3.32636 10.3589 3.03312 10.9344 2.45157L12.0829 1.29086Z" fill="url(#paint0_linear_414_3453)"/>
                  <path d="M12.4202 19.3249C12.009 19.3249 11.5978 19.1675 11.2845 18.8543L8.07167 15.6414C7.44356 15.0133 7.44356 13.9981 8.07167 13.37C8.69978 12.7418 9.71503 12.7418 10.3431 13.37L12.4202 15.447L17.7102 10.1571C18.3383 9.52901 19.3535 9.52901 19.9816 10.1571C20.6097 10.7852 20.6097 11.8005 19.9816 12.4286L13.556 18.8543C13.2427 19.1675 12.8315 19.3249 12.4202 19.3249Z" fill="#181818"/>
                </g>
                <defs>
                  <linearGradient id="paint0_linear_414_3453" x1="14.026" y1="0.47998" x2="14.026" y2="27.5716" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#FDFDFD"/>
                    <stop offset="1" stop-color="#D7D7D7"/>
                  </linearGradient>
                  <clipPath id="clip0_414_3453">
                    <rect width="28.0519" height="28.0519" fill="white"/>
                  </clipPath>
                </defs>
              </svg>
            </div>
            <div class="location">{restaurant.location}</div>
            <span class="working_time">Рабочие часы <span>{restaurant.working_time.open_at} - {restaurant.working_time.close_at}</span></span>
          </div>
          <Button href={restaurant.external_website_link} --btn-font-size="16px" white filled>Посетить вебсайт</Button>
        </div>
      </div>

      <div class="contacts">
        <div class="address">
          <span>Адрес</span>
          <a href={restaurant.map_link}>Посмотреть<br>   на карте</a>
        </div>
        <span class="divider"></span>
        <div class="phone">
          <span>Номер</span>
          <a href="tel:{restaurant.phone}">{restaurant.phone}</a>
        </div>
      </div>

      <div class="divider"></div>

      <p>
        {restaurant.description}
      </p>
    </section>

    <div class="col-2">

      {#if selectedMeal}
        <section id="meal_preview">
          <img src={selectedMeal.thumbnails.full} alt="">
          <div class="subtitle">{selectedMeal.chef_name}</div>
          <h2 class="title">{selectedMeal.name}</h2>

          <div class="description_cost">
            <div class="description">
              <h3 class="description-title">Описание сета</h3>
              <p>{selectedMeal.description}</p>
            </div>

            <div class="cost">
              {selectedMeal.cost} ₽
            </div>
          </div>
        </section>
      {/if}
      <section id="reviews">
        <h2>Отзывы</h2>
        {#if selectedMeal}
          <div class="subtitle">{selectedMeal.chef_name}</div>
        {/if}

        <div class="statistics">
          <div class="item">
            <div class="name">Атмосфера ресторана</div>
            <div class="bar" style:--value="{restaurant.rating.atmosphere / 10 * 100}%"></div>
            <div class="value">{restaurant.rating.atmosphere}</div>
          </div>
          <div class="item">
            <div class="name">Вкус сета</div>
            <div class="bar" style:--value="{restaurant.rating.taste / 10 * 100}%"></div>
            <div class="value">{restaurant.rating.taste}</div>
          </div>
          <div class="item">
            <div class="name">Подача</div>
            <div class="bar" style:--value="{restaurant.rating.serving / 10 * 100}%"></div>
            <div class="value">{restaurant.rating.serving}</div>
          </div>
          <div class="item">
            <div class="name">Обслуживание</div>
            <div class="bar" style:--value="{restaurant.rating.service / 10 * 100}%"></div>
            <div class="value">{restaurant.rating.service}</div>
          </div>
        </div>
      </section>
    </div>

    {#if restaurant.meals.length > 0}
      <section id="meals">
        {#each restaurant.meals as meal, i}
          <article>
            <img src={meal.thumbnails.card} alt="">
            <div class="content">
              <h3><a href={$client_type.isMobile ? '#meal_preview' :''} onclick={() => {selectedMeal = restaurant.meals[i]}}>{meal.name}</a></h3>
              <span class="subtitle">{meal.chef_name}</span>
            </div>
          </article>
        {/each}
      </section>
    {/if}

  </div>
</article>

<style lang="scss">
  @use "$lib/env";
  @use "$lib/scss/mixins/scr";

  .restaurant {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100svh;
    z-index: 21;

    transition: height;
    transition-duration: 300ms;

    overflow: auto;
    scroll-behavior: smooth;
    display: flex;
    background-color: #F3F4F5;
    flex-direction: column;

    box-shadow: 0 0 0 100vh rgba(0,0,0,0.5);

    @include scr.desktop {
      overflow: hidden;
      padding: 16px;
      height: auto;
      min-height: 100vh;
      background-color: #F1F2F2;
    }
  }

  .drag-area {
    position: absolute;
    top: 0;
    left: 0;
    height: 80px;
    display: flex;
    width: 100%;

    align-items: center;
    z-index: 2;

    @include scr.desktop {
      display: none;
    }

    svg {
      display: block;
      margin-left: auto;
      margin-right: auto;
    }
  }

  .header {
    position: relative;

    .back {
      display: block;
      @include scr.desktop {
        margin-bottom: 15px;
      }

      @include scr.tablet-and-lower {
        position: absolute;
        top: 20px;
        left: 20px;
        z-index: 10;
      }
    }

    .img {
      @include scr.desktop {
        display: none;
      }

      border-radius: 37px;

      &::before {
        content: '';
        position: absolute;
        bottom: 5px;
        left: 0;
        right: 0;
        top: 0;
        background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5));
        border-bottom-left-radius: inherit;
        border-bottom-right-radius: inherit;
      }
    }

    img {
      border-radius: 37px;
      width: 100%;
      object-fit: cover;
    }

    &-content {
      @include scr.tablet-and-lower {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: center;
        padding: 20px 20px 48px;
      }

      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;

      @include scr.desktop {
        position: static;
      }

      color: #FAFAFA;

      &--inner-wrapper {
        max-width: 275px;

        margin-bottom: 40px;

        @include scr.tablet-and-lower {
          margin-left: 32px;
          margin-right: auto;
        }

        @include scr.desktop {
          max-width: 100%;
        }
      }
    }

    .location {
      font-size: 17px;
      margin-top: 5px;
      margin-bottom: 5px;

      @include scr.desktop {
        font-size: 28px;
      }
    }

    .working_time {
      font-size: 14px;

      @include scr.desktop {
        font-size: 24px;
      }

      span {
        font-size: 11px;
        margin-left: 5px;

        @include scr.desktop {
          font-size: 19px;
        }
      }
    }

    .title {
      display: flex;
      align-items: center;
      gap: 10px;

      @include scr.desktop {
        :global svg {
          width: 46px;
          height: 46px;
        }
      }
      h1 {
        font-size: 25px;
        margin: 0;

        @include scr.desktop {
          font-size: 42px;
        }
      }
    }
  }

  .content {
    display: grid;
    flex-grow: 1;

    @include scr.desktop {
      grid-template-columns: 3fr 160px 2fr;

      gap: 14px;
    }
  }

  .fast-content {
    position: relative;
    padding: 10px;
    border-radius: 20px; // Desktop

    @include scr.desktop {
      &::after {
        content: '';
        background: linear-gradient(90deg, rgba(0, 0, 0, .75), rgba(0, 0, 0, .25));
        border-radius: 20px;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        z-index: 1;
      }
      &::before {
        content: '';
        background: linear-gradient(rgba(0, 0, 0, .25), rgba(0, 0, 0, .98));
        border-radius: 20px;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        z-index: 1;
      }
      .header, .contacts, p {
        position: relative;
        z-index: 2;
      }
    }


    .divider {
      display: none;
    }
    @include scr.tablet-and-lower {
      background-color: #FFF;
    }

    @include scr.desktop {
      padding: 40px 73px;

      color: #FFF;
      background-image: var(--bg);
      background-repeat: no-repeat;
      background-size: cover;
    }

    > p {
      max-width: 278px;
      font-size: 14px;
      font-weight: 300;
      line-height: 1;
      color: #78858F;

      @include scr.tablet-and-lower {
        text-align: center;
        padding-bottom: 70px;

        margin-left: auto;
        margin-right: auto;
      }

      @include scr.desktop {
        color: inherit;
        max-width: 65%;
        margin: 0;
        line-height: 100%;
        font-size: 20px;

        @media (min-width: 1600px) {
          font-size: 24px;
        }
      }
    }

    > .divider {
      width: 100%;
      height: 1px;

      background-color: #D5DEE2;
      margin: 28px -10px;
    }
  }

  .contacts {
    display: flex;
    margin-top: 35px;

    @include scr.desktop {
      margin: 41px 0;
    }

    a {
      text-decoration: none;
    }

    .divider {
      display: block;
      width: 1px;
      background-color: #D5DEE2;
      margin: 0;
    }

    .address {
      a {
        text-align: center;
      }

      @include scr.tablet-and-lower {
        br {
          display: none;
        }
      }
    }
    > div {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: auto;

      > :first-child {
        font-size: 14px;
        font-weight: 400;

        @include scr.desktop {
          font-size: 21px;
        }
      }

      > :last-child {
        font-size: 12px;
        color: #78858F;

        @include scr.desktop {
          text-decoration: underline;
          color: inherit;
          font-size: 17px;
        }
      }
    }
  }

  #meal_preview {
    margin-top: 13px;
    @include scr.tablet-and-lower {
      background-color: #FFF;
    }
    padding-bottom: 30px;

    img {
      display: block;
      aspect-ratio: 230 / 240;

      @include scr.tablet-and-lower {
        width: max(230px, 60%);
      }

      max-height: 240px;

      margin-left: auto;
      margin-right: auto;
    }

    .subtitle {
      max-width: fit-content;
      margin-left: auto;
      margin-right: auto;
      font-weight: 400;
      font-size: 18px;
      letter-spacing: -2%;
      text-align: center;

      margin-top: 16px;
    }

    .title {
      max-width: fit-content;
      line-height: 150%;
      margin: 0 auto;
      font-size: 28px;

      @include scr.desktop {
        font-size: 42px;
      }
    }

    .description {
      border-radius: 16px;
      margin-top: 16px;
      max-width: 306px;
      margin-left: auto;
      margin-right: auto;
      padding: 20px;

      background-color: #EFEFEF;

      &-title {
        font-size: 16px;
        font-weight: 400;
        margin: 0;
      }

      p {
        margin: 0;
        color: #78858F;
      }
    }

    .cost {
      max-width: fit-content;
      background-color: #EFEFEF;
      margin: 20px auto 0 auto;

      padding: 17px 25px;
      border-radius: 37px;
      font-size: 16px;
      color: #000000;
    }
  }

  #reviews {
    padding: 32px 14px;

    h2 {
      width: fit-content;

      margin: 0 auto;

      font-size: 24px;
      font-weight: 500;
    }

    .subtitle {
      max-width: fit-content;
      margin-left: auto;
      margin-right: auto;
      font-size: 16px;
      color: #767676;
    }
  }

  .statistics {
    margin-top: 14px;

    .item {
      display: flex;
      gap: 14px;
      align-items: center;
    }

    .item + .item {
      margin-top: 20px;
    }

    .bar {
      position: relative;
      flex-grow: 1;
      height: 4px;
      align-items: center;

      background-color: #D9D9D9;
      border-radius: 10em;

      &::before {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        width: var(--value);
        border-radius: 10em;
        background-color: #FF4B00;
      }
    }

    .name {
      font-size: 12px;
      width: max(25%, 100px);
    }

    .value {
      opacity: .4;
      font-size: 14px;
      width: 4ex;
      text-align: right;
    }
  }

  @include scr.desktop {
    .col-2 {
      grid-column: 3 / 4;
    }
  }

  @include scr.tablet-and-higher {
    #meal_preview {
      .description_cost {
        display: flex;
        align-items: center;
      }
    }
  }

  #meals {
    overflow: auto;

    &::-webkit-scrollbar {
      display: none;
    }

    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    padding: 10px;

    @include scr.tablet {
      grid-template-columns: repeat(auto-fit, minmax(172px, 1fr));
    }

    @include scr.desktop {
      grid-row: 1;
      grid-column: 2 / 3;
      padding: 0;

      display: flex;
      flex-direction: column;
    }

    article {
      position: relative;
      aspect-ratio: 1 / 1;

      &::before {
        content: '';
        border-radius: 20px;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        z-index: 2;

        background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.7) 100%);
      }

      img {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;

        border-radius: 8px;
        width: 100%;
        height: 100%;
        z-index: 1;
        object-fit: cover;
      }

      .content {
        display: flex;
        gap: 0;
        flex-direction: column;
        justify-content: end;

        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;

        z-index: 2;
        color: #fff;

        padding: 12px;

        h3 {
          margin: 0;
          font-size: 14px;
          font-weight: 400;
        }

        .subtitle {
          font-size: 10px;
        }

        a {
          color: inherit;
          text-decoration: none;

          &::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
          }
        }
      }
    }
  }
</style>