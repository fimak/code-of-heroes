import { AbilityList } from '../Abilities';
import { AttackTypes } from '../entities/Attack';
import { Attributes } from '../entities/Attribute';
import { HeroParams, PositionTuple } from '../entities/Hero';
import { DamageTuple } from '../entities/Stats';

export const Sven: HeroParams = {
  name: 'Sven',
  primaryAttribute: Attributes.strength,
  attackType: AttackTypes.melee,
  abilities: [AbilityList[0]],
  position: [1, 1] as PositionTuple,
  strength: 22,
  strengthIncrease: 3.2,
  agility: 21,
  agilityIncrease: 2.2,
  intelligence: 16,
  intelligenceIncrease: 1.3,
  health: 120,
  healthRegeneration: 0.75,
  mana: 75,
  manaRegeneration: 0,
  armor: 0,
  magicResistance: 0.25,
  damage: [41, 43] as DamageTuple,
  attackRange: 150,
  attackSpeed: 110,
  moveSpeed: 325,
  visionRange: 1800,
  evasion: 0,
};
