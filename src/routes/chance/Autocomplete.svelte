<script lang="ts">
  import {slide} from "svelte/transition"

  let {
    value = $bindable(),
    options = []
  } = $props()


  type Option = {
    title: string,
    value: any
  }

  // @ts-ignore
  let inputEl: HTMLInputElement = $state.raw()
  let optionsVisible = $state.raw(false)
  let inputText = $state.raw('')

  let filteredOptions = $derived(options.filter(it => it.title.toUpperCase().includes(inputText.toUpperCase())))
  function select(option: Option) {
    value = option.value
    inputText = option.title
    optionsVisible = false
  }
</script>

<div class="autocomplete">
  <input bind:value={inputText} type="text" placeholder="ввод" bind:this={inputEl} onfocus={() => {optionsVisible = true}}>
  {#if optionsVisible}
    <div class="options" class:visible={optionsVisible} transition:slide={{duration: 200}}>
      {#each filteredOptions as option}
        <button onclick={() => {select(option)}} type="button" class="option">{option.title}</button>
      {/each}
    </div>
  {/if}
</div>

<style lang="scss">
  .autocomplete {
    position: relative;
    &:focus {
      outline: 1px solid #1C212B;
    }
  }

  input {
    display: block;
    width: 100%;
    background: #F3F3F3;
    border-radius: 10px;
    border: none;
    padding: 11px 15px;

    font-size: 12px;

    transition: outline 300ms;
    outline: 1px solid transparent;

    &::placeholder {
      color: #78858F;
      font-weight: 500;
    }
  }

  .options {
    position: absolute;
    top: calc(100% + 10px);
    left: 0;
    width: 100%;
    background: #F3F3F3;
    max-height: 20vh;
    overflow: auto;

    box-shadow: 0 2px 10px rgba(0, 0, 0, .1);
    z-index: 10;
  }

  .option {
    display: block;
    border: none;
    background: none;
    width: 100%;
    padding: 10px 15px;
    text-align: left;
  }
</style>