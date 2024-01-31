import { CatIcon, HeartIcon, MapIcon, PencilRulerIcon, ZapIcon } from 'lucide-react';

export const WORK_SUITABILITIES = [
  { id: 'gathering', label: 'Gathering' },
  { id: 'cooling', label: 'Cooling' },
  { id: 'lumbering', label: 'Lumbering' },
  { id: 'kindling', label: 'Kindling' },
  { id: 'generatingElectricity', label: 'Generating Electricity' },
  { id: 'handiwork', label: 'Handiwork' },
  { id: 'mining', label: 'Mining' },
  { id: 'farming', label: 'Farming' },
  { id: 'oilExtraction', label: 'Oil Extraction' },
  { id: 'medicineProduction', label: 'Medicine Production' },
  { id: 'planting', label: 'Planting' },
  { id: 'transporting', label: 'Transporting' },
  { id: 'watering', label: 'Watering' },
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
