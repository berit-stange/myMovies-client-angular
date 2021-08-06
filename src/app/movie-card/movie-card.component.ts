import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';

import { MatDialog } from '@angular/material/dialog';

import { MovieViewComponent } from '../movie-view/movie-view.component';
import { GenreViewComponent } from '../genre-view/genre-view.component';
import { DirectorViewComponent } from '../director-view/director-view.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {

  //declare viarable as an array > movies from API
  movies: any[] = [];
  favoriteMovieIds: any[] = [];


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

  //open movie details
  openMovieViewDialog(details: string): void {
    this.dialog.open(MovieViewComponent, {
      data: { details },
    });
  }

  //open movie details
  openGenreViewDialog(name: string, description: string): void {
    this.dialog.open(GenreViewComponent, {
      data: { name, description },
    });
  }

  //open movie details
  openDirectorViewDialog(name: string, bio: string): void {
    this.dialog.open(DirectorViewComponent, {
      data: { name, bio },
    });
  }

  isFavoured(movieID: string): boolean {
    return this.favoriteMovieIds.includes(movieID);
  };

  favedMovies(): void {
    const user = localStorage.getItem('user');
    this.fetchApiData.getUser(user).subscribe((resp: any) => {
      this.favoriteMovieIds = resp.movieFav;
    });
  }

}
