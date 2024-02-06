import { WORK_SUITABILITIES } from '@/constants';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { type Schema } from 'zod';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isWithinRange(num: number, min: number, max: number) {
  return num >= min && num <= max;
}

export function getWorkLabel(workId: string) {
  return WORK_SUITABILITIES.find(({ id }) => id === workId)?.label ?? 'Invalid Work Suitability';
}

export function getEntityFromListById<T extends { id: string }>(dataList: T[], id: string, itemSchema: Schema<T>) {
  try {
    const itemInList = dataList.find(({ id: itemId }) => itemId === id);
    if (!itemInList) throw new Error(`No item found with the id ${id}`);

    const parsedSchema = itemSchema.safeParse(itemInList);
    if (!parsedSchema.success) throw new Error(`Error parsing item with the id ${id}`);

    return { data: parsedSchema.data, error: null };
  } catch (e) {
    if (e instanceof Error) {
      return { data: null, error: e.message };
    } else {
      return { data: null, error: 'Error' };
    }
  }
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
