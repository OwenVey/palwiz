import { type BadgeProps } from '@/components/ui/badge';
import { WORK_SUITABILITIES } from '@/constants';
import { breedOrderPals, itemRecipes, items, normalPals, skills } from '@/data/parsed';
import { type Pal } from '@/types';
import { clsx, type ClassValue } from 'clsx';
import { parseAsArrayOf, parseAsString } from 'nuqs';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isWithinRange(num: number, min: number, max: number) {
  return num >= min && num <= max;
}

export function getWorkLabel(workId: string) {
  return WORK_SUITABILITIES.find(({ id }) => id === workId)?.label ?? 'Invalid Work Suitability';
}

export function sortArrayByPropertyInDirection<T>(items: T[], sort: keyof T, sortDirection: 'asc' | 'desc'): T[] {
  return items.sort(function (item1, item2) {
    if (!sort) return 0;
    const val1 = sortDirection === 'asc' ? item1[sort] : item2[sort];
    const val2 = sortDirection === 'asc' ? item2[sort] : item1[sort];
    if (typeof val1 === 'string' && typeof val2 === 'string') {
      return val1.localeCompare(val2);
    } else if (typeof val1 === 'number' && typeof val2 === 'number') {
      return val1 - val2;
    } else {
      return 0;
    }
  });
}

export function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
  return value !== null && value !== undefined;
}

export function getPalById(id: string) {
  return normalPals.find((pal) => pal.id === id);
}

export function getItemById(id: string) {
  return items.find((item) => item.id === id);
}

export function getSkillById(id: string) {
  return skills.find((skill) => skill.id === id);
}

export function getItemRecipeById(id: string) {
  return itemRecipes.find((itemRecipe) => itemRecipe.id === id);
}

export function getBadgeVariantForRate(rate: number): BadgeProps['variant'] {
  if (rate >= 0 && rate <= 20) {
    return 'red';
  } else if (rate > 20 && rate <= 40) {
    return 'yellow';
  } else if (rate > 40 && rate <= 60) {
    return 'orange';
  } else if (rate > 60 && rate <= 80) {
    return 'lime';
  } else if (rate > 80 && rate <= 100) {
    return 'green';
  } else {
    return 'default';
  }
}

export const parseAsArrayOfStrings = parseAsArrayOf(parseAsString)
  .withDefault([])
  .withOptions({ clearOnDefault: true });

export function getBreedingResult(parentAId: string, parentBId: string): Pal {
  const uniqueMatch = checkUniqueBreedingCombos(parentAId, parentBId);
  if (uniqueMatch) return uniqueMatch;

  const parentA = normalPals.find((pal) => pal.id === parentAId)!;
  const parentB = normalPals.find((pal) => pal.id === parentBId)!;

  // if (!parentA || !parentB) return null;

  const averageCombiRank = Math.floor((parentA.combiRank + parentB.combiRank + 1) / 2);

  const child = breedOrderPals.reduce((closestPal, pal) => {
    const currentDiff = Math.abs(pal.combiRank - averageCombiRank);
    const closestDiff = Math.abs(closestPal.combiRank - averageCombiRank);

    if (currentDiff === closestDiff) {
      // console.log('tie', { pal: pal.name, closestPal: closestPal.name });
    }
    return currentDiff < closestDiff ? pal : closestPal;
  });

  console.log(`${parentA.name} + ${parentB.name} = ${child.name}`);

  return child;
}

const UNIQUE_BREEDING_COMBO_MAP = [
  { parents: ['relaxaurus', 'sparkit'], childId: 'relaxaurus-lux' },
  { parents: ['incineram', 'maraith'], childId: 'incineram-noct' },
  { parents: ['mau', 'pengullet'], childId: 'mau-cryst' },
  { parents: ['vanwyrm', 'foxcicle'], childId: 'vanwyrm-cryst' },
  { parents: ['eikthyrdeer', 'hangyu'], childId: 'eikthyrdeer-terra' },
  { parents: ['elphidran', 'surfent'], childId: 'elphidran-aqua' },
  { parents: ['pyrin', 'katress'], childId: 'pyrin-noct' },
  { parents: ['mammorest', 'wumpo'], childId: 'mammorest-cryst' },
  { parents: ['mossanda', 'grizzbolt'], childId: 'mossanda-lux' },
  { parents: ['dinossom', 'rayhound'], childId: 'dinossom-lux' },
  { parents: ['jolthog', 'pengullet'], childId: 'jolthog-cryst' },
  { parents: ['frostallion', 'helzephyr'], childId: 'frostallion-noct' },
  { parents: ['kingpaca', 'reindrix'], childId: 'kingpaca-cryst' },
  { parents: ['lyleen', 'menasting'], childId: 'lyleen-noct' },
  { parents: ['leezpunk', 'flambelle'], childId: 'leezpunk-ignis' },
  { parents: ['blazehowl', 'felbat'], childId: 'blazehowl-noct' },
  { parents: ['robinquill', 'fuddler'], childId: 'robinquill-terra' },
  { parents: ['broncherry', 'fuack'], childId: 'broncherry-aqua' },
  { parents: ['surfent', 'dumud'], childId: 'surfent-terra' },
  { parents: ['gobfin', 'rooby'], childId: 'gobfin-ignis' },
  { parents: ['suzaku', 'jormuntide'], childId: 'suzaku-aqua' },
  { parents: ['reptyro', 'foxcicle'], childId: 'reptyro-cryst' },
  { parents: ['hangyu', 'swee'], childId: 'hangyu-cryst' },
  { parents: ['mossanda', 'petallia'], childId: 'lyleen' },
  { parents: ['vanwyrm', 'anubis'], childId: 'faleris' },
  { parents: ['mossanda', 'rayhound'], childId: 'grizzbolt' },
  { parents: ['grizzbolt', 'relaxaurus'], childId: 'orserk' },
  { parents: ['kitsun', 'astegon'], childId: 'shadowbeak' },
];

export function checkUniqueBreedingCombos(parentAId: string, parentBId: string): Pal | null {
  const match = UNIQUE_BREEDING_COMBO_MAP.find(
    (combo) => combo.parents.includes(parentAId) && combo.parents.includes(parentBId),
  );
  if (!match) return null;

  const childPal = normalPals.find((pal) => pal.id === match.childId);

  if (!childPal) return null;

  return childPal;
}
