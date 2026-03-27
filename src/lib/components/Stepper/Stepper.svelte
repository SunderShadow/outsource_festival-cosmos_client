<script lang="ts" module>
  import type {Props as StepProps} from "$lib/components/Stepper/Step.svelte"

  export type Step = {
    href: StepProps["href"]
    relatedHrefs?: Array<RegExp | string>
    text: StepProps["text"]
  }

  export type Props = {
    activeHref: string
    steps: Array<Step>
    toNext?: Function
    toPrevious?: Function
    dark?: boolean
  }
</script>

<script lang="ts">
  import StepChildren from "$lib/components/Stepper/Step.svelte"
  import {goto} from "$app/navigation"
  import {afterNavigate, preloadData} from "$app/navigation"

  afterNavigate(() => {
    if (nextStep) {
      preloadData(nextStep.href)
    }

    if (prevStep) {
      preloadData(prevStep.href)
    }
  })
  let {
    activeHref,
    steps,
    dark,
    toNext = $bindable(),
    toPrevious = $bindable(),
  }: Props = $props()

  let nextStep = $derived.by(() => {
    if (activeI < steps.length - 1) {
      return steps[activeI + 1]
    }
    return null
  })

  let prevStep = $derived.by(() => {
    if (activeI > 0) {
      return steps[activeI - 1]
    }
    return null
  })

  toNext = () => {
    if (nextStep) {
      goto(nextStep.href)
    }
  }

  toPrevious = () => {
    if (prevStep) {
      goto(prevStep.href)
    }
  }
  let activeI = $derived(steps.findIndex(it => {
    if (!!it.relatedHrefs) {
      for (const relatedHref of it.relatedHrefs) {
        if (typeof relatedHref === 'string' && relatedHref === activeHref) {
          return true
        } else if (relatedHref instanceof RegExp && relatedHref.test(activeHref)) {
          return true
        }
      }
    } else {
      return it.href === activeHref
    }
  }))
</script>

<div class="stepper" class:dark>
  <div class="tape" style:--step={activeI}>
    {#each steps as step, i (i)}
      <StepChildren
          {dark}
          {...step}
          active={activeI === i}
          previous={activeI > i}
      />
      <div class="divider"></div>
    {/each}
  </div>
</div>

<style lang="scss">
  @use "$lib/env";

  .stepper {
    position: relative;
    width: 100%;
    height: 80px;

    @media (min-width: env.$desktop-width) {
      height: 100vh;
    }
  }

  .tape {
    position: absolute;
    left: 50%;

    display: flex;
    gap: 10px;

    transition: transform 300ms;

    --step-transition-delay: 0ms;

    transform: translateX(calc(var(--step) * -116px));

    @media (min-width: env.$desktop-width) {
      left: 5ex;
      flex-direction: column;
      align-items: center;
      gap: 15px;
      transform: translateY(calc(var(--step) * -116px));
    }

    .divider:last-of-type {
      display: none;
    }
  }

  .divider {
    width: 60px;
    height: 2px;

    margin-top: 11px;

    background-color: #A1AEBE;

    @media (min-width: env.$desktop-width) {
      height: 60px;
      width: 2px;
      flex-direction: column;
      margin-top: 1.6em;
    }
  }
</style>