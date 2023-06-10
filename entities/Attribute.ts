export enum Attributes {
  strength = 'STRENGTH',
  agility = 'AGILITY',
  intelligence = 'INTELLIGENCE',
}

class AttributeBonus {
  strength: {
    health: 22,
    healthRegeneration: 0.1,
    damage: 1,
  };
  agility: {
    armor: 0.167,
    attackSpeed: 1,
    damage: 1,
  };
  intelligence: {
    mana: 12,
    manaRegeneration: 0.05,
    magicResistance: 0.1,
    damage: 1,
  }
}
