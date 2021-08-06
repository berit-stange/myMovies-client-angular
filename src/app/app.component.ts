import { Component } from '@angular/core';

// import { MatDialog } from '@angular/material/dialog';
// import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
// import { UserLoginFormComponent } from './user-login-form/user-login-form.component';
// > is now in WelcomePage! 
// import { MovieCardComponent } from './movie-card/movie-card.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'myMovies-client-angular';

  // constructor(public dialog: MatDialog) { }
  // openMoviesDialog(): void {
  //   this.dialog.open(MovieCardComponent, {
  //     width: '500px'
  //   });
  // }
  // > is now displayed through MovieCardComponent on login

}
