import {Component, OnInit, Pipe, PipeTransform} from '@angular/core';

enum Shuffle { Random, Easy}

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
  theme = 'default';
  blocks: number[];
  availableThemes = ['default', 'dev', 'lenna'];
  padding: number;
  shuffle = Shuffle.Random;
  Shuffle = Shuffle;


  ngOnInit() {
    const theme = localStorage.getItem('theme');
    if (theme) {
      this.theme = theme;
    }


    const shuffle = localStorage.getItem('shuffle');
    if (shuffle) {
      this.shuffle = +shuffle;
    }

    this.padding = 2;

    this.blocks = [...Array(15).keys(), null];

    switch (this.shuffle) {
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
      return this.imagesBaseDir + '/' + this.theme + '/' + this.blocks[n] + '.jpg';
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

  onThemeChange() {
    localStorage.setItem('theme', this.theme);
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

  onShuffleChange() {
    localStorage.setItem('shuffle', '' + this.shuffle);
    this.shuffle = +this.shuffle;
    this.reset();
  }
}
