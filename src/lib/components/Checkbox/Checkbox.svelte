<script lang="ts">
  let {
    checked = $bindable(),
    children
  } = $props()
</script>

<div class="checkbox" class:checked onclick={() => {checked = !checked}}>
  <div class="check">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="12" fill="#1C212B"/>
      <path d="M7.91675 12.0002L10.8334 14.9168L16.6667 9.0835" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </div>
  <label for="">{@render children()}</label>
</div>

<style lang="scss">
  .checkbox {
    display: flex;
    gap: 16px;

    font-size: 10px;
    letter-spacing: 0.5px;
    line-height: 23px;
    text-transform: uppercase;
  }

  .checked .check svg {
    opacity: 1;
  }

  .check {
    width: 24px;
    height: 24px;
    border-radius: 10em;
    border: 1px solid #E5E7EB;
    flex-shrink: 0;

    svg {
      opacity: 0;
      width: 100%;
      height: 100%;
      transition: opacity 300ms;
    }
  }
</style>