<script lang="ts">
  import {fade} from "svelte/transition"

  let {
    children,
    onBgTouch
  } = $props()

  function closeIfBgTouched(e: Event) {
    if (e.target === e.currentTarget) {
      onBgTouch()
    }
  }
</script>

<div
  class="modal"
  transition:fade={{duration: 300}}
  onwheel={e => {e.stopPropagation()}}
  ontouchstart="{e => e.stopPropagation()}"
  onclick={closeIfBgTouched}
>
  <div class="container">
    {@render children?.()}
  </div>
</div>

<style lang="scss">
  .modal {
    display: flex;
    justify-content: center;
    align-items: center;

    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.5);

    z-index: var(--modal-z-index, 10);
  }

  .container {
    width: var(--modal-width, 90%);
    height: var(--modal-height, 90%);
    background-color: var(--modal-bg-color, #FFF);
    padding: var(--modal-padding, 16px);
    border-radius: 16px;
    overflow: auto;

  }
</style>