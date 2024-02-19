import { type BadgeProps } from '@/components/ui/badge';
import { BREED_ORDER_PALS, NORMAL_PALS, UNIQUE_BREEDING_COMBO_MAP, WORK_SUITABILITIES } from '@/constants';
import { activeSkills, itemRecipes, items } from '@/data/parsed';
import { type BreedingCombo, type Pal } from '@/types';
import { clsx, type ClassValue } from 'clsx';
import { parseAsArrayOf, parseAsString, useQueryState } from 'nuqs';
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
  return NORMAL_PALS.find((pal) => pal.id === id) ?? null;
}

export function getItemById(id: string) {
  return items.find((item) => item.id === id) ?? null;
}

export function getSkillById(id: string) {
  return activeSkills.find((skill) => skill.id === id) ?? null;
}

export function getItemRecipeById(id: string) {
  return itemRecipes.find((itemRecipe) => itemRecipe.id === id) ?? null;
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

export function useQueryString(param: string) {
  return useQueryState(param, { defaultValue: '', clearOnDefault: true });
}

export function getBreedingResult(parentAId: string, parentBId: string): Pal | null {
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

export function checkUniqueBreedingCombos(parentAId: string, parentBId: string): Pal | null {
  const match = UNIQUE_BREEDING_COMBO_MAP.find(
    (combo) => [parentAId, parentBId].sort().join() === [...combo.parents].sort().join(),
  );
  if (!match) return null;

  const childPal = getPalById(match.childId);

  if (!childPal) return null;

  return childPal;
}

export class Queue<T> {
  private elements: T[];

  constructor() {
    this.elements = [];
  }

  enqueue(element: T): void {
    this.elements.push(element);
  }

  dequeue(): T | undefined {
    return this.elements.shift();
  }

  isEmpty(): boolean {
    return this.elements.length === 0;
  }
}

const graph = new Map<string, string[]>();
for (const parentA of NORMAL_PALS) {
  for (const parentB of NORMAL_PALS) {
    const child = getBreedingResult(parentA.id, parentB.id)!;
    if (!graph.has(parentA.id)) {
      graph.set(parentA.id, []);
    }
    graph.get(parentA.id)!.push(child.id);
  }
}

export function getShortestBreedingPath(sourcePalId: string, destinationPalId: string): BreedingCombo[] | null {
  const queue = new Queue<string>();
  const visited = new Set<string>();
  const distance = new Map<string, number>();
  const predecessor = new Map<string, string>();
  const breedingCombos: BreedingCombo[] = [];

  queue.enqueue(sourcePalId);
  visited.add(sourcePalId);
  distance.set(sourcePalId, 0);
  predecessor.set(sourcePalId, '');

  while (!queue.isEmpty()) {
    const currentPalId = queue.dequeue()!;

    if (currentPalId === destinationPalId) {
      // Reconstruct the shortest path from source to destination
      let current = destinationPalId;
      while (current !== '') {
        const pred = predecessor.get(current)!;
        if (pred !== '') {
          const parentA = getPalById(pred);
          const parentB = getPalById(current);
          const child = getPalById(currentPalId);
          if (parentA && parentB && child) {
            breedingCombos.unshift({ parentA, parentB, child });
          } else {
            // If any of the pals are not found, return null
            return null;
          }
        }
        current = pred;
      }
      return breedingCombos;
    }

    const neighbors = graph.get(currentPalId);
    if (neighbors) {
      for (const neighborPalId of neighbors) {
        if (!visited.has(neighborPalId)) {
          queue.enqueue(neighborPalId);
          visited.add(neighborPalId);
          distance.set(neighborPalId, distance.get(currentPalId)! + 1);
          predecessor.set(neighborPalId, currentPalId);
        }
      }
    }
  }

  return null; // Destination pal is unreachable
}
