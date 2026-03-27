import {writable} from "svelte/store"

export const store = writable<{
  animationEnded: boolean
}>({
  animationEnded: false
})