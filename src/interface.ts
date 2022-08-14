export interface Champion {
  blurb: string;
  id: string;
  image: {
    full: string;
    sprite: string;
    group: string;
  };
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
