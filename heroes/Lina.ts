import { AbilityList } from '../Abilities';
import { AbilityTarget } from '../entities/Ability';
import { Attributes } from '../entities/Attribute';
import { AttackTypes, Hero, PositionTuple } from '../entities/Hero';
import { DamageTuple } from '../entities/Stats';

class Lina implements Hero {
  name = 'Lina';
  level = 1;
  experience = 0;
  gold = 600;
  primaryAttribute = Attributes.intelligence;
  attackType = AttackTypes.ranged;
  abilities = [AbilityList[0]];
  position = [1000, 1000] as PositionTuple;
  equipment = [];
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
