import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { Shuffle, ConfigService } from '../config-service/config.service';
import { SlidingPuzzle } from '../sliding-puzzle';
import { Solver } from '../solver';

@Pipe({ name: 'enumToArray' })
export class EnumToArrayPipe implements PipeTransform {
  transform(value) {
    return Object.keys(value).filter(e => !isNaN(+e)).map(o => ({ index: +o, name: value[o] }));
  }
}

@Component({
  selector: 'app-sliding-puzzle',
  templateUrl: './sliding-puzzle.component.html',
  styleUrls: ['./sliding-puzzle.component.css']
})
export class SlidingPuzzleComponent implements OnInit {
  game: SlidingPuzzle;
  imagesBaseDir = 'assets/images';
  availableThemes = ['default', 'dev', 'lenna'];
  theme: string;
  shuffle: Shuffle;
  Shuffle = Shuffle;
  solved: boolean;
  lastMove: number = null;

  constructor(private config: ConfigService) {
  }

  ngOnInit() {
    this.solved = false;
    this.game = new SlidingPuzzle(4);
    this.theme = this.config.get('theme');
    this.shuffle = this.config.getNumber('shuffle');
    this.game.checkSolved();
  }


  onclick(tile: HTMLElement, n: number) {
    const last = this.game.blank;
    if (!this.game.move(n)) return;
    this.lastMove = last;
    if (this.game.checkSolved()) {
      this.solved = true;
    }
  }

  play(moves: number[]) {
    if(moves.length === 0) {
      if (this.game.checkSolved()) {
        this.solved = true;
      }
      return;
    }
    this.game.move(moves.shift());
    window.setTimeout(() => this.play(moves), 100);
  }

  
  solve() {
    let solver = new Solver(this.game);
    solver.solve();
    console.log(solver.moves.length);
    this.play(solver.moves);
  }

  reset() {
    this.lastMove = null;
    this.game = new SlidingPuzzle(4);
    this.game.shuffle(this.shuffle);
    this.solved = false;
  }

  onThemeChange() {
    this.config.set('theme', this.theme);
  }

  onShuffleChange() {
    this.config.setNumber('shuffle', this.shuffle);
  }

  caption(i, j): string {
    const n = this.game.block(i, j);
    if (n === null) return '';
    else return String(n+1);
  }

  animation(i: number, j: number): string {
    if (i*4+j === this.lastMove) {
      if (j < 3 && this.game.block(i, j+1) === null) return 'left';
      if (j > 0 && this.game.block(i, j-1) === null) return 'right';
      if (i < 3 && this.game.block(i+1, j) === null) return 'up';
      if (i > 0 && this.game.block(i-1, j) === null) return 'down';
    }
    return '';
  }
}
