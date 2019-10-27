import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlidingPuzzleComponent } from './sliding-puzzle.component';

describe('SlidingPuzzleComponent', () => {
  let component: SlidingPuzzleComponent;
  let fixture: ComponentFixture<SlidingPuzzleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlidingPuzzleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlidingPuzzleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
