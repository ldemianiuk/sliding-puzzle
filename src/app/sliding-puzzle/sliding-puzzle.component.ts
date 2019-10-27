import { Component, OnInit } from '@angular/core';

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


  ngOnInit() {
    const theme = localStorage.getItem('theme');
    if (theme) {
      this.theme = theme;
    }

    this.padding = 2;

    this.blocks = [...Array(15).keys(), null];

    // this.shuffleArray(this.blocks);
    this.swap (14, 15);
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
}
