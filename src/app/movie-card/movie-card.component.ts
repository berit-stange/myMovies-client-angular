import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  FavoriteMovies: any = {};

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    //calling the f. in the lifecycle hook
    //ngOnInit is called, when Angular is done creating the component (= componentDidMount?)
    this.getMovies();
    this.getFavorites();
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
  openDirectorViewDialog(name: string, bio: string, image: string): void {
    this.dialog.open(DirectorViewComponent, {
      data: { name, bio, image },
    });
  }


  getFavorites(): void {
    const user = localStorage.getItem('user');
    this.fetchApiData.getUser(user).subscribe((resp: any) => {
      this.FavoriteMovies = resp.FavoriteMovies;
    });
  }

  addToFavorites(movieId: string): any {
    // const FavoriteMovies = localStorage.getItem('FavoriteMovies');
    this.fetchApiData.addFavorite(movieId).subscribe((resp: any) => {
      this.snackBar.open('Added to favorites!', 'OK', {
        duration: 2000,
      });
      console.log(this.FavoriteMovies);
      // this.FavoriteMovies = resp.FavoriteMovies;
    });
    return this.FavoriteMovies.push(movieId);
  }


  isFavorite(movieID: string) {
    return this.FavoriteMovies.includes(movieID);
  }

  // addToFavorites(movieId: string): any {
  //   if (this.isFavorite(movieId)) {
  //     this.fetchApiData.removeFavorite(movieId).subscribe((resp: any) => {
  //       this.snackBar.open('Removed from favorites!', 'OK', {
  //         duration: 2000,
  //       });
  //     });
  //     const index = this.FavoriteMovies.indexOf(movieId);
  //     return this.FavoriteMovies.splice(index, 1);
  //   } else {
  //     console.log('1 - before add', this.FavoriteMovies);
  //     this.fetchApiData.addFavorite(movieId).subscribe((response: any) => {
  //       this.snackBar.open('Added to favorites!', 'OK', {
  //         duration: 2000,
  //       });
  //       console.log('2 - after add', this.FavoriteMovies);
  //     });
  //   }
  //   console.log('3 - after all', this.FavoriteMovies);
  //   return this.FavoriteMovies.push(movieId);
  // }



}
