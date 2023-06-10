export enum AbilityType {
  active = 'ACTIVE',
  passive = 'PASSIVE',
}

export enum AbilityTarget {
  aoe = 'AOE',
  direct = 'DIRECT',
}

export enum DamageTypes {
  magic = 'MAGIC',
  physic = 'PHYSIC',
  pure = 'PURE',
}

export interface Ability {
  name: string;
  level: number;
  levelMax: number;
  type: AbilityType.active;
  target: AbilityTarget;
  damage: Array<number>;
  damageType: DamageTypes,
  disableDuration?: number;
  stunDuration?: Array<number>;
}
