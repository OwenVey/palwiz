import type pals from '@/data/pals.json';

export type Pal = (typeof pals)[number];
export type WorkSuitability = keyof Pal['workSuitabilities'];
