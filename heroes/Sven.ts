import { AbilityList } from '../Abilities';
import { AbilityTarget } from '../entities/Ability';
import { Attributes } from '../entities/Attribute';
import { AttackTypes, Hero, PositionTuple } from '../entities/Hero';
import { DamageTuple } from '../entities/Stats';

class Sven implements Hero {
  name = 'Sven';
  level = 0;
  experience = 0;
  gold = 600;
  primaryAttribute = Attributes.strength;
  attackType = AttackTypes.melee;
  abilities = [AbilityList[0]];
  position = [1, 1] as PositionTuple;
  equipment = [];
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
  attackPoint: Hero | null;

  move(position) {
    this.position = position;
    console.log(`${this.name} moved to ${position}.\n`);
  }

  attack() {
    if (this.attackPoint) {
      const min = this.stats.damage[0];
      const max = this.stats.damage[1];
      const damage = Math.floor(Math.random() * (max - min + 1)) + min;
      console.log(`${this.name} attacked the ${this.attackPoint.name} and dealt ${damage} damage.\n`);
    } else {
      console.log(`${this.name} miss.\n`);
    }
  }

  spell(ability) {
    if (this.attackPoint && ability.target === AbilityTarget.direct) {
      console.log(`${this.name} spell ${ability.name}.\n`);
    } else {
      console.log(`${this.name} can't spell ${ability.name}.\n`);
    }
  }
}
