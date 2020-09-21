import { Component } from '@angular/core';
import { GetMovieDataService } from '../services/get-movie-data.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {  forkJoin } from 'rxjs';


@Component({
  selector: 'app-popular-movies',
  templateUrl: './popular-movies.component.html',
  styleUrls: ['./popular-movies.component.scss']
})
export class PopularMoviesComponent {

  movieData: any = [];
  movie: any;
  page: number = 1;
  pages: number;
  cast: any[] =[];
  toggleNav: boolean = false;
  constructor(private movieDataService: GetMovieDataService,private modalService: NgbModal){
    this.movieDataService.getPopularMovies(this.page).subscribe(
      response => {
        this.pages = response.total_pages; 
        this.movieData =  response.results.map(result => {
          result.poster_path = 'https://images.tmdb.org/t/p/w200'+result.poster_path;
          return result;
        });
      }
    );
  }


}
