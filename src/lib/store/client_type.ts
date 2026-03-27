import {writable} from "svelte/store"

export default writable({
  isDesktop: false,
  isMobile: false
})