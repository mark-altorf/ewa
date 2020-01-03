import {Component, OnInit, ViewChild} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @ViewChild('f', { static: true }) form: NgForm;
  user = {
    username: '',
    email: '',
    password: ''
  };

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }


  /**
   * Parses data from register.component.html on submit to form
   * Sends form data in JSON form to REST API
   * TODO: add validation
   */
  onRegister(form: NgForm) {
    this.user.username = this.form.value.username;
    this.user.email = this.form.value.email;
    this.user.password = this.form.value.password;

    this.http.post('http://localhost:8080/aquadine-jee/resources/user', {
      email: this.user.email,
      username: this.user.username,
      password: this.user.password})
      .subscribe( // subscribe to observable http.post
        res => {
          console.log(res); // log results otherwise log error
        },
        err => {
          console.log(this.user.username)
          console.log('Error occured');
        }
    );
  }
}

