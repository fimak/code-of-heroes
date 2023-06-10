import { Hero } from './entities/Hero';
import { Lina } from './heroes/Lina';
import { Sven } from './heroes/Sven';

const sven = new Hero(Sven);
const lina = new Hero(Lina);

sven.move([1, 100]);
lina.move([1, 101]);
