/**
 *
 * @param el
 * @param cb
 * @return Function
 * remove event listener
 */
export const detect = (el: HTMLElement, cb: (direction: 'left' | 'down' | 'up' | 'right', e) => void) => {
  let unbind = () => {}
  const lst = (e) => {
    const threshold = 80 //px
    const initTouchCoords = [e.touches[0].clientX, e.touches[0].clientY]

    function listenTouchMove(e: TouchEvent) {
      const currentTouchCoords = [e.touches[0].clientX, e.touches[0].clientY]
      const xDistance = initTouchCoords[0] - currentTouchCoords[0]
      const yDistance = initTouchCoords[1] - currentTouchCoords[1]

      if (Math.abs(xDistance) > threshold) {
        if (xDistance > 0) {
          cb('left', e)
        }
        if (xDistance < 0) {
          cb('right', e)
        }
        el.removeEventListener('touchmove', listenTouchMove)
      }

      if (Math.abs(yDistance) > threshold) {
        if (yDistance > 0) {
          cb('up', e)
        }
        if (yDistance < 0) {
          cb('down', e)
        }
        el.removeEventListener('touchmove', listenTouchMove)
      }

    }

    unbind = () => {
      el.removeEventListener('touchmove', listenTouchMove)
      el.removeEventListener('touchend', unbind)
    }

    el.addEventListener('touchend', unbind)
    el.addEventListener('touchmove', listenTouchMove)
  }

  el.addEventListener('touchstart', lst)
  return unbind
}