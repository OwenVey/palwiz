import { normalPals } from '@/data/parsed';
import { getBreedingResult } from '@/lib/utils';
import { describe, expect, it } from 'vitest';

describe('getBreedingResult', () => {
  it('Anubis + Broncherry = Blazehowl', () => {
    expect(getBreedingResult('anubis', 'broncherry')).toBe(normalPals.find((pal) => pal.id === 'blazehowl'));
  });

  it('Frostallion Noct + Lovander = Penking', () => {
    expect(getBreedingResult('frostallion-noct', 'lovander')).toBe(normalPals.find((pal) => pal.id === 'penking'));
  });
});

describe('getBreedingResult unique combinations', () => {
  it('Relaxaurus + Sparkit = Relaxaurus Lux', () => {
    expect(getBreedingResult('relaxaurus', 'sparkit')).toBe(normalPals.find((pal) => pal.id === 'relaxaurus-lux'));
  });

  it('Incineram + Maraith = Incineram Noct', () => {
    expect(getBreedingResult('incineram', 'maraith')).toBe(normalPals.find((pal) => pal.id === 'incineram-noct'));
  });

  it('Mau + Pengullet = Mau Cryst', () => {
    expect(getBreedingResult('mau', 'pengullet')).toBe(normalPals.find((pal) => pal.id === 'mau-cryst'));
  });

  it('Vanwyrm + Foxcicle = Vanwyrm Cryst', () => {
    expect(getBreedingResult('vanwyrm', 'foxcicle')).toBe(normalPals.find((pal) => pal.id === 'vanwyrm-cryst'));
  });

  it('Eikthyrdeer + Hangyu = Eikthyrdeer Terra', () => {
    expect(getBreedingResult('eikthyrdeer', 'hangyu')).toBe(normalPals.find((pal) => pal.id === 'eikthyrdeer-terra'));
  });

  it('Elphidran + Surfent = Elphidran Aqua', () => {
    expect(getBreedingResult('elphidran', 'surfent')).toBe(normalPals.find((pal) => pal.id === 'elphidran-aqua'));
  });

  it('Pyrin + Katress = Pyrin Noct', () => {
    expect(getBreedingResult('pyrin', 'katress')).toBe(normalPals.find((pal) => pal.id === 'pyrin-noct'));
  });

  it('Mammorest + Wumpo = Mammorest Cryst', () => {
    expect(getBreedingResult('mammorest', 'wumpo')).toBe(normalPals.find((pal) => pal.id === 'mammorest-cryst'));
  });

  it('Mossanda + Grizzbolt = Mossanda Lux', () => {
    expect(getBreedingResult('mossanda', 'grizzbolt')).toBe(normalPals.find((pal) => pal.id === 'mossanda-lux'));
  });

  it('Dinossom + Rayhound = Dinossom Lux', () => {
    expect(getBreedingResult('dinossom', 'rayhound')).toBe(normalPals.find((pal) => pal.id === 'dinossom-lux'));
  });

  it('Jolthog + Pengullet = Jolthog Cryst', () => {
    expect(getBreedingResult('jolthog', 'pengullet')).toBe(normalPals.find((pal) => pal.id === 'jolthog-cryst'));
  });

  it('Frostallion + Helzephyr = Frostallion Noct', () => {
    expect(getBreedingResult('frostallion', 'helzephyr')).toBe(normalPals.find((pal) => pal.id === 'frostallion-noct'));
  });

  it('Kingpaca + Reindrix = Kingpaca Cryst', () => {
    expect(getBreedingResult('kingpaca', 'reindrix')).toBe(normalPals.find((pal) => pal.id === 'kingpaca-cryst'));
  });

  it('Lyleen + Menasting = Lyleen Noct', () => {
    expect(getBreedingResult('lyleen', 'menasting')).toBe(normalPals.find((pal) => pal.id === 'lyleen-noct'));
  });

  it('Leezpunk + Flambelle = Leezpunk Ignis', () => {
    expect(getBreedingResult('leezpunk', 'flambelle')).toBe(normalPals.find((pal) => pal.id === 'leezpunk-ignis'));
  });

  it('Blazehowl + Felbat = Blazehowl Noct', () => {
    expect(getBreedingResult('blazehowl', 'felbat')).toBe(normalPals.find((pal) => pal.id === 'blazehowl-noct'));
  });

  it('Robinquill + Fuddler = Robinquill Terra', () => {
    expect(getBreedingResult('robinquill', 'fuddler')).toBe(normalPals.find((pal) => pal.id === 'robinquill-terra'));
  });

  it('Broncherry + Fuack = Broncherry Aqua', () => {
    expect(getBreedingResult('broncherry', 'fuack')).toBe(normalPals.find((pal) => pal.id === 'broncherry-aqua'));
  });

  it('Surfent + Dumud = Surfent Terra', () => {
    expect(getBreedingResult('surfent', 'dumud')).toBe(normalPals.find((pal) => pal.id === 'surfent-terra'));
  });

  it('Gobfin + Rooby = Gobfin Ignis', () => {
    expect(getBreedingResult('gobfin', 'rooby')).toBe(normalPals.find((pal) => pal.id === 'gobfin-ignis'));
  });

  it('Suzaku + Jormuntide = Suzaku Aqua', () => {
    expect(getBreedingResult('suzaku', 'jormuntide')).toBe(normalPals.find((pal) => pal.id === 'suzaku-aqua'));
  });

  it('Reptyro + Foxcicle = Reptyro Cryst', () => {
    expect(getBreedingResult('reptyro', 'foxcicle')).toBe(normalPals.find((pal) => pal.id === 'reptyro-cryst'));
  });

  it('Hangyu + Swee = Hangyu Cryst', () => {
    expect(getBreedingResult('hangyu', 'swee')).toBe(normalPals.find((pal) => pal.id === 'hangyu-cryst'));
  });

  it('Mossanda + Petallia = Lyleen', () => {
    expect(getBreedingResult('mossanda', 'petallia')).toBe(normalPals.find((pal) => pal.id === 'lyleen'));
  });

  it('Vanwyrm + Anubis = Faleris', () => {
    expect(getBreedingResult('vanwyrm', 'anubis')).toBe(normalPals.find((pal) => pal.id === 'faleris'));
  });

  it('Mossanda + Rayhound = Grizzbolt', () => {
    expect(getBreedingResult('mossanda', 'rayhound')).toBe(normalPals.find((pal) => pal.id === 'grizzbolt'));
  });

  it('Grizzbolt + Relaxaurus = Orserk', () => {
    expect(getBreedingResult('grizzbolt', 'relaxaurus')).toBe(normalPals.find((pal) => pal.id === 'orserk'));
  });

  it('Kitsun + Astegon = Shadowbeak', () => {
    expect(getBreedingResult('kitsun', 'astegon')).toBe(normalPals.find((pal) => pal.id === 'shadowbeak'));
  });
});
