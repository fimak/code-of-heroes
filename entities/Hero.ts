import { Ability } from './Ability';
import { Attributes } from './Attribute';
import { Item } from './Item';
import { Stats } from './Stats';

export enum AttackTypes {
  melee = 'MELEE',
  ranged = 'RANGED',
}

export type PositionTuple = [number, number];

export interface Hero {
  name: string;
  level: number;
  experience: number;
  gold: number;
  primaryAttribute: Attributes;
  attackType: AttackTypes;
  abilities: Array<Ability>;
  position: PositionTuple;
  equipment: Array<Item>;
  stats: Stats;
  attackPoint: any;
  move(position: PositionTuple): void;
  attack(): void;
  spell(ability: Ability): void;
}

