import {Component, OnInit, Pipe, PipeTransform} from '@angular/core';
import {Shuffle, ConfigService} from '../config.service';
import {GameService} from '../game.service';

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
  padding: number;
  theme: string;
  shuffle: Shuffle;
  Shuffle = Shuffle;

  constructor(private config: ConfigService,
              private game: GameService) {
  }

  ngOnInit() {
    this.theme = this.config.get('theme');
    this.shuffle = this.config.getNumber('shuffle');
    this.padding = 2;
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
      this.padding = 0;
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
