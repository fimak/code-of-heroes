import { Hero } from './Hero';
import { Position } from './Position';

export enum AttackTypes {
  melee = 'MELEE',
  ranged = 'RANGED',
}

enum AttackModifiers {
  criticalStrike = 'CRITICAL_STRIKE',
  splash = 'SPLASH',
  bash = 'BASH',
  lifeSteal = 'LIFE_STEAL',
  manaBreak = 'MANA_BREAK',
}

enum StatusEffects {
  stun = 'STUN',
  shackle = 'SHACKLE',
  root = 'ROOT',
  leash = 'LEASH',
  hex = 'HEX',
  cyclone = 'CYCLONE',
  banish = 'BANISH',
  blind = 'BLIND',
  silence = 'SILENCE',
  mute = 'MUTE',
  break = 'BREAK',
  disarm = 'DISARM',
  slow = 'SLOW',
  trap = 'TRAP',
  barrier = 'BARRIER',
  taunt = 'TAUNT',
  fear = 'FEAR',
  hypnosis = 'HYPNOSIS',
  forcedMovement = 'FORCED_MOVEMENT',
  teleport = 'TELEPORT',
  blink = 'BLINK',
  invisibility = 'INVISIBILITY',
  phased = 'PHASED',
  invulnerability = 'INVULNERABILITY',
  spellImmunity = 'SPELL_IMMUNITY',
  attackImmunity = 'ATTACK_IMMUNITY',
  ethereal = 'ETHEREAL',
}

enum Dispelling {
  basicDispel = 'BASIC_DISPEL',
  spellImmunity = 'SPELL_EMMUNITY',
  strongDispel = 'STRONG_DISPEL',
  removableBuffs = 'REMOVABLE_BUFFS',
  removableDeBuffs = 'REMOVABLE_DE_BUFFS'
}

export class AttackHandler {
  private hero: Hero;
  private positionHandler: Position;

  constructor(hero: Hero, positionHandler: Position) {
    this.hero = hero;
    this.positionHandler = positionHandler;
  }

  checkAttackRange(target: Hero, range: number) {
    return this.positionHandler.checkAttackRange(target.positionHandler.getPosition(), range);
  }

  calcPhysicDamage() {
    const min = this.hero.stats.damage()[0];
    const max = this.hero.stats.damage()[1];
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  calcMagicDamage(damage: number) {
    const resistance = this.hero.target?.stats.magicResistance() ? this.hero.target?.stats.magicResistance() : 0;
    return damage - damage * resistance;
  }

  checkEnemyHealth(target: Hero) {
    if (target.stats.health <= 0) {
      console.log(`${target.name} has dead!`);
      this.hero.target = null;
      console.log(`${this.hero.name} stopped.`);
    } else {
      console.log(`${target.name}'s health: ${target.stats.health}/${target.stats.healthMaximum()}`);
      this.attack();
    }
  }

  attack(target?: Hero) {
    if (target) {
      this.hero.target = target;
    }
    if (this.hero.target) {
      console.log(`${this.hero.name} is going to attack ${this.hero.target.name}.`);
      const isInRage = this.checkAttackRange(this.hero.target as Hero, this.hero.stats.attackRange);
      if (isInRage) {
        const damage = this.calcPhysicDamage();
        this.hero.target.stats.health -= damage;
        console.log('Boom!');
        console.log(`${this.hero.name} attacked the ${this.hero.target.name } and dealt ${damage} damage.`);
        this.checkEnemyHealth(this.hero.target as Hero);
      } else {
        console.log(`${this.hero.name}: "Target is too far!"`);
        this.hero.move([this.positionHandler.getPosition()[0], this.hero.target.positionHandler.getPosition()[1] - this.hero.stats.attackRange]);
        this.attack();
      }
    } else {
      console.log(`${this.hero.name} miss.`);
    }
  }
}
