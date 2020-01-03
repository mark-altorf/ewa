import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {NgForm} from "@angular/forms";
import {UserService} from "../../../services/user/user.service";
import {Router} from "@angular/router";
import {validate} from "codelyzer/walkerFactory/walkerFn";
import {JsonPipe} from "@angular/common";




@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  //Form visible
  isVisible = false;

  settings = {
    username: '',
    email: '',
    // password: ''
  };

  constructor(private http: HttpClient, private _userService: UserService, private router: Router) {
  }

  baseUrl = 'http://localhost:8080/aquadine-jee/resources/user';

  ngOnInit() {
    //Get data from baseUrl(variable above url to the backend)
    this.http.get(this.baseUrl)
      .subscribe(
        val => {
          const usernameField = val;
          // @ts-ignore
          const usernameNaam = JSON.stringify(usernameField[usernameField.length - 1].username);
          console.log(usernameField);
          console.log(usernameField[0].username);
          this.settings.username = usernameNaam.slice(1, usernameNaam.length - 1);
        }
      );

    this.http.get(this.baseUrl)
      .subscribe(
        val => {
          const emailField = val;
          // @ts-ignore
          const emailNaam = JSON.stringify(emailField[emailField.length - 1].email);
          console.log(emailField);
          console.log(emailNaam);
          this.settings.email = emailNaam.slice(1, emailNaam.length - 1);
        }
      );

//     this.http.get(this.baseUrl)
//       .subscribe(
//         val => {
//           const passwordField = val;
//           // @ts-ignore
//           const passwordNaam = JSON.stringify(passwordField[passwordField.length - 1].password);
//           console.log(passwordField);
//           console.log(passwordNaam);
//           this.settings.password = passwordNaam;
//           this.settings.password = passwordNaam.slice(1, passwordNaam.length - 1);
//         }
//       );
//
//     const togglePassword = document.getElementById('togglePassword');
//     const showOrHidePassword = () => {
//     const password: HTMLInputElement = document.getElementById('password') as HTMLInputElement;
//     if (password.type === 'password') {
//     password.type = 'text';
//     } else {
//     password.type = 'password';
//       }
//     };
// togglePassword.addEventListener('change', showOrHidePassword);
//   }


    // updateUser() {
    //   const httpOptions = {
    //     headers: new HttpHeaders({
    //       'Content-Type':  'application/json'
    //     })
    //   };
    //
    //
    //   const username = (<HTMLInputElement>document.getElementById('username')).value;
    //   this.settings.username = username;
    //   console.log(this.settings.username + " hallookeogektoe");
    //
    //   const data = {
    //     username: this.settings.username
    // };
    //
    //   const myJsonstring = JSON.stringify(data);
    //   this.http.put(this.baseUrl, JSON.parse(myJsonstring.valueOf()), httpOptions)
    //     .subscribe(
    //       val => {
    //         console.log(data + " test23");
    //           this.router.navigate(['/overview']);
    //         }
    //     );
    //   console.log(username);
    // }
  }
}
