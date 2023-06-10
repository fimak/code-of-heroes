import { AbilityList } from '../Abilities';
import { Attributes } from '../entities/Attribute';
import { AttackTypes, Hero, PositionTuple } from '../entities/Hero';
import { DamageTuple } from '../entities/Stats';

export class Sven extends Hero {
  name = 'Sven';
  primaryAttribute = Attributes.strength;
  attackType = AttackTypes.melee;
  abilities = [AbilityList[0]];
  position = [1, 1] as PositionTuple;
  stats = {
    strength: 22,
    strengthIncrease: 3.2,
    agility: 21,
    agilityIncrease: 2.2,
    intelligence: 16,
    intelligenceIncrease: 1.3,
    health: 120,
    healthMaximum: 120,
    healthRegeneration: 0.75,
    mana: 75,
    manaMaximum: 75,
    manaRegeneration: 0,
    armor: 0,
    magicResistance: 0.25,
    statusResistance: 0,
    damage: [41, 43] as DamageTuple,
    attackRange: 150,
    attackSpeed: 110,
    moveSpeed: 325,
    visionRange: 1800,
    evasion: 0,
  };
  attackPoint = null;
}
