import { TestBed } from '@angular/core/testing';

import { GetMovieDataService } from './get-movie-data.service';

describe('GetMovieDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetMovieDataService = TestBed.get(GetMovieDataService);
    expect(service).toBeTruthy();
  });
});
