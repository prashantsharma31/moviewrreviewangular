import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {

  private usernameSource = new BehaviorSubject<any>({});
  username = this.usernameSource.asObservable()
  
  constructor() { }
  
  changeMovies(movie: any) {
    this.usernameSource.next(movie);
  }
}
