import { Ability, AbilityTarget, AbilityType, DamageTypes } from './entities/Ability';

export const AbilityList: Array<Ability> = [
  {
    name: 'Storm Hummer',
    level: 1,
    levelMax: 4,
    type: AbilityType.active,
    target: AbilityTarget.direct,
    damage: [80, 160, 240, 320],
    damageType: DamageTypes.magic,
    stunDuration: [1, 1.2, 1.4, 1.6],
  }
];
