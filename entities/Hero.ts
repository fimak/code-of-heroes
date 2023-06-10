import { Ability, AbilityTarget } from './Ability';
import { AttackTypes } from './Attack';
import {
  AGILITY_ARMOR_BONUS,
  Attributes,
  INTELLIGENCE_MAGIC_RESISTANCE_BONUS,
  INTELLIGENCE_MANA_BONUS,
  INTELLIGENCE_MANA_REGEN_BONUS,
  STRENGTH_HEALTH_BONUS,
  STRENGTH_HEALTH_REGEN_BONUS
} from './Attribute';
import { Item } from './Item';
import { BaseStats, Stats } from './Stats';

export type PositionTuple = [number, number];

export interface HeroParams extends BaseStats {
  name: string;
  primaryAttribute: Attributes;
  attackType: AttackTypes;
  abilities: Array<Ability>;
  position: PositionTuple;
}

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

export class Hero implements IHero {
  public name;
  public level;
  public experience;
  public gold;
  public primaryAttribute;
  public attackType;
  public abilities;
  public position;
  public equipment: Array<Item>;
  public stats: Stats;
  public attackPoint: IHero | null;

  constructor(params: HeroParams) {
    this.name = params.name;
    this.level = 1;
    this.experience = 0;
    this.gold = 600;
    this.primaryAttribute = params.primaryAttribute;
    this.attackType = params.attackType;
    this.abilities = params.abilities;
    this.position = params.position;
    this.equipment = [];
    this.stats = {
      strength: params.strength,
      strengthIncrease: params.strengthIncrease,
      agility: params.agility,
      agilityIncrease: params.agilityIncrease,
      intelligence: params.intelligence,
      intelligenceIncrease: params.intelligenceIncrease,
      health: params.health + STRENGTH_HEALTH_BONUS * params.strength,
      healthMaximum: () => params.health + STRENGTH_HEALTH_BONUS * this.stats.strength,
      healthRegeneration: () => params.healthRegeneration + STRENGTH_HEALTH_REGEN_BONUS * this.stats.strength,
      mana: params.mana + INTELLIGENCE_MANA_BONUS * params.intelligence,
      manaMaximum: () => params.mana + INTELLIGENCE_MANA_BONUS * this.stats.intelligence,
      manaRegeneration: () => params.manaRegeneration + INTELLIGENCE_MANA_REGEN_BONUS * this.stats.intelligenceIncrease,
      armor: () => params.armor + AGILITY_ARMOR_BONUS * this.stats.agility,
      magicResistance: () => params.magicResistance + INTELLIGENCE_MAGIC_RESISTANCE_BONUS * this.stats.intelligence,
      statusResistance: 0,
      damage: () => {
        const min = params.damage[0] + this.stats[params.primaryAttribute];
        const max = params.damage[1] + this.stats[params.primaryAttribute];
        return [min, max];
      },
      attackRange: params.attackRange,
      attackSpeed: params.attackSpeed,
      moveSpeed: params.moveSpeed,
      visionRange: params.visionRange,
      evasion: params.evasion,
    }
    this.attackPoint = null;
    console.log(`Hero ${this.name} has been created!`);
    console.log(`Health: ${this.stats.health}/${this.stats.healthMaximum()}`);
    console.log(`Mana: ${this.stats.mana}/${this.stats.manaMaximum()}`);
    console.log('---------------------------');
  }

  move(position: PositionTuple) {
    this.position = position;
    console.log(`${this.name} moved to ${position}.`);
  }
  checkAttackRange(target: Hero) {
    const x = Math.abs(target.position[0] - this.position[0]);
    const y = Math.abs(target.position[1] - this.position[1]);
    return (x + y) <= this.stats.attackRange;
  }
  calcDamage() {
    const min = this.stats.damage()[0];
    const max = this.stats.damage()[1];
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  attack(target?: Hero) {
    if (target) {
      this.attackPoint = target;
    }
    if (this.attackPoint) {
      console.log(`${this.name} is going to attack ${this.attackPoint.name}.`);
      const isInRage = this.checkAttackRange(this.attackPoint as Hero);
      if (isInRage) {
        const damage = this.calcDamage();
        this.attackPoint.stats.health -= damage;
        console.log('Boom!');
        console.log(`${this.name} attacked the ${this.attackPoint.name } and dealt ${damage} damage.`);
        if (this.attackPoint.stats.health <= 0) {
          console.log(`${this.attackPoint.name} has dead!`);
          this.attackPoint = null;
          console.log(`${this.name} stopped.`);
        } else {
          console.log(`${this.attackPoint.name}'s health: ${this.attackPoint.stats.health}/${this.attackPoint.stats.healthMaximum()}`);
          this.attack();
        }
      } else {
        console.log(`${this.name}: "Target is too far!"`);
        this.move([this.position[0], this.attackPoint.position[1] - this.stats.attackRange]);
        this.attack();
      }
    } else {
      console.log(`${this.name} miss.`);
    }
  }
  spell(ability: Ability) {
    if (this.attackPoint && ability.target === AbilityTarget.direct) {
      console.log(`${this.name} spell ${ability.name}.`);
    } else {
      console.log(`${this.name} can't spell ${ability.name}.`);
    }
  }
}
