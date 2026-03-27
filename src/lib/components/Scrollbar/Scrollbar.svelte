<script lang="ts">
  let {
    percentScrolled = $bindable()
  } = $props()
</script>
<div class="scrollbar">
  <div class="thumb" style:--percent-scrolled={percentScrolled}></div>
</div>

<style lang="scss">
  .scrollbar {
    position: relative;
    height: var(--scrollbar-height, 500px);
    width:  var(--scrollbar-width, max(5px, 100%));

    background-color: #1C212B33;
    border-radius: 10em;
  }

  .thumb {
    position: absolute;
    top: calc((var(--scrollbar-height, 500px) - var(--scrollbar-thumb-height, 100px)) * var(--percent-scrolled));
    left: 0;
    right: 0;

    height: var(--scrollbar-thumb-height, 100px);

    background-color: #1C212B;
    border-radius: 10em;
  }
</style>