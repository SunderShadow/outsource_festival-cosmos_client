<script lang="ts" module>
  export type Props = {
    value?: null|string,
    count: number,
    onLastDigitFill?: Function
  }
</script>
<script lang="ts">
  let {
    value = $bindable(),
    count,
    onLastDigitFill
  }: Props = $props()

  let values = $state(Array(count).fill(null))
  let inputs = $state(Array(count).fill(null))

  $effect(() => {
    let v = values.join('')
    if (v.length === 0) {
      value = null
    } else {
      value = v
    }
  })
  function onInput(e: InputEvent, i: number) {
    values[i] = e.data
    e.preventDefault()
    if (i < inputs.length - 1) {
      inputs[i + 1].focus()
    } else if (i === inputs.length - 1) {
      onLastDigitFill?.()
      inputs[i].blur()
    }
  }

</script>

<svelte:head>
  <title>Регистрация</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,700;1,700&display=swap" rel="stylesheet">
</svelte:head>

<div class="code_input">
  {#each values as v, i}
    <input
        type="number"
        bind:value={values[i]}
        bind:this={inputs[i]}
        oninput={e => {onInput(e, i)}}>
  {/each}
</div>

<style lang="scss">
  .code_input {
    width: fit-content;
    display: flex;
    gap: 10px;
  }

  input {
    width: 44px;
    height: 44px;
    background-color: #F3F3F3;
    border-radius: 9px;
    border: none;
    text-align: center;
    font-family: Roboto, sans-serif;
    font-weight: 700;

    &:focus {
      outline: 1px solid #1C212B;
    }
    input[type=number] {
      -moz-appearance: textfield;
    }

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
    }
  }
</style>