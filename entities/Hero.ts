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
import { Position } from './Position';
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
  // position: PositionTuple;
  position: Position;
  equipment: Array<Item>;
  stats: Stats;
  target: IHero | null;
  move(position: PositionTuple): void;
  attack(target?: IHero): void;
  spell(ability: Ability, target?: IHero): void;
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
  public target: IHero | null;

  constructor(params: HeroParams) {
    this.name = params.name;
    this.level = 1;
    this.experience = 0;
    this.gold = 600;
    this.primaryAttribute = params.primaryAttribute;
    this.attackType = params.attackType;
    this.abilities = params.abilities;
    this.position = new Position(params.position);
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
      magicResistance: () => params.magicResistance + INTELLIGENCE_MAGIC_RESISTANCE_BONUS * this.stats.intelligence / 100,
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
    this.target = null;
    console.log(`Hero ${this.name} has been created!`);
    console.log(`Health: ${this.stats.health}/${this.stats.healthMaximum()}`);
    console.log(`Mana: ${this.stats.mana}/${this.stats.manaMaximum()}`);
    console.log('---------------------------');
  }

  move(position: PositionTuple) {
    this.position.move(position);
  }

  checkAttackRange(target: Hero, range: number) {
    return this.position.checkAttackRange(target.position.getPosition(), range);
  }

  calcPhysicDamage() {
    const min = this.stats.damage()[0];
    const max = this.stats.damage()[1];
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  calcMagicDamage(damage: number) {
    const resistance = this.target?.stats.magicResistance() ? this.target?.stats.magicResistance() : 0;
    return damage - damage * resistance;
  }

  checkEnemyHealth(target: Hero) {
    if (target.stats.health <= 0) {
      console.log(`${target.name} has dead!`);
      this.target = null;
      console.log(`${this.name} stopped.`);
    } else {
      console.log(`${target.name}'s health: ${target.stats.health}/${target.stats.healthMaximum()}`);
      this.attack();
    }
  }

  attack(target?: Hero) {
    if (target) {
      this.target = target;
    }
    if (this.target) {
      console.log(`${this.name} is going to attack ${this.target.name}.`);
      const isInRage = this.checkAttackRange(this.target as Hero, this.stats.attackRange);
      if (isInRage) {
        const damage = this.calcPhysicDamage();
        this.target.stats.health -= damage;
        console.log('Boom!');
        console.log(`${this.name} attacked the ${this.target.name } and dealt ${damage} damage.`);
        this.checkEnemyHealth(this.target as Hero);
      } else {
        console.log(`${this.name}: "Target is too far!"`);
        this.move([this.position.getPosition()[0], this.target.position.getPosition()[1] - this.stats.attackRange]);
        this.attack();
      }
    } else {
      console.log(`${this.name} miss.`);
    }
  }

  spell(ability: Ability, target?: Hero) {
    if (target) {
      this.target = target;
    }
    if (ability.coolDown) {}
    if (this.target && ability.target === AbilityTarget.direct) {
      console.log(`${this.name} is going to spell on ${this.target.name}.`);
      const isInRage = this.checkAttackRange(this.target as Hero, ability.castRange);
      if (isInRage) {
        const damage = this.calcMagicDamage(ability.damage[0]);
        this.target.stats.health -= damage;
        console.log('Whoosh!');
        console.log(`${this.name} spell ${ability.name} on ${this.target.name } and dealt ${damage} damage.`);
        this.checkEnemyHealth(this.target as Hero);
      } else {
        console.log(`${this.name}: "Target is too far!"`);
        this.move([this.position.getPosition()[0], this.target.position.getPosition()[1] - this.stats.attackRange]);
        this.spell(ability);
      }
    } else {
      console.log(`${this.name} can't spell ${ability.name}.`);
    }
  }
}
