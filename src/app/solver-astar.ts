import { SlidingPuzzle } from './sliding-puzzle';
import PriorityQueue from 'ts-priority-queue';

export class Solver {
    queue: PriorityQueue<Board>;
    visited: boolean[] = [];
    solution: Board = null;

    constructor(start: SlidingPuzzle) {
        this.queue = new PriorityQueue<Board>({ comparator: Board.compare })
        const b = new Board(start);
        b.calcManhattan();
        this.queue.queue(b);
    }

    relax() {
        const v = this.queue.dequeue();
        this.visited[v.hash()] = true;
        
        for (const n of v.neighbors(v.blank)) {
            const b = new Board(v);
            b.move(n);
            if (this.visited[b.hash()]) continue;
            if (b.checkSolved()) {
                this.solution = b;
                return;
            }
            b.calcManhattan();
            this.queue.queue(b);
        }
    }

    solve() {
        while (this.solution === null) {
            this.relax();
        }
    }


}


class Board extends SlidingPuzzle {
    manhattan = 0;
    distance = 0;
    previous: Board = null;
    mv: number = null;

    constructor(source: SlidingPuzzle) {
        super(3);
        if (source instanceof Board) {
            this.previous = source;
            this.distance = this.previous.distance + 1;
        }
        for (let i = source.blocks.length - 1; i >= 0; i--) {
            this.blocks[i] = source.blocks[i];
        }
        this.blank = source.blank;
    }

    calcManhattan() {
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                const n = this.block(i, j);
                if (n === null) continue;
                const dist = Math.abs(n - i);
                this.manhattan += Math.floor(dist / this.size) + dist % this.size;
            }
        }
    }

    move(n: number): boolean {
        this.swap(n);
        this.mv = n;
        return true;
    }

    getMoves(): number[] {
        let result: number[] = [];
        for (let b = (this as Board); b !== null; b = b.previous) {
            result.push(b.mv);
        }
        return result;
    }

    equals(b: Board): boolean {
        for (let i = 0; i < this.size*this.size; i++) {
            if (this.blocks[i] !== b.blocks[i]) return false;
        }
        return true;
    }

    hash(): string {
        return this.blocks.map(x => x === null? '_' : x.toString(16)).join('');
    }

    static compare(a: Board, b: Board): number {
        return a.distance + a.manhattan - (b.distance + b.manhattan);
    }
}