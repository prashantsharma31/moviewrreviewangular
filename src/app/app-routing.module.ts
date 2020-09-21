import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { PopularMoviesComponent } from './popular-movies/popular-movies.component';


const routes: Routes = [{
  path: 'topRated',
  loadChildren: () => import('./top-rated/top-rated.module').then(m => m.TopRatedModule)
},
{ path: '', component: PopularMoviesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
