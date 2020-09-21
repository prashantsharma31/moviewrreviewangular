import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(protected http: HttpClient) { }

  public get(url: string, params: any) : Observable<any> {
    return this.http.get(url, { params: params}); 
  }
}
