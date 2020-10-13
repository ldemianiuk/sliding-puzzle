import { Shuffle } from './config-service/config.service';
import Srand from 'seeded-rand';


export class SlidingPuzzle {
  blocks: number[];
  blank: number;
  size: number;
  moves: number[] = [];

  constructor(size: number = 4) {
    this.size = size;
    this.blocks = [...Array(size * size - 1).keys(), null];
    this.blank = size * size - 1;
  }

  block(i: number, j: number): number {
    return this.blocks[i * this.size + j];
  }

  x(block: number): number {
    return block % this.size;
  }

  y(block: number): number {
    return Math.floor(block / this.size);
  }

  up() {
    if (this.y(this.blank) <= 0) throw new Error();
    this.swap(this.blank - this.size);
  }

  down() {
    if (this.y(this.blank) >= this.size - 1) throw new Error();
    this.swap(this.blank + this.size);
  }

  left() {
    if (this.x(this.blank) <= 0) throw new Error();
    this.swap(this.blank - 1);
  }

  right() {
    if (this.x(this.blank) >= this.size - 1) throw new Error();
    this.swap(this.blank + 1);
  }


  move(n: number): boolean {
    if (this.neighbors(n).includes(this.blank)) {
      this.swap(n);
      return true;
    }
    return false;
  }

  neighbors(n: number): number[] {
    const result = [];
    if (n % this.size > 0) {
      result.push(n - 1);
    }
    if (n % this.size < this.size - 1) {
      result.push(n + 1);
    }
    if (n > this.size - 1) {
      result.push(n - this.size);
    }
    if (n < this.size * (this.size - 1)) {
      result.push(n + this.size);
    }
    return result;
  }

  checkSolved(): boolean {
    for (let i = 0; i < this.size * this.size - 1; i++) {
      if (this.blocks[i] !== i) { return false; }
    }
    this.blocks[this.size * this.size - 1] = this.size * this.size - 1;
    this.blank = null;
    return true;
  }

  shuffle(shuffle: Shuffle) {
    switch (shuffle) {
      case Shuffle.Easy:
        this.swap(this.size * this.size - 2);
        break;
      case Shuffle.Random:
        this.shuffleArray(this.blocks);
        //this.blocks = [0, 1, 2, 3, 4, null, 5, 8, 7, 11, 13, 14, 6, 10, 12, 9];
        //this.blank = 5;
        break;
    }
  }

  swap(n: number) {
    this.moves.push(n);
    this.swap_(n);
  }

  swap_(n: number) {
    const tmp = this.blocks[n];
    this.blocks[n] = this.blocks[this.blank];
    this.blocks[this.blank] = tmp;
    this.blank = n;
  }

  shuffleArray(array) {
    let seed = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
    console.log(seed);
    Srand.seed(seed);
    for (let i = 0; i < 10000; i++) {
      const n = this.neighbors(this.blank);
      const r = Math.floor(Srand.random() * n.length);
      this.swap_(n[r]);
    }
  }
}
