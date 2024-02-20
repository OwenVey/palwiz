import { useQueryState } from 'nuqs';

export function useQueryString(param: string) {
  return useQueryState(param, { defaultValue: '', clearOnDefault: true });
}
