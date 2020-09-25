import { Injectable } from '@angular/core';

export enum Shuffle { Random, Easy}

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor() {
    this.addDefault('theme', 'default');
    this.addDefaultNumber('shuffle', Shuffle.Random);
  }

  get(key: string): string {
    return localStorage.getItem(key);
  }

  getNumber(key: string): number {
    return +this.get(key);
  }

  set(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  setNumber(key: string, value: number) {
    localStorage.setItem(key, '' + value);
  }

  addDefault(key: string, value: string) {
    if (localStorage.getItem(key) == null) {
      localStorage.setItem(key, value);
    }
  }

  addDefaultNumber(key: string, value: number) {
    this.addDefault(key, '' + value);
  }
}
