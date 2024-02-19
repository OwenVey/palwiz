import { allPals } from '@/data/parsed';
import { notEmpty } from '@/lib/utils';
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

export const UNIQUE_BREEDING_COMBO_MAP = [
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
] as const;

export const UNIQUE_BREEDING_CHILDREN = UNIQUE_BREEDING_COMBO_MAP.map(({ childId }) => childId);
export const SAME_PARENT_CHILDREN = ['frostallion', 'jetragon', 'paladius', 'necromus', 'jormuntide-ignis'] as const;

export const NORMAL_PALS = allPals
  .filter(({ isBoss }) => !isBoss)
  .filter(({ zukanIndex }) => zukanIndex > 0)
  .filter(({ internalName }) => internalName !== 'PlantSlime_Flower');

export const BREED_ORDER_PALS = NORMAL_PALS.filter((pal) => !UNIQUE_BREEDING_CHILDREN.includes(pal.id))
  .filter((pal) => !SAME_PARENT_CHILDREN.includes(pal.id))
  .sort((a, b) => (a.breedOrder ?? 0) - (b.breedOrder ?? 0));

export const PARTNER_SKILL_CATEGORIES = [
  ...new Set(NORMAL_PALS.map(({ partnerSkill }) => partnerSkill?.group).filter(notEmpty)),
].sort();
