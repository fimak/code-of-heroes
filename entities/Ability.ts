import { Hero } from './Hero';

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
  coolDown: Array<number>,
  manaCost: Array<number>,
  castRange: number;
  disableDuration?: number;
  stunDuration?: Array<number>;
}

export class AbilityHandler {
  private abilities: Array<Ability>;

  constructor(abilities: Array<Ability>) {
    this.abilities = abilities;
  }

  useAbility(ability: Ability, owner: Hero, target: Hero) {
    if (ability.coolDown) {}
    if (target && ability.target === AbilityTarget.direct) {
      console.log(`${owner.name} is going to use ability ${ability.name} on ${target.name}.`);
      const isInRage = owner.positionHandler.checkAttackRange(target.positionHandler.getPosition(), ability.castRange);
      if (isInRage) {
        const damage = owner.attackHandler.calcMagicDamage(ability.damage[0]);
        target.statsHandler.getStats().health -= damage;
        console.log('Whoosh!');
        owner.statsHandler.getStats().mana -= ability.manaCost[0];
        console.log(`${owner.name} spell ${ability.name} on ${target.name } and dealt ${damage} damage.`);
        owner.attackHandler.checkEnemyHealth(target as Hero);
      } else {
        console.log(`${owner.name}: "Target is too far!"`);
        owner.move([owner.positionHandler.getPosition()[0], target.positionHandler.getPosition()[1] - owner.statsHandler.getStats().attackRange]);
        this.useAbility(ability, owner, target);
      }
    } else {
      console.log(`${owner.name} can't spell ${ability.name}.`);
    }
  }

  addAbility(ability: Ability) {
    this.abilities.push(ability);
  }

  removeAbility(ability: Ability) {
    const index = this.abilities.findIndex(ab => ab.name === ability.name);
    if (index > -1) {
      this.abilities.splice(index, 1);
    }
  }

  getAbilities() {
    return this.abilities;
  }
}
