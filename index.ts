import { Hero } from './entities/Hero';
import { Lina } from './heroes/Lina';
import { Sven } from './heroes/Sven';

const sven = new Hero(Sven);
const lina = new Hero(Lina);

// sven.move([1, 100]);
// lina.move([1, 101]);

// sven.attack();
// sven.attack(lina);

sven.spell(sven.abilityHandler.getAbilities()[0], lina);
// lina.spell(lina.abilityHandler.getAbilities()[0], sven);
