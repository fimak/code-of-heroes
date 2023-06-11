import { Ability, AbilityHandler } from './Ability';
import { AttackHandler, AttackTypes } from './Attack';
import {
  Attributes,
} from './Attribute';
import { Item } from './Item';
import { Position } from './Position';
import { BaseStats, Stats, StatsHandler } from './Stats';

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
  attackHandler: AttackHandler;
  abilityHandler: AbilityHandler;
  positionHandler: Position;
  equipment: Array<Item>;
  statsHandler: StatsHandler;
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
  public abilityHandler;
  public positionHandler;
  public attackHandler;
  public equipment: Array<Item>;
  public statsHandler;
  public target: IHero | null;

  constructor(params: HeroParams) {
    this.name = params.name;
    this.level = 1;
    this.experience = 0;
    this.gold = 600;
    this.primaryAttribute = params.primaryAttribute;
    this.attackType = params.attackType;
    this.abilityHandler = new AbilityHandler(params.abilities);
    this.positionHandler = new Position(params.position);
    this.attackHandler = new AttackHandler(this);
    this.equipment = [];
    this.statsHandler = new StatsHandler(params, this);
    this.target = null;
    console.log(`Hero ${this.name} has been created!`);
    console.log(`Health: ${this.statsHandler.getStats().health}/${this.statsHandler.getStats().healthMaximum()}`);
    console.log(`Mana: ${this.statsHandler.getStats().mana}/${this.statsHandler.getStats().manaMaximum()}`);
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
