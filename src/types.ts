import type ACTIVE_SKILLS from '@/data/active-skills.json';
import type ITEM_RECIPES from '@/data/item-recipes.json';
import type ITEMS from '@/data/items.json';
import type MAP_LOCATIONS from '@/data/map-locations.json';
import type NORMAL_PALS from '@/data/normal-pals.json';
import type PAL_LOCATIONS from '@/data/pal-locations.json';
import type PASSIVE_SKILLS from '@/data/passive-skills.json';
import type STRUCTURES from '@/data/structures.json';
import { type ImageProps } from 'next/image';

export type Pal = (typeof NORMAL_PALS)[number];
export type WorkSuitability = keyof Pal['workSuitabilities'];
export type Drop = Pal['drops'][number];

export type Item = (typeof ITEMS)[number];
export type ItemRecipe = (typeof ITEM_RECIPES)[number];
export type Structure = (typeof STRUCTURES)[number];

export type ActiveSkill = (typeof ACTIVE_SKILLS)[number];
export type PassiveSkill = (typeof PASSIVE_SKILLS)[number];

export type PalLocation = (typeof PAL_LOCATIONS)[number];
export type MapLocation = (typeof MAP_LOCATIONS)[number];

export type CustomImageProps = Omit<ImageProps, 'src' | 'alt'> & {
  name: string;
  width: number;
  height: number;
  alt: string;
};

export type PageParams = {
  params: { slug: string };
  searchParams: Record<string, string | string[] | undefined>;
};

declare global {
  interface Document {
    mozCancelFullScreen?: () => Promise<void>;
    msExitFullscreen?: () => Promise<void>;
    webkitExitFullscreen?: () => Promise<void>;
    mozFullScreenElement?: Element;
    msFullscreenElement?: Element;
    webkitFullscreenElement?: Element;
  }

  interface HTMLElement {
    msRequestFullscreen?: () => Promise<void>;
    mozRequestFullScreen?: () => Promise<void>;
    webkitRequestFullscreen?: () => Promise<void>;
  }
}
