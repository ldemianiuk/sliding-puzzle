import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SlidingPuzzleComponent} from './sliding-puzzle/sliding-puzzle.component';


const routes: Routes = [
  {path: '', redirectTo: 'puzzle', pathMatch: 'full'},
  {path: 'puzzle', component: SlidingPuzzleComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
