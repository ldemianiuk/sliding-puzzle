import {Shuffle} from './config-service/config.service';

export class SlidingPuzzle {
  blocks: number[];

  constructor() {
    this.blocks = [...Array(15).keys(), null];
  }

  move(n: number) {
    for (const i of this.neighbors((n))) {
      if (this.blocks[i] == null) {
        this.swap(n, i);
      }
    }
  }

  neighbors(n: number): number[] {
    const result = [];
    if (n % 4 !== 0) {
      result.push(n - 1);
    }
    if (n % 4 !== 3) {
      result.push(n + 1);
    }
    if (n > 3) {
      result.push(n - 4);
    }
    if (n < 12) {
      result.push(n + 4);
    }
    return result;
  }

  isSolved(): boolean {
    for (let i = 0; i < 15; i++) {
      if (this.blocks[i] !== i) { return false; }
    }
    this.blocks[15] = 15;
    return true;
  }

  shuffle(shuffle: Shuffle) {
    switch (shuffle) {
      case Shuffle.Easy:
        this.swap(14, 15);
        break;
      case Shuffle.Random:
        this.shuffleArray(this.blocks);
        break;
    }
  }

  private swap(n: number, i: number) {
    const tmp = this.blocks[n];
    this.blocks[n] = this.blocks[i];
    this.blocks[i] = tmp;
  }

  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }
}
