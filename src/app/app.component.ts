import { Component } from '@angular/core';
import { GetMovieDataService } from './services/get-movie-data.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {  forkJoin } from 'rxjs';

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

  public toggleSideBar() {
    this.toggleNav = !this.toggleNav;
  }
  public open(content,movie) {
    let movieDetail = this.movieDataService.getMoveiDetails(movie.id);
    let creditDetail = this.movieDataService.getMoveiCredits(movie.id);
    let videoDetails = this.movieDataService.getMoveiVideos(movie.id);
    const combinedData = forkJoin(movieDetail, creditDetail, videoDetails); 
    combinedData.subscribe(
      response => {
        this.movie =  response[0];
        this.movie.cast = response[1];
        this.movie.cast = response[1].cast.filter(cast => {
          return cast.profile_path !=null;
        })
        this.movie.videos = response[2].results.map(video => {return {id: video.key,name:video.name}});
        this.movie.genres = this.movie.genres.map(gen => {return gen.name});
        this.movie.backdrop_path = 'https://images.tmdb.org/t/p/w300'+this.movie.backdrop_path;
        this.modalService.dismissAll();
        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
        }, (reason) => {
        });
      }
    );
    
  }

  public getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  public pageChanged(numb: number) {
    this.movieDataService.getPopularMovies(numb).subscribe(
      response => {
        this.pages = response.total_pages; 
        this.movieData =  response.results.map(result => {
          result.poster_path = 'https://images.tmdb.org/t/p/w200'+result.poster_path;
          return result;
        });
      }
    );
  }

  public searchValue(value: any){
    this.pages = value.total_pages;
    this.movieData =  value.results.map(result => {
      result.poster_path = 'https://images.tmdb.org/t/p/w200'+result.poster_path;
      return result;
    });
  }
}
