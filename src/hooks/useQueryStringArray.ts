import { parseAsArrayOf, parseAsString, useQueryState } from 'nuqs';

export function useQueryStringArray(param: string) {
  return useQueryState(param, parseAsArrayOf(parseAsString).withDefault([]).withOptions({ clearOnDefault: true }));
}
