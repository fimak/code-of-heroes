import { AbilityList } from '../Abilities';
import { Lina } from '../heroes/Lina';
import { Sven } from '../heroes/Sven';
import { Ability } from './Ability';
import { Hero, HeroParams } from './Hero';

describe('Hero', () => {
  let hero: Hero;
  let mockAbility: Ability;

  // This is a setup for each test
  beforeEach(() => {
    const heroParams: HeroParams = { ...Sven };

    mockAbility = {
      ...AbilityList[0]
    };

    hero = new Hero(heroParams);
  });

  it('should initialize correctly', () => {
    expect(hero.name).toBe('Sven');
    expect(hero.level).toBe(1);
    expect(hero.experience).toBe(0);
  });

  it('should move to the correct position', () => {
    hero.move([10, 10]);
    expect(hero.positionHandler.getPosition()).toEqual([10, 10]);
  });

  it('should move to the correct attack position', () => {
    const enemyHero = new Hero({ ...Lina });
    hero.attack(enemyHero);
    expect(hero.positionHandler.getPosition()).not.toEqual(enemyHero.positionHandler.getPosition());
  });

  it('should be able to attack', () => {
    const enemyHero = new Hero({ ...Lina });
    hero.attack(enemyHero);
    expect(enemyHero.statsHandler.getStats().health).toBeLessThan(enemyHero.statsHandler.getStats().healthMaximum());
  });

  it('should be able to cast a spell', () => {
    const enemyHero = new Hero({ ...Lina });
    hero.spell(mockAbility, enemyHero);
    expect(hero.statsHandler.getStats().mana).toEqual(hero.statsHandler.getStats().manaMaximum() - mockAbility.manaCost[0])
    expect(enemyHero.statsHandler.getStats().health).toBeLessThan(enemyHero.statsHandler.getStats().healthMaximum());
  });
});
