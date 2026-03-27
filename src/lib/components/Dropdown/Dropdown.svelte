<script lang="ts" module>
  export type Option = {
    _v: any
    _t: string
  }

  export type Props = {
    title: string
    visible?: boolean
    value?: any
    onselect?: (_v) => {}
    options: Array<Option>
  }
</script>

<script lang="ts">
  import { slide } from 'svelte/transition'

  let {
    title,
    visible = $bindable(),
    value = $bindable(null),
    onselect,
    options = []
  }: Props = $props()

  let currentValueTitle = $state.raw('')

  if (value) {
    currentValueTitle = options.find((i) => i._v === value)?._t
  }

  function toggle(e) {
    e.preventDefault()
    e.stopPropagation()

    visible = !visible

    if (visible) {
      let listener = () => {
        visible = false
        document.removeEventListener('click', listener)
      }
      document.addEventListener('click', listener)
    }
  }

  function select(_v, _t) {
    value = _v
    currentValueTitle = _t
    visible = false

    onselect(_v)
  }
</script>

<div class="dropdown">
  <button class="toggler" onclick={toggle}>
    <span>{currentValueTitle ? currentValueTitle : title}</span>
    <svg class:open={visible} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 12L10 8L6 4" stroke="#272327" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  </button>

  {#if visible}
    <div class="options" transition:slide>
      {#each options as { _v, _t }}
        <button
            class="option"
            onclick={() => {select(_v, _t)}}>
          <span>{_t}</span>
        </button>
      {/each}
    </div>
  {/if}
</div>

<style lang="scss">
  .dropdown {
    position: relative;
    width: 100%;
  }

  .toggler {
    display: flex;
    gap: 10px;
    padding: 10px 20px;

    justify-content: space-between;
    align-items: center;
    cursor: pointer;

    width: 100%;
    height: 100%;

    background: none;
    border-radius: 30px;
    border: 1px solid #e5e7eb;
    text-align: left;
    color: #374151;
    background: #FFF;

    cursor: pointer;

    font-size: 13px;
  }

  svg {
    transform: rotate(90deg);
  }

  .options {
    position: absolute;
    top: calc(100% + 2px);
    left: 50%;
    min-width: 100%;
    max-height: var(--dropdown-max-height, auto);
    overflow: auto;
    transform: translateX(-50%);
    background: #fff;
    box-shadow: 0 1px 2px 0 #0000000d;
    border-radius: 14px;
    z-index: var(--dropdown-z-index, 10);
  }

  .option {
    width: 100%;
    background-color: transparent;
    text-align: left;
    border: none;
    outline: none;
    padding: 10px;

    transition: background-color var(--transition-duration);
    cursor: pointer;

    span {
      display: block;
      width: max-content;
    }

    &:hover {
      background-color: #f2f2f2;
    }
  }
</style>
