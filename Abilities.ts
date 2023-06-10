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
    coolDown: [18, 16, 14, 12],
    manaCost: [110, 115, 120, 125],
    castRange: 600,
    stunDuration: [1, 1.2, 1.4, 1.6],
  },
  {
    name: 'Dragon Slave',
    level: 1,
    levelMax: 4,
    type: AbilityType.active,
    target: AbilityTarget.aoe,
    damage: [85, 165, 245, 325],
    damageType: DamageTypes.magic,
    coolDown: [12, 11, 10, 9],
    manaCost: [100, 115, 130, 145],
    castRange: 800,
  }
];
