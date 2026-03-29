<script lang="ts" module>
  export type Props = {
    dark: boolean
  }
</script>
<script lang="ts">
  import Menu from "./Menu.svelte"
  import LogoAlignLeft from "$lib/components/LogoAlignLeft.svelte"

  let menuHidden = $state.raw(true)

  let {
    dark
  }: Props = $props()
</script>

<header class:dark>
  <div class="logo">
    <LogoAlignLeft />
  </div>
  <button aria-label="Открыть меню" onclick={() => {menuHidden = false}}>
    <svg width="25" height="23" viewBox="0 0 25 23" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="1.5" y1="1.5" x2="23.5" y2="1.5" stroke="white" stroke-width="3" stroke-linecap="round"/>
      <line x1="1.5" y1="11.5" x2="23.5" y2="11.5" stroke="white" stroke-width="3" stroke-linecap="round"/>
      <line x1="1.5" y1="21.5" x2="23.5" y2="21.5" stroke="white" stroke-width="3" stroke-linecap="round"/>
    </svg>
  </button>
</header>

<Menu bind:hidden={menuHidden}/>

<style lang="scss">
  @use "$lib/env";
  @use "$lib/scss/mixins/scr";

  header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    padding: 24px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    // Liquid glass effect
    @include scr.tablet-and-lower {
      background-color: #FFFFFF0D;
      backdrop-filter: blur(10px);
    }

    z-index: var(--header-z-index);

    :global svg {
      *[fill="#F0F3F5"] {
        fill: #FFF;
        transition: fill 300ms, stroke 300ms;
      }
      *[stroke="#F0F3F5"] {
        stroke: #FFF;
        transition: stroke 300ms, fill 300ms;
      }
    }
  }

  .logo {
    width: 100px;
    @include scr.desktop {
      margin-left: 10px;
    }
    :global {
      svg {
        width: 100%;
        height: auto;
      }
    }
  }
  button {
    all: unset;

    @include scr.desktop {
      display: none;
    }
  }

  .dark :global svg {
    *[fill] {
      fill: #1C212B;
    }
    *[stroke] {
      stroke: #1C212B;
    }
  }
</style>