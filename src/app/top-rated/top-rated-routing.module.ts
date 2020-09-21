import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TopMoviesComponent } from './top-movies/top-movies.component';

const routes: Routes = [
  {
    path: '',
    component: TopMoviesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TopRatedRoutingModule { }
