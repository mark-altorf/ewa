import { Injectable } from '@angular/core';

/**
 * Used to track the current user environment
 */
@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {
  private email : String;
  
  
  constructor() { }


  ngOnInit() { 
  }

  /**
   * Sets the user email 
   * @param email current user email
   */
  setUserData(email: string){
    this.email = email;
  }
  
  /**
   * Acts as a global variable for accessing the current users email
   * Can be used to send queries using HTTP for example
   */
  getUserData(){
    return this.email;
  }
}
