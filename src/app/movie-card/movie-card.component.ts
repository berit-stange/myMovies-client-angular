import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';

import { MatDialog } from '@angular/material/dialog';

import { MovieViewComponent } from '../movie-view/movie-view.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {

  //declare viarable as an array > movies from API
  movies: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog
  ) { }

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

  //
  openMovieViewDialog(details: string): void {
    this.dialog.open(MovieViewComponent, {
      data: { details },
    });
  }

  // openUserUpdateDialog(): void {
  //   this.dialog.open(UserUpdateFormComponent, {
  //     // Assigning the dialog a width
  //     width: '280px'
  //   });
  // }

}
