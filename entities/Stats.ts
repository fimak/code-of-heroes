import {
  AGILITY_ARMOR_BONUS, INTELLIGENCE_MAGIC_RESISTANCE_BONUS,
  INTELLIGENCE_MANA_BONUS,
  INTELLIGENCE_MANA_REGEN_BONUS,
  STRENGTH_HEALTH_BONUS,
  STRENGTH_HEALTH_REGEN_BONUS
} from './Attribute';
import { Hero } from './Hero';

export type DamageTuple = [number, number];

export interface BaseStats {
  strength: number;
  strengthIncrease: number;
  agility: number;
  agilityIncrease: number;
  intelligence: number;
  intelligenceIncrease: number;
  health: number;
  healthRegeneration: number;
  mana: number;
  manaRegeneration: number;
  armor: number;
  magicResistance: number;
  damage: DamageTuple;
  attackRange: number;
  attackSpeed: number;
  moveSpeed: number;
  visionRange: number;
  evasion: number;
}

export interface Stats extends Omit<BaseStats, 'healthRegeneration' | 'manaRegeneration' | 'armor' | 'magicResistance' | 'damage'> {
  healthMaximum: () => number;
  healthRegeneration: () => number;
  manaMaximum: () => number;
  manaRegeneration: () => number;
  statusResistance: number;
  armor: () => number;
  magicResistance: () => number;
  damage: () => DamageTuple;
}

export class StatsHandler {
  private stats: Stats;
  private hero: Hero;

  constructor(params: BaseStats, hero: Hero) {
    this.hero = hero;
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
        const min = params.damage[0] + this.stats[hero.primaryAttribute];
        const max = params.damage[1] + this.stats[hero.primaryAttribute];
        return [min, max];
      },
      attackRange: params.attackRange,
      attackSpeed: params.attackSpeed,
      moveSpeed: params.moveSpeed,
      visionRange: params.visionRange,
      evasion: params.evasion,
    }
  }

  getStats() {
    return this.stats;
  }
}
