import { Component } from '@angular/core';
import { GetMovieDataService } from './services/get-movie-data.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {  forkJoin } from 'rxjs';
import { DataSharingService } from './services/data-sharing.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Movie Hub';
  movieData: any = [];
  movie: any;
  page: number = 1;
  pages: number;
  cast: any[] =[];
  toggleNav: boolean = false;
  constructor(private movieDataService: GetMovieDataService,private modalService: NgbModal, public dataShare: DataSharingService){
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

  public toggleSideBar() {
    this.toggleNav = !this.toggleNav;
  }
  

  public pageChanged(numb: number) {
    this.movieDataService.getPopularMovies(numb).subscribe(
      response => {
        this.pages = response.total_pages; 
        this.movieData =  response.results.map(result => {
          result.poster_path = 'https://images.tmdb.org/t/p/w200'+result.poster_path;
          return result;
        });
        this.dataShare.changeMovies(this.movieData);
      }
    );
  }

  public searchValue(value: any){
    this.pages = value.total_pages;
    this.movieData =  value.results.map(result => {
      result.poster_path = 'https://images.tmdb.org/t/p/w200'+result.poster_path;
      return result;
    });
    this.dataShare.changeMovies(this.movieData);
  }
}
