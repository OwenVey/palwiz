import { getBreedingResult } from '@/lib/pal-utils';
import { describe, expect, it } from 'vitest';

describe('getBreedingResult', () => {
  it('Anubis + Anubis = Anubis', () => {
    expect(getBreedingResult('anubis', 'anubis')?.id).toBe('anubis');
  });

  it('Anubis + Incineram = Anubis', () => {
    expect(getBreedingResult('anubis', 'incineram')?.id).toBe('anubis');
  });

  it('Anubis + Broncherry = Blazehowl', () => {
    expect(getBreedingResult('anubis', 'broncherry')?.id).toBe('blazehowl');
  });

  it('Incineram Noct + Incineram Noct = Incineram Noct', () => {
    expect(getBreedingResult('incineram-noct', 'incineram-noct')?.id).toBe('incineram-noct');
  });

  it('Frostallion Noct + Lovander = Penking', () => {
    expect(getBreedingResult('frostallion-noct', 'lovander')?.id).toBe('penking');
  });
});

describe('getBreedingResult unique combinations', () => {
  it('Relaxaurus + Sparkit = Relaxaurus Lux', () => {
    expect(getBreedingResult('relaxaurus', 'sparkit')?.id).toBe('relaxaurus-lux');
  });

  it('Incineram + Maraith = Incineram Noct', () => {
    expect(getBreedingResult('incineram', 'maraith')?.id).toBe('incineram-noct');
  });

  it('Mau + Pengullet = Mau Cryst', () => {
    expect(getBreedingResult('mau', 'pengullet')?.id).toBe('mau-cryst');
  });

  it('Vanwyrm + Foxcicle = Vanwyrm Cryst', () => {
    expect(getBreedingResult('vanwyrm', 'foxcicle')?.id).toBe('vanwyrm-cryst');
  });

  it('Eikthyrdeer + Hangyu = Eikthyrdeer Terra', () => {
    expect(getBreedingResult('eikthyrdeer', 'hangyu')?.id).toBe('eikthyrdeer-terra');
  });

  it('Elphidran + Surfent = Elphidran Aqua', () => {
    expect(getBreedingResult('elphidran', 'surfent')?.id).toBe('elphidran-aqua');
  });

  it('Pyrin + Katress = Pyrin Noct', () => {
    expect(getBreedingResult('pyrin', 'katress')?.id).toBe('pyrin-noct');
  });

  it('Mammorest + Wumpo = Mammorest Cryst', () => {
    expect(getBreedingResult('mammorest', 'wumpo')?.id).toBe('mammorest-cryst');
  });

  it('Mossanda + Grizzbolt = Mossanda Lux', () => {
    expect(getBreedingResult('mossanda', 'grizzbolt')?.id).toBe('mossanda-lux');
  });

  it('Dinossom + Rayhound = Dinossom Lux', () => {
    expect(getBreedingResult('dinossom', 'rayhound')?.id).toBe('dinossom-lux');
  });

  it('Jolthog + Pengullet = Jolthog Cryst', () => {
    expect(getBreedingResult('jolthog', 'pengullet')?.id).toBe('jolthog-cryst');
  });

  it('Frostallion + Helzephyr = Frostallion Noct', () => {
    expect(getBreedingResult('frostallion', 'helzephyr')?.id).toBe('frostallion-noct');
  });

  it('Kingpaca + Reindrix = Kingpaca Cryst', () => {
    expect(getBreedingResult('kingpaca', 'reindrix')?.id).toBe('kingpaca-cryst');
  });

  it('Lyleen + Menasting = Lyleen Noct', () => {
    expect(getBreedingResult('lyleen', 'menasting')?.id).toBe('lyleen-noct');
  });

  it('Leezpunk + Flambelle = Leezpunk Ignis', () => {
    expect(getBreedingResult('leezpunk', 'flambelle')?.id).toBe('leezpunk-ignis');
  });

  it('Blazehowl + Felbat = Blazehowl Noct', () => {
    expect(getBreedingResult('blazehowl', 'felbat')?.id).toBe('blazehowl-noct');
  });

  it('Robinquill + Fuddler = Robinquill Terra', () => {
    expect(getBreedingResult('robinquill', 'fuddler')?.id).toBe('robinquill-terra');
  });

  it('Broncherry + Fuack = Broncherry Aqua', () => {
    expect(getBreedingResult('broncherry', 'fuack')?.id).toBe('broncherry-aqua');
  });

  it('Surfent + Dumud = Surfent Terra', () => {
    expect(getBreedingResult('surfent', 'dumud')?.id).toBe('surfent-terra');
  });

  it('Gobfin + Rooby = Gobfin Ignis', () => {
    expect(getBreedingResult('gobfin', 'rooby')?.id).toBe('gobfin-ignis');
  });

  it('Suzaku + Jormuntide = Suzaku Aqua', () => {
    expect(getBreedingResult('suzaku', 'jormuntide')?.id).toBe('suzaku-aqua');
  });

  it('Reptyro + Foxcicle = Reptyro Cryst', () => {
    expect(getBreedingResult('reptyro', 'foxcicle')?.id).toBe('reptyro-cryst');
  });

  it('Hangyu + Swee = Hangyu Cryst', () => {
    expect(getBreedingResult('hangyu', 'swee')?.id).toBe('hangyu-cryst');
  });

  it('Mossanda + Petallia = Lyleen', () => {
    expect(getBreedingResult('mossanda', 'petallia')?.id).toBe('lyleen');
  });

  it('Vanwyrm + Anubis = Faleris', () => {
    expect(getBreedingResult('vanwyrm', 'anubis')?.id).toBe('faleris');
  });

  it('Mossanda + Rayhound = Grizzbolt', () => {
    expect(getBreedingResult('mossanda', 'rayhound')?.id).toBe('grizzbolt');
  });

  it('Grizzbolt + Relaxaurus = Orserk', () => {
    expect(getBreedingResult('grizzbolt', 'relaxaurus')?.id).toBe('orserk');
  });

  it('Kitsun + Astegon = Shadowbeak', () => {
    expect(getBreedingResult('kitsun', 'astegon')?.id).toBe('shadowbeak');
  });
});
