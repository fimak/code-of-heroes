import { AbilityList } from '../Abilities';
import { Attributes } from '../entities/Attribute';
import { AttackTypes, Hero, PositionTuple } from '../entities/Hero';
import { DamageTuple } from '../entities/Stats';

export class Lina extends Hero {
  name = 'Lina';
  primaryAttribute = Attributes.intelligence;
  attackType = AttackTypes.ranged;
  abilities = [AbilityList[1]];
  position = [1, 1000] as PositionTuple;
  stats = {
    strength: 20,
    strengthIncrease: 2.4,
    agility: 23,
    agilityIncrease: 2.4,
    intelligence: 30,
    intelligenceIncrease: 3.8,
    health: 120,
    healthMaximum: 120,
    healthRegeneration: 0.25,
    mana: 75,
    manaMaximum: 75,
    manaRegeneration: 0,
    armor: 0,
    magicResistance: 0.25,
    statusResistance: 0,
    damage: [21, 29] as DamageTuple,
    attackRange: 670,
    attackSpeed: 100,
    moveSpeed: 290,
    visionRange: 1800,
    evasion: 0,
  };
  attackPoint = null;
}
