import {Component, OnInit, Pipe, PipeTransform} from '@angular/core';
import {Shuffle, ConfigService} from '../config.service';

@Pipe({name: 'enumToArray'})
export class EnumToArrayPipe implements PipeTransform {
  transform(value) {
    return Object.keys(value).filter(e => !isNaN(+e)).map(o => ({index: +o, name: value[o]}));
  }
}

@Component({
  selector: 'app-sliding-puzzle',
  templateUrl: './sliding-puzzle.component.html',
  styleUrls: ['./sliding-puzzle.component.css']
})
export class SlidingPuzzleComponent implements OnInit {
  four = [...Array(4).keys()];
  imagesBaseDir = 'assets/images';
  availableThemes = ['default', 'dev', 'lenna'];
  blocks: number[];
  padding: number;
  theme: string;
  shuffle: Shuffle;
  Shuffle = Shuffle;

  constructor(private config: ConfigService) {
  }

  ngOnInit() {
    this.theme = this.config.get('theme');
    this.shuffle = this.config.getNumber('shuffle');

    this.padding = 2;

    this.blocks = [...Array(15).keys(), null];

    switch (this.config.getNumber('shuffle')) {
      case Shuffle.Easy:
        console.log('easy');
        this.swap (14, 15);
        break;
      case Shuffle.Random:
        this.shuffleArray(this.blocks);
        console.log('random');
        break;
    }

  }

  image(n: number): string {
    if (this.blocks[n] !== null ) {
      return this.imagesBaseDir + '/' + this.config.get('theme') + '/' + this.blocks[n] + '.jpg';
    } else {
      return '';
    }
  }

  onclick(n: number) {
    for (const i of this.neighbors((n))) {
      if (this.blocks[i] == null) {
        this.swap(n, i);
        this.checkSolved();
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

  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }

  private swap(n: number, i: number) {
    const tmp = this.blocks[n];
    this.blocks[n] = this.blocks[i];
    this.blocks[i] = tmp;
  }

  private checkSolved() {
    for (let i = 0; i < 15; i++) {
      if (this.blocks[i] !== i) { return; }
    }
    this.blocks[15] = 15;
    this.padding = 0;
  }

  reset() {
    this.ngOnInit();
  }

  onThemeChange() {
    this.config.set('theme', this.theme);
  }

  onShuffleChange() {
    this.config.setNumber('shuffle', this.shuffle);
    this.reset();
  }
}
