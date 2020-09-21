import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';
@Injectable({
  providedIn: 'root'
})
export class GetMovieDataService {

  constructor(private httpService: HttpService) { }

  public getPopularMovies(page: number): Observable<any> {
    return this.httpService.get('https://api.themoviedb.org/3/movie/popular'
    ,{api_key: '6ffebee4e344a23602dd3c512eaa89f2',language: 'en-US', page: page});
  }

  public getMoveiDetails(id: number): Observable<any> {
    return this.httpService.get('https://api.themoviedb.org/3/movie/'+id
    ,{api_key: '6ffebee4e344a23602dd3c512eaa89f2',language: 'en-US'});
  }

  public getMoveiCredits(id: number): Observable<any> {
    return this.httpService.get('https://api.themoviedb.org/3/movie/'+id+'/credits'
    ,{api_key: '6ffebee4e344a23602dd3c512eaa89f2',language: 'en-US'});
  }

  public getMoveiVideos(id: number): Observable<any> {
    return this.httpService.get('https://api.themoviedb.org/3/movie/'+id+'/videos'
    ,{api_key: '6ffebee4e344a23602dd3c512eaa89f2',language: 'en-US'});
  }

  public getSearchedMovies(query: string): Observable<any> {
    return this.httpService.get('https://api.themoviedb.org/3/search/movie/'
    ,{api_key: '6ffebee4e344a23602dd3c512eaa89f2',language: 'en-US',query: query});
  }
}
