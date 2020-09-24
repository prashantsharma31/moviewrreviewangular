import { Component } from '@angular/core';
import { GetMovieDataService } from '../../services/get-movie-data.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {  forkJoin } from 'rxjs';
import { ModalComponent } from '../../modal/modal.component';
import { DataSharingService } from '../../services/data-sharing.service';

@Component({
  selector: 'app-top-movies',
  templateUrl: './top-movies.component.html',
  styleUrls: ['./top-movies.component.scss']
})
export class TopMoviesComponent {

  movieData: any = [];
  movie: any;
  page: number = 1;
  pages: number;
  cast: any[] =[];
  toggleNav: boolean = false;
  constructor(private movieDataService: GetMovieDataService,private modalService: NgbModal, public appService: DataSharingService){
    this.movieDataService.getTopRatedMovies(this.page).subscribe(
      response => {
        this.pages = response.total_pages; 
        this.movieData =  response.results.map(result => {
          result.poster_path = 'https://images.tmdb.org/t/p/w200'+result.poster_path;
          return result;
        });
      }
    );

    this.appService.username.subscribe(msg => {
      if(msg){
        this.movieData = msg
        } 
      });
  }

  public open(movie) {
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
        const useRef = this.modalService.open(ModalComponent, {ariaLabelledBy: 'modal-basic-title'});
        useRef.componentInstance.movie = this.movie; 
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


}
