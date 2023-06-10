enum AbilityTypes {
  aoe = 'AOE',
  direct = 'DIRECT',
}

enum DamageTypes {
  magic = 'MAGIC',
  physic = 'PHYSIC',
  pure = 'PURE',
}

export interface Ability {
  name: string;
  type: AbilityTypes;
  damage: number;
  damageType: DamageTypes,
  disable: number;
  stun: number;
}
