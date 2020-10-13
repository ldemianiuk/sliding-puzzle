import { SlidingPuzzle } from './sliding-puzzle';

export class Solver extends SlidingPuzzle {
    constructor(start: SlidingPuzzle) {
        super();
        this.blocks = [...start.blocks];
        this.blank = start.blank;
    }

      // Move successive blocks, being careful not to distrub the ones already placed
  // (ID)A* is too slow, even with sophisticated heuristic
  solve() {
    this.moveBlock(0, 0, 0);
    this.moveBlock(1, 1, 0);
    this.moveBlock(2, 2, 0);
    if (this.blocks[6] === 3) {
      this.down();
      this.down();
      this.left();
      this.up();
      this.right();
      this.up();
    }
    this.left();
    this.down();
    this.moveBlock(3, 2, 1);
    this.left();
    this.up();
    this.right();
    this.down();
    this.moveBlock(4, 0, 1);
    this.moveBlock(8, 0, 2);
    if (this.blocks[13] === 12) {
      this.right();
      this.down();
      this.left();
      this.up();
    }
    this.down();
    this.left();
    this.up();
    this.right();
    this.moveBlock(12, 1, 2);
    this.down();
    this.left();
    this.up();
    this.left();
    this.down();
    this.right();
    this.moveBlock(5, 1, 1);
    this.moveBlock(6, 2, 1);
    if (this.blocks[10] === 7) {
      this.down();
      this.down();
      this.left();
      this.up();
      this.right();
      this.up();
    }
    this.left();
    this.down();
    this.moveBlock(7, 2, 2);
    this.left();
    this.up();
    this.right();
    this.down();
    this.moveBlock(9, 1, 2);
    if (this.blocks[14] === 13) {
      this.right();
      this.down();
      this.left();
      this.up();
    }
    this.down();
    this.left();
    this.up();
    this.right();
    this.moveBlock(13, 2, 2);
    this.down();
    this.left();
    this.up();
    this.left();
    this.down();
    this.right();
    
    if (this.blocks[10] === 10) {
      this.right();
    }

    if (this.blocks[10] !== 10) {
      this.up();
      this.right();
      this.down();
    }

    if (this.blocks[10] !== 10) {
      this.left();
      this.up();
      this.right();
      this.down();
    }

  }


  moveBlock(block: number, x: number, y: number) {
    let target: number = this.blocks.findIndex(x => x === block);
    let tx = this.x(target);
    let ty = this.y(target);

    if (this.x(this.blank) === tx) {
      if (tx === this.size - 1) {
        this.left();
      }
      else {
        this.right();
      }
    }

    while (this.y(this.blank) < ty) this.down();
    while (this.y(this.blank) > ty) this.up();

    if (this.y(this.blank) === ty) {
      while (this.x(this.blank) > tx + 1) this.left();
      while (this.x(this.blank) < tx) this.right();
    }


    target = this.blocks.findIndex(x => x === block);
    tx = this.x(target);
    ty = this.y(target);

    if (ty === this.size - 1) {
      this.up();
      this.left();
      this.down();
      this.right();
      this.up();
      ty--;
    }

    for (let i = ty; i < y; i++) {
      this.down();
      this.left();
      this.up();
      this.right();
      this.down();
    }

    for (let i = tx; i < x; i++) {
      this.left();
      this.down();
      this.right();
      this.right();
      this.up();
    }

    for (let i = ty; i > y; i--) {
      this.up();
      this.left();
      this.down();
      this.right();
      this.up();
    }

    for (let i = tx; i > x; i--) {
      this.down();
      this.left();
      this.left();
      this.up();
      this.right();
    }

  }

}


