export interface Champion {
  blurb: string;
  id: string;
  image: Image;
  info: {
    attack: number;
    defense: number;
    magic: number;
    difficulty: number;
  };
  name: string;
  partype: string;
  key: string;
  stats: {
    hp: number;
    hpperlevel: number;
    mp: number;
    mpperlevel: number;
    movespeed: number;
  };
  tags: ChampionTag[];
  title: string;
  skins: { id: string; num: number; name: string; chromas: boolean }[];
  allytips: string[];
  enemytips: string[];
  lore: string;
  passive: Spell;
  spells: Spell[];
}

export interface Spell {
  cooldown: number[];
  cooldownBurn: string;
  cost: number[];
  costBurn: string;
  costType: string;
  description: string;
  image: Image;
  name: string;
}

export interface Image {
  full: string;
  sprite: string;
  group: string;
}

export enum ChampionTag {
  Assassin = 'Assassin',
  Fighter = 'Fighter',
  Mage = 'Mage',
  Marksman = 'Marksman',
  Support = 'Support',
  Tank = 'Tank',
  All = 'All',
}
