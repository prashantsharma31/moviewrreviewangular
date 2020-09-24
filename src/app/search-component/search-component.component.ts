import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {  debounceTime, distinctUntilChanged, switchMap, switchMapTo } from 'rxjs/operators';
import {  FormControl } from '@angular/forms';
import { GetMovieDataService } from '../services/get-movie-data.service';
import { pipe } from 'rxjs';
@Component({
  selector: 'app-search-component',
  templateUrl: './search-component.component.html',
  styleUrls: ['./search-component.component.scss']
})
export class SearchComponentComponent implements OnInit {
  search = new FormControl('');
  @Output() newItemEvent = new EventEmitter<any>();
  prevValue: string = '';
  constructor(private http: GetMovieDataService) { }

  ngOnInit(): void {
  }
  applyFilter(filterValue) {
    this.search.valueChanges.pipe(debounceTime(500),distinctUntilChanged(),
    switchMap(
      (value) => {
          if(this.prevValue != value){
            this.prevValue = value;
            this.newItemEvent.emit(value);
          }
        return value; 
      }
    )).subscribe(val => {});
  }
}
