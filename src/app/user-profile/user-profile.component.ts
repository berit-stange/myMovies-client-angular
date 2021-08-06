// src/app/user-login-form/user-login-form.component.ts
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UserUpdateFormComponent } from '../user-update-form/user-update-form.component';

// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// This import brings in the API calls we created in 6.2
import { FetchApiDataService } from '../fetch-api-data.service';

// This import is used to display notifications back to the user
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})


export class UserProfileComponent implements OnInit {
  //@ = decorator that defines the component’s input
  //user Data object will be passed to the API call in the registerUser function
  @Input() userData = {
    Username: '',
    Password: '',
    Email: '',
    Birthday: ''
  };

  user: any = {};
  movies: any = [];
  FavoriteMovies: any = {};

  constructor(
    public fetchApiData: FetchApiDataService,
    // public dialogRef: MatDialogRef<UserProfileComponent>,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    const user = localStorage.getItem('user');
    // const FavoriteMovies = localStorage.getItem('FavoriteMovies');
    this.fetchApiData.getUser(user).subscribe((res: any) => {
      this.user = res;
      // this.getMovies();
    });
  }

  openUserUpdateDialog(): void {
    this.dialog.open(UserUpdateFormComponent, {
      // Assigning the dialog a width
      width: '280px'
    });
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((res: any) => {
      this.movies = res;
      // this.filterFavorites();
    });
  }

  getFavoriteMovies(): void {
    // const user = localStorage.getItem('user');
    const FavoriteMovies = localStorage.getItem('FavoriteMovies');
    this.fetchApiData.getUser(FavoriteMovies).subscribe((res: any) => {
      this.FavoriteMovies = res;
      // this.getMovies();
    });
  }

  // filterFavorites(): void {
  //   this.movies.forEach((movie: any) => {
  //     if (this.user.FavoriteMovies.includes(movie._id)) {
  //       this.favorites.push(movie);
  //     }
  //   });
  //   return this.favorites;
  // }

}


