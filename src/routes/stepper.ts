import type {Props as StepperProps} from "$lib/components/Stepper/Stepper.svelte"

const steps: StepperProps['steps'] = [
  {
    href: '/',
    relatedHrefs: ['/', new RegExp('\/promo')],
    text: 'Первые <br> в космосе'
  },
  {
    href: '/restaurants',
    relatedHrefs: ['/restaurants', new RegExp('\/restaurants\/*')],
    text: 'ГЕОГРАФИЯ <br> ФЕСТИВАЛЯ'
  },
  {
    href: '/prize',
    text: 'ТРИ ШАГА <br>К КОСМОДРОМУ'
  },
  // {
  //   href: '/gastronomy-to-space',
  //   text: 'ГАСТРОНОМИЯ <br>ОТПРАВЛЯЕТСЯ <br>В КОСМОС'
  // },
  {
    href: '/news',
    relatedHrefs: ['/news', new RegExp('\/news\/*')],
    text: 'НОВОСТИ <br>ФЕСТИВАЛЯ'
  },
  {
    href: '/next-mission',
    text: 'ФЕСТИВАЛЬ 2027'
  }
]

export default steps