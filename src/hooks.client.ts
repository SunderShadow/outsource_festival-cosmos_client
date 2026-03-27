import client_type from "$lib/store/client_type"
import type { Handle } from "@sveltejs/kit"
import {desktopWidth} from "$lib/_env"
import {get} from "svelte/store"

export const init = async () => {
  client_type.set({
    isDesktop: window.innerWidth >= desktopWidth,
    isMobile: window.innerWidth < desktopWidth
  })

  window.addEventListener('resize', () => {
    if (get(client_type).isMobile && window.innerWidth >= desktopWidth) {
      client_type.set({
        isDesktop: true,
        isMobile: false
      })
    } else if (get(client_type).isDesktop && window.innerWidth < desktopWidth) {
      client_type.set({
        isDesktop: false,
        isMobile: true
      })
    }
  })
}

export const handle: Handle = async ({ event, resolve }) => {
  if (event.url.protocol === 'http:') {
    return Response.redirect(event.url.toString().replace('http:', 'https:'), 308);
  }

  return resolve(event);
}