<script lang="ts" module>
  import type {Snippet} from "svelte"

  export type Props = {
    children: Snippet
  }
</script>
<script lang="ts">
  import {onMount} from "svelte"

  let {
    children
  }: Props = $props()

  let preventAnimation = $state.raw(true)

  onMount(() => {
    preventAnimation = false
  })
</script>

<div class="slide-on-mount" class:preventAnimation>
  {@render children?.()}
</div>

<style lang="scss">
  @use "./env";

  @keyframes slide {
    0% {
      transform: translate(var(--slide-x-start, env.$x-start), var(--slide-y-start, env.$y-start));
      opacity: 0;
    }
    100% {
      transform: translateX(0);
      opacity: 1;
    }
  }

  .slide-on-mount {
    animation-name: slide;
    animation-duration: var(--slide-duration, env.$transition-duration);
    animation-delay: var(--slide-delay, 0);
  }
</style>