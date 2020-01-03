import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { EnvironmentService } from '../../services/environment/environment.service';

@Component({
  selector: 'app-input',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('f', { static: true }) form: NgForm;
  user = {
    email: '',
    password: ''
  };

  constructor(private http: HttpClient, public router: Router, private _userService: UserService, private _environmentService: EnvironmentService) { }

  ngOnInit() { }

  /**
   * Takes form data and sends it to user service
   * TODO: Catch the bearer token!
   */
  onLogin(form: NgForm) {
    localStorage.clear(); // clears old jwt if not expired
    
    this.user.email = this.form.value.email;
    this.user.password = this.form.value.password;
    this._userService.login(this.user.email, this.user.password);
    this._environmentService.setUserData(this.user.email);
  }
}
