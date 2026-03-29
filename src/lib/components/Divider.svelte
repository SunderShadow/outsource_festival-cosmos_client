<script lang="ts">
  let {
    children
  } = $props()
</script>

<div class="divider">
  <div></div>
  <span>{@render children()}</span>
  <div></div>
</div>

<style lang="scss">
  @use "$lib/scss/mixins/scr";

  .divider {
    position: relative;
    width: 100%;
    border: none;
    margin-top: 18px;
    margin-bottom: 18px;

    opacity: var(--divider-opacity, .2);
    @include scr.desktop {
      background-color: var(--divider-color, #828A9D);
    }
  }

  .divider {
    height: auto;
    display: flex;
    background: none;
    align-items: center;
  }

  .divider {
    > span {
      display: block;
      font-size: 12px;

      text-wrap: nowrap;
      text-align: center;

      color: var(--divider-color, #828A9D);
      width: 188px;

      @include scr.desktop {
        color: #FFFFFF;
        opacity: calc(var(--divider-opacity, 0) + .3);
      }
    }

    > div {
      flex-grow: 1;
      height: 1px;
      opacity: var(--divider-opacity, .2);
      background-color: var(--divider-color, #828A9D);

      @include scr.desktop {
        background-color: #FFFFFF33
      }
    }
  }
</style>