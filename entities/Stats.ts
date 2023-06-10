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
