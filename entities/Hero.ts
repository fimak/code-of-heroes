import { Ability, AbilityTarget } from './Ability';
import { Attributes } from './Attribute';
import { Item } from './Item';
import { Stats } from './Stats';

export enum AttackTypes {
  melee = 'MELEE',
  ranged = 'RANGED',
}

export type PositionTuple = [number, number];

export interface IHero {
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
  attackPoint: IHero | null;
  move(position: PositionTuple): void;
  attack(): void;
  spell(ability: Ability): void;
}

export abstract class Hero implements IHero {
  abstract name: string;
  level = 1;
  experience = 0;
  gold = 600;
  abstract primaryAttribute: Attributes;
  abstract attackType: AttackTypes;
  abstract abilities: Array<Ability>;
  abstract position: PositionTuple;
  equipment = [];
  abstract stats: Stats;
  abstract attackPoint: IHero | null;

  move(position: PositionTuple) {
    this.position = position;
    console.log(`${this.name} moved to ${position}.\n`);
  }
  attack() {
    if (this.attackPoint) {
      const min = this.stats.damage[0];
      const max = this.stats.damage[1];
      const damage = Math.floor(Math.random() * (max - min + 1)) + min;
      console.log(`${this.name} attacked the ${this.attackPoint.name } and dealt ${damage} damage.\n`);
    } else {
      console.log(`${this.name} miss.\n`);
    }
  }
  spell(ability: Ability) {
    if (this.attackPoint && ability.target === AbilityTarget.direct) {
      console.log(`${this.name} spell ${ability.name}.\n`);
    } else {
      console.log(`${this.name} can't spell ${ability.name}.\n`);
    }
  }
}
