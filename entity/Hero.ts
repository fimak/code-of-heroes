import { Ability } from './Ability';
import { Attributes } from './Attribute';
import { Item } from './Item';

enum AttackTypes {
  melee = 'MELEE',
  ranged = 'RANGED',
}

interface Position {
  x: number;
  y: number;
}

interface Stats {
  strength: number;
  agility: number;
  intelligence: number;
  health: number;
  healthRegeneration: number;
  mana: number;
  manaRegeneration: number;
  damage: number;
  armor: number;
  movement: number;
  attackRange: number;
  attackSpeed: number;
  vision: number;
  evasion: number;
  magicResistance: number;
  statusResistance: number;
}

interface Hero {
  name: string;
  level: number;
  experience: number;
  gold: number;
  primaryAttribute: Attributes;
  attackType: AttackTypes;
  abilities: Array<Ability>;
  position: Position;
  stats: Stats;
  equipment: Array<Item>;
  attackPoint: any;
}
