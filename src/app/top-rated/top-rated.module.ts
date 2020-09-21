import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TopRatedRoutingModule } from './top-rated-routing.module';
import { TopMoviesComponent } from './top-movies/top-movies.component';


@NgModule({
  declarations: [TopMoviesComponent],
  imports: [
    CommonModule,
    TopRatedRoutingModule
  ]
})
export class TopRatedModule { }
