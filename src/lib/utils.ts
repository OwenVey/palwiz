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
