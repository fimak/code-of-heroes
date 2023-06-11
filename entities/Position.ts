import { PositionTuple } from './Hero';

export class Position {
  private position: PositionTuple;

  constructor(position: PositionTuple) {
    this.position = position;
  }

  move(position: PositionTuple) {
    this.setPosition(position);
    console.log(`Moved to ${position}.`);
  }

  checkAttackRange(targetPosition: PositionTuple, range: number) {
    const x = Math.abs(targetPosition[0] - this.position[0]);
    const y = Math.abs(targetPosition[1] - this.position[1]);
    return (x + y) <= range;
  }

  getPosition() {
    return this.position;
  }

  setPosition(position: PositionTuple) {
    this.position = position;
  }
}
