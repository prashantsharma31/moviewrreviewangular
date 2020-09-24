import { Component } from '@angular/core';
import { GetMovieDataService } from './services/get-movie-data.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {  forkJoin } from 'rxjs';
import { DataSharingService } from './services/data-sharing.service';
import { Route } from '@angular/compiler/src/core';
import { ActivatedRoute } from '@angular/router';

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
  constructor(private route: ActivatedRoute, private movieDataService: GetMovieDataService,private modalService: NgbModal, public dataShare: DataSharingService){
    this.resetMoviesData(this.page);
  }

  public toggleSideBar() {
    this.toggleNav = !this.toggleNav;
  }
  

  public pageChanged(numb: number) {
    if(this.route.snapshot['_routerState'].url == '/topRated'){
      this.resetTopMoviesData(numb);
    } else {
      this.resetMoviesData(numb);
    }
  }

  public searchValue(search: any){
    if(search) {
      this.movieDataService.getSearchedMovies(search).subscribe( value => {
        this.pages = value.total_pages;
        this.movieData =  value.results.map(result => {
          result.poster_path = 'https://images.tmdb.org/t/p/w200'+result.poster_path;
          return result;
        });
        this.dataShare.changeMovies(this.movieData);
        }
      )
    } else {
      this.pageChanged(1);
    }
  }

  public resetMoviesData(page: number) {
    this.movieDataService.getPopularMovies(page).subscribe(
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

  public resetTopMoviesData(page: number) {
    this.movieDataService.getTopRatedMovies(page).subscribe(
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
}
