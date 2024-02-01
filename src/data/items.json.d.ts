import { type Item } from '@/types';
declare module '@/data/items.json' {
  const value: Item[];
  export default value;
}
