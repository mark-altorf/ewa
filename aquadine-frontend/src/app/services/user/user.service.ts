import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from './IUser';
import * as moment from "moment";
import { Router } from '@angular/router';
import {HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _url : string = "http://localhost:8080/aquadine-jee/resources/user/"
  private _urlLogin : string = "http://localhost:8080/aquadine-jee/resources/user/login?"

  constructor(private http: HttpClient, public router: Router) { }

  getUser(email: string): Observable<IUser[]>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded'
      })};

    return this.http.get<IUser[]>(this._url + "u/" + email);
  }

  getUsers(): Observable<IUser[]>{
      return this.http.get<IUser[]>(this._url);
  }

  /**
   * Takes user input and sends it to REST API for checking
   * @param email user email
   * @param password user password
   */
  login(email:string, password:string ) {
    const body = new HttpParams()
    .set('email', email)
    .set('password', password);

  return this.http.post('http://localhost:8080/aquadine-jee/resources/user/login',
    body.toString(),
    {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
    }
  ).subscribe( 
    res => {
      console.log(res); 
      this.router.navigate(['/overview']);
      this.setSession(res); 
      
    },
    err => {
      console.log("An Error has occured!");
    });
  
  }
  
  /**
   * Stores the JWT recieved from the server
   * @param authResult the JWT 
   */    
  private setSession(authResult) {
    const expiresAt = moment().add(authResult.expiresIn,'second');

    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
  }          

    /**
   * Stores the JWT recieved from the server
   * @param authResult the JWT 
   */    
    public getToken() {
      return localStorage.getItem("id_token");
    }  
  /**
   * Removes JWT data from local storage on logout
   */
  logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
  }

  /**
   * Checks if the current time is within the expiration limit of the current JWT
   */
  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  /**
   * Gets expiration data of the current JWT
   */
  getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }    



}
