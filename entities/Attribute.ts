export enum Attributes {
  strength = 'STRENGTH',
  agility = 'AGILITY',
  intelligence = 'INTELLIGENCE',
}

class AttributeBonus {
  strength;
  agility;
  intelligence;
  constructor() {
    this.strength = {
      health: 22,
        healthRegeneration: 0.1,
        damage: 1,
    };
    this.agility = {
      armor: 0.167,
        attackSpeed: 1,
        damage: 1,
    };
    this.intelligence = {
      mana: 12,
        manaRegeneration: 0.05,
        magicResistance: 0.1,
        damage: 1,
    }
  }
}
