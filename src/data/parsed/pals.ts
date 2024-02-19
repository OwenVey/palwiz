import { SAME_PARENT_CHILDREN, UNIQUE_BREEDING_CHILDREN, UNIQUE_BREEDING_COMBO_MAP } from '@/constants';
import palsJson from '@/data/pals.json';
import { notEmpty } from '@/lib/utils';
import { PalSchema } from '@/schemas/pal';
import { z } from 'zod';

export const ALL_PALS = z.array(PalSchema).parse(palsJson);

export const NORMAL_PALS = ALL_PALS.filter(({ isBoss }) => !isBoss)
  .filter(({ zukanIndex }) => zukanIndex > 0)
  .filter(({ internalName }) => internalName !== 'PlantSlime_Flower');

export const BREED_ORDER_PALS = NORMAL_PALS.filter((pal) => !UNIQUE_BREEDING_CHILDREN.includes(pal.id))
  .filter((pal) => !SAME_PARENT_CHILDREN.includes(pal.id))
  .sort((a, b) => (a.breedOrder ?? 0) - (b.breedOrder ?? 0));

export const PARTNER_SKILL_CATEGORIES = [
  ...new Set(NORMAL_PALS.map(({ partnerSkill }) => partnerSkill?.group).filter(notEmpty)),
].sort();

export function getPalById(id: string) {
  return NORMAL_PALS.find((pal) => pal.id === id) ?? null;
}

export function getBreedingResult(parentAId: string, parentBId: string) {
  if (!parentAId || !parentAId) return null;
  if (parentAId === parentBId) return getPalById(parentAId);

  const uniqueMatch = checkUniqueBreedingCombos(parentAId, parentBId);
  if (uniqueMatch) return uniqueMatch;

  const parentA = getPalById(parentAId);
  const parentB = getPalById(parentBId);

  if (!parentA || !parentB) return null;

  const averageCombiRank = Math.floor((parentA.combiRank + parentB.combiRank + 1) / 2);

  const child = BREED_ORDER_PALS.reduce((closestPal, pal) => {
    const currentDiff = Math.abs(pal.combiRank - averageCombiRank);
    const closestDiff = Math.abs(closestPal.combiRank - averageCombiRank);
    return currentDiff < closestDiff ? pal : closestPal;
  });

  return child;
}

export function checkUniqueBreedingCombos(parentAId: string, parentBId: string) {
  const match = UNIQUE_BREEDING_COMBO_MAP.find(
    (combo) => [parentAId, parentBId].sort().join() === [...combo.parents].sort().join(),
  );
  if (!match) return null;

  const childPal = getPalById(match.childId);

  if (!childPal) return null;

  return childPal;
}
