import NORMAL_PALS from '@/data/normal-pals.json';
import { notEmpty } from '@/lib/utils';

export const PARTNER_SKILL_CATEGORIES = [
  ...new Set(NORMAL_PALS.map(({ partnerSkill }) => partnerSkill?.group).filter(notEmpty)),
].sort();

export function getPalById(id: string) {
  return NORMAL_PALS.find((pal) => pal.id === id) ?? null;
}
