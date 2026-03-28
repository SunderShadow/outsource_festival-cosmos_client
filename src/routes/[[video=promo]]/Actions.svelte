<script lang="ts">
import Button from "$lib/components/Button/Button.svelte"
</script>

<div class="actions">
  <Button dark filled href="/restaurants">Выбрать ресторан</Button>
  <Button dark filled href="/prize#main_prize">Участвовать в розыгрыше</Button>
  <Button dark filled href="/promo">
    <span>Видеоролик</span>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22Z" stroke="white" stroke-linejoin="round"/>
      <path d="M10 12.0001V8.53613L13 10.2681L16 12.0001L13 13.7321L10 15.4641V12.0001Z" stroke="white" stroke-linejoin="round"/>
    </svg>

  </Button>
</div>

<style lang="scss">
  @use "$lib/env";
  @use "$lib/scss/mixins/scr";

  .actions {
    margin-top: 16px;

    :global .button {
      display: flex;
      max-width: fit-content;
      height: 46px;
      box-sizing: border-box;

      &:last-child {
        line-height: 75%;
      }
    }

    @include scr.desktop {
      display: none;
    }

    @include scr.tablet-and-lower {
      :global .button + .button {
        margin-top: 12px;
      }
    }
  }
</style>