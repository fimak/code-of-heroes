export type DamageTuple = [number, number];

export interface Stats {
  strength: number;
  strengthIncrease: number;
  agility: number;
  agilityIncrease: number;
  intelligence: number;
  intelligenceIncrease: number;
  health: number;
  healthMaximum: number;
  healthRegeneration: number;
  mana: number;
  manaMaximum: number;
  manaRegeneration: number;
  armor: number;
  magicResistance: number;
  statusResistance: number;
  damage: DamageTuple;
  attackRange: number;
  attackSpeed: number;
  moveSpeed: number;
  visionRange: number;
  evasion: number;
}
