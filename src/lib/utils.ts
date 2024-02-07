import { type BadgeProps } from '@/components/ui/badge';
import { WORK_SUITABILITIES } from '@/constants';
import { itemRecipes, items, normalPals, skills } from '@/data/parsed';
import { clsx, type ClassValue } from 'clsx';
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
