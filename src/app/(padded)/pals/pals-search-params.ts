import { WORK_SUITABILITIES } from '@/constants';
import { type Pal } from '@/types';
import { createSearchParamsCache, parseAsArrayOf, parseAsString, parseAsStringLiteral } from 'nuqs/server';

export const PAL_SORTS = [
  { label: 'Capture Rate', value: 'captureRateCorrect' },
  { label: 'Defense', value: 'defense' },
  { label: 'Food Amount', value: 'foodAmount' },
  { label: 'HP', value: 'hp' },
  { label: 'Male Probability', value: 'maleProbability' },
  { label: 'Max Full Stomach', value: 'maxFullStomach' },
  { label: 'Melee Attack', value: 'meleeAttack' },
  { label: 'Name', value: 'name' },
  { label: 'Paldeck Number', value: 'zukanIndex' },
  { label: 'Price', value: 'price' },
  { label: 'Rarity', value: 'rarity' },
  { label: 'Ride Sprint Speed', value: 'rideSprintSpeed' },
  { label: 'Run Speed', value: 'runSpeed' },
  { label: 'Shot Attack', value: 'shotAttack' },
  { label: 'Slow Walk Speed', value: 'slowWalkSpeed' },
  { label: 'Stamina', value: 'stamina' },
  { label: 'Support', value: 'support' },
  { label: 'Transport Speed', value: 'transportSpeed' },
  { label: 'Walk Speed', value: 'walkSpeed' },
] satisfies Array<{ label: string; value: keyof Pal }>;

// const [search, setSearch] = useQueryString('search');
// const [{ sort, sortDirection }, , SortFilter] = useQuerySort(SORTS, 'zukanIndex');
// const [rarity, setRarity] = useQueryString('rarity');
// const [work, setWork] = useQueryState(
//   'work',
//   parseAsStringLiteral(WORK_SUITABILITIES.map(({ id }) => id)).withOptions({ clearOnDefault: true }),
// );
// const [elements, setElements] = useQueryStringArray('elements');
// const [partnerSkills, setPartnerSkills] = useQueryStringArray('partnerSkill');

export const palsQueryParsers = {
  search: parseAsString.withDefault(''),
  sort: parseAsStringLiteral(PAL_SORTS.map(({ value }) => value)).withDefault('name'),
  sortDirection: parseAsStringLiteral(['asc', 'desc']).withDefault('asc'),
  rarity: parseAsString.withDefault('all'),
  work: parseAsStringLiteral(WORK_SUITABILITIES.map(({ id }) => id)),
  elements: parseAsArrayOf(parseAsString).withDefault([]),
  partnerSkills: parseAsArrayOf(parseAsString).withDefault([]),
};

export const palsQueryCache = createSearchParamsCache(palsQueryParsers);
