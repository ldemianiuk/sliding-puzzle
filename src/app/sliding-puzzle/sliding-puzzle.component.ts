import {Component, OnInit, Pipe, PipeTransform} from '@angular/core';
import {Shuffle, ConfigService} from '../config-service/config.service';
import {SlidingPuzzle} from '../sliding-puzzle';

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
  game: SlidingPuzzle;
  four = [...Array(4).keys()];
  imagesBaseDir = 'assets/images';
  availableThemes = ['default', 'dev', 'lenna'];
  theme: string;
  shuffle: Shuffle;
  Shuffle = Shuffle;
  solved;

  constructor(private config: ConfigService) {
  }

  ngOnInit() {
    this.solved = false;
    this.game = new SlidingPuzzle();
    this.theme = this.config.get('theme');
    this.shuffle = this.config.getNumber('shuffle');
    this.game.shuffle(this.shuffle);
  }

  image(n: number): string {
    if (this.game.blocks[n] !== null ) {
      return this.imagesBaseDir + '/' + this.config.get('theme') + '/' + this.game.blocks[n] + '.jpg';
    } else {
      return '';
    }
  }

  onclick(n: number) {
    this.game.move(n);
    if (this.game.isSolved()) {
      this.solved = true;
    }
  }

  reset() {
    this.ngOnInit();
  }

  onThemeChange() {
    this.config.set('theme', this.theme);
  }

  onShuffleChange() {
    this.config.setNumber('shuffle', this.shuffle);
  }
}
