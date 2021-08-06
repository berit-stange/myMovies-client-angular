import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  //declare viarable as an array > movies from API
  movies: any[] = [];
  constructor(public fetchApiData: FetchApiDataService) { }

  ngOnInit(): void {
    //calling the f. in the lifecycle hook
    //ngOnInit is called, when Angular is done creating the component (= componentDidMount?)
    this.getMovies();
  }

  //fetch the movies from API
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

}
