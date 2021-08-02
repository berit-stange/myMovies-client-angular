// src/app/user-login-form/user-login-form.component.ts
import { Component, OnInit, Input } from '@angular/core';

// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// This import brings in the API calls we created in 6.2
import { UserLoginService } from '../fetch-api-data.service';

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({ //@ = decorator to tell Angular that the class right below is a component
  //selector defines the custom HTML element, into which this component will render
  selector: 'app-user-login-form',
  //instructions for wiring up the class with its stylesheet and template file
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {

  @Input() userData = {
    //@ = decorator that defines the component’s input
    //user Data object will be passed to the API call in the loginUser function
    Username: '',
    Password: ''
  };

  constructor(
    public fetchApiData: UserLoginService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }


  // This is the function responsible for sending the form inputs to the backend
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe((result) => {
      // Logic for a successful user login goes here! (To be implemented)
      this.dialogRef.close(); // This will close the modal on success!
      console.log(result);
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    }, (result) => {
      console.log(result);
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    });
  }
}
