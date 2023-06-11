import { Ability, AbilityHandler, AbilityTarget } from './Ability';
import { AttackHandler, AttackTypes } from './Attack';
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
  // attackType: AttackTypes;
  attackHandler: AttackHandler;
  // abilities: Array<Ability>;
  abilityHandler: AbilityHandler;
  // position: PositionTuple;
  positionHandler: Position;
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
  public abilityHandler;
  public positionHandler;
  public attackHandler;
  public equipment: Array<Item>;
  public stats: Stats;
  public target: IHero | null;

  constructor(params: HeroParams) {
    this.name = params.name;
    this.level = 1;
    this.experience = 0;
    this.gold = 600;
    this.primaryAttribute = params.primaryAttribute;
    this.abilityHandler = new AbilityHandler(params.abilities);
    this.positionHandler = new Position(params.position);
    this.attackHandler = new AttackHandler(this, this.positionHandler);
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
    this.positionHandler.move(position);
  }

  attack(target?: Hero) {
    this.attackHandler.attack(target);
  }

  spell(ability: Ability, target?: Hero) {
    if (target) {
      this.target = target;
    }
    this.abilityHandler.useAbility(ability, this, target as Hero);
  }
}
