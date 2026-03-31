<script lang="ts" module>
  import type {Snippet} from "svelte"
  import type {HTMLButtonAttributes} from "svelte/elements"

  export type Props = HTMLButtonAttributes & {
    href?: string
    white?: boolean
    dark?: boolean
    filled?: boolean
    disabled?: boolean
    children: Snippet
  }
</script>

<script lang="ts">
  let {
    white = false,
    dark = false,
    filled = false,
    href,
    disabled = false,
    children,
    ...restProps
  }: Props = $props()

  let tag = $derived(href ? 'a' : 'button')
</script>

<svelte:element
  this={tag}
  {href}
  class="button"
  class:disabled
  class:white
  class:dark
  class:filled
  {...restProps}
>
  {@render children()}
</svelte:element>

<style lang="scss">
  .button {
    all: unset;
    display: inline-flex;
    align-items: center;
    gap: 10px;

    padding: var(--btn-padding-y, 15px) var(--btn-padding-x, 22px);

    font-weight: var(--btn-text-weight, 600);
    font-size: var(--btn-font-size, 11px);
    color: var(--btn-color, #000);

    border: 2px solid var(--btn-color, #000);
    border-radius: 10em;

    cursor: pointer;

    transition-property: background-color, opacity;
    transition-duration: 300ms;

    &.white {
      --btn-color: #fff;
      --btn-color-hover: rgba(255, 255, 255, 0.2);
    }

    &.dark {
      --btn-color: #1C212B;
      --btn-color-hover: rgba(28, 33, 43, 0.6);
    }

    &.disabled {
      opacity: .7;
    }
    &.filled {
      background-color: var(--btn-color);

      &.dark {
        color: #fff;
      }

      &.white {
        color: #000;
      }
    }

    &:not(.filled):hover {
      background-color: var(--btn-color-hover);
    }
  }
</style>