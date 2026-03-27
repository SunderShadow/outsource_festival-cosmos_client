import type { ParamMatcher } from '@sveltejs/kit';

export const match = ((param: string): param is ('organizers' | 'baikonur') => {
  return param === 'organizers' || param === 'baikonur';
}) satisfies ParamMatcher;