<script lang="ts" module>
  export type Props = {
      active?: boolean
    previous?: boolean
    href: string
    // HTML
    text: string
    dark?: boolean
  }
</script>
<script lang="ts">
  import {goto} from "$app/navigation"

  let {
    active = false,
    previous = false,
    dark = false,
    href,
    text
  }: Props = $props()
</script>

<button class="step" class:active class:previous class:dark onclick={() => {goto(href)}}>
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle class="outer" cx="12" cy="12" r="11.25" stroke="white" stroke-width="1.5"/>
    <circle class="inner" cx="12" cy="12" r="4.125" fill="white"/>
  </svg>
  <span>{@html text}</span>
</button>

<style lang="scss">
  @use "$lib/env";

  .step {
    display: block;
    background: none;
    border: none;

    height: 30px;
    position: relative;
    opacity: .3;

    transition: opacity var(--step-transition-duration, 300ms);
    cursor: pointer;

    &:hover {
      opacity: .5;
    }

    .inner {
      fill: #242E39;

      @media (min-width: env.$desktop-width) {
        fill: #A1AEBE;
      }

      transition: fill var(--step-transition-duration, 300ms);
    }

    .outer {
      stroke: #A1AEBE;
      transition: stroke var(--step-transition-duration, 300ms);
    }

    &.dark {
      .inner {
        fill: #1C212B !important;
      }

      .outer {
        stroke: #1C212B !important;
      }

      span {
        color: #1C212B !important;
      }
    }

    &.active,
    &.previous {
      svg {
        .inner {fill: #FFF}
        .outer {stroke: #FFF}
      }

      span {
        color: #FFF;
      }
    }

    svg {
      display: block;
      width: fit-content;
      margin-left: auto;
      margin-right: auto;
    }
  }

  span {
    position: absolute;
    top: 24px;
    left: 50%;
    transform: translateX(-50%);

    text-decoration: none;
    display: block;

    margin-top: 7px;

    margin-left: auto;
    margin-right: auto;

    text-align: center;
    text-transform: uppercase;

    font-weight: 700;
    font-size: 10px;

    text-wrap: nowrap;
    color: #465668;

    @media (min-width: env.$desktop-width) {
      color: #FFF;
    }

    transition: color var(--step-transition-duration, 300ms);
  }

  .step.active {
    opacity: 1;
    transition-delay: var(--step-transition-delay, 300ms);

    svg {
      *[fill] {transition-delay: var(--step-transition-delay, 300ms)}
      *[stroke] {transition-delay: var(--step-transition-delay, 300ms)}
    }

    span {
      transition-delay: var(--step-transition-delay, 300ms);
    }
  }
</style>