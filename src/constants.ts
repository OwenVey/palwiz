import { CatIcon, HeartIcon, MapIcon, PencilRulerIcon, ZapIcon } from 'lucide-react';

export const WORK_SUITABILITIES = [
  'gathering',
  'cooling',
  'lumbering',
  'kindling',
  'generating-electricity',
  'handiwork',
  'mining',
  'farming',
  'oil-extraction',
  'medicine-production',
  'planting',
  'transporting',
  'watering',
] as const;

export const PAL_ELEMENTS = [
  'neutral',
  'grass',
  'fire',
  'water',
  'electric',
  'ice',
  'dark',
  'ground',
  'dragon',
] as const;

export const NAVIGATION = [
  { name: 'Pals', href: '/pals', icon: CatIcon, description: 'View information about Pals' },
  {
    name: 'Items',
    href: '/items',
    icon: PencilRulerIcon,
    description: 'List containing all information for in game items',
  },
  {
    name: 'Skills',
    href: '/skills',
    icon: ZapIcon,
    description: 'List of all partner and active skill',
  },
  { name: 'Breeding', href: '/breeding', icon: HeartIcon, description: 'Pal breeding calculator' },
  { name: 'Map', href: '/map', icon: MapIcon, description: 'Interactive map with all fast travel locations and more' },
] as const;
