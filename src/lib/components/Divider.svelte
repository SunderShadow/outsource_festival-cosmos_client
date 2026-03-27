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
    background-color: #828A9D33;
    width: 100%;
    border: none;
    margin-top: 18px;
    margin-bottom: 18px;

    @include scr.desktop {
      background-color: #FFFFFF33
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

      color: #828A9D;
      width: 188px;

      @include scr.desktop {
        color: #FFFFFF;
        opacity: .5;
      }
    }

    > div {
      flex-grow: 1;
      height: 1px;
      background-color: #828A9D33;

      color: #828A9D;

      @include scr.desktop {
        background-color: #FFFFFF33
      }
    }
  }
</style>