<script lang="ts">
  import {onDestroy, onMount} from "svelte"

  const startTime = new Date('2026-05-20T00:00:00').getTime()

  let days = $state.raw(0)
  let hours = $state.raw(0)
  let minutes = $state.raw(0)
  let seconds = $state.raw(0)

  function calcTime() {
    let now = new Date().getTime();
    const distance = startTime - now;

    days = Math.floor(distance / (1000 * 60 * 60 * 24));
    hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (distance < 0) {
      clearInterval(countdownInterval);
    }
  }

  calcTime()

  let countdownInterval

  onMount(() => {
    setInterval(calcTime, 1000)
  })

  onDestroy(() => {
    clearInterval(countdownInterval)
  })
</script>

<div class="countdown">
  <div class="number" text="дней">{days}</div>
  <div class="number" text="часов">{hours}</div>
  <div class="number" text="минут">{minutes}</div>
  <div class="number" text="секунд">{seconds}</div>
</div>

<style lang="scss">
  @use "$lib/env";
  @use "$lib/scss/mixins/scr";

  .number {
    position: relative;
    width: 56px;
    height: 56px;
    border-radius: 8px;
    font-size: 28px;

    display: flex;
    justify-content: center;
    align-items: center;
    background: #1C212B;

    @media (min-width: 650px) {
      width: 84px;
      height: 84px;
      font-size: 42px;
    }

    @include scr.desktop {
      font-size: 42px;
      width: 84px;
      height: 84px;
      border-radius: 12px;
    }

    &::before {
      content: attr(text);
      position: absolute;
      top: 100%;
      left: 50%;

      font-size: 11px;

      @media (min-width: env.$desktop-width) {
        font-size: 16.5px;
      }

      color: rgba(#FFF, .75);
      transform: translateX(-50%);
    }
  }

  .countdown {
    display: flex;
    gap: 24px;
    justify-content: center;
  }
</style>