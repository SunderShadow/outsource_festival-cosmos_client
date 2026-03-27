import type { ParamMatcher } from '@sveltejs/kit';

export const match = ((param: string): param is ('promo') => {
  return param === 'promo'
}) satisfies ParamMatcher;