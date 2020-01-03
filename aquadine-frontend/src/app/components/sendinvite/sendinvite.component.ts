
import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-organize',
  templateUrl: './sendinvite.component.html',
  styleUrls: ['./sendinvite.component.css']
})
export class SendinviteComponent implements OnInit {

  // public codeValue: string;

  // List of restaurants
  codeList = [
    { name: 'Mcdonalds', address: 'Kalverstraat 5' },
    { name: 'Kentucky Fried Chicken', address: 'Kalverstraat 4' },
    { name: 'Burger King', address: 'Kalverstraat 3' },
    { name: 'Dominos pizza', address: 'Kalverstraat 2' },
    { name: 'New York Pizza', address: 'Kalverstraat 1' }
  ];

// Assign empty value to id, name and address
  @ViewChild('f', { static: true }) form: NgForm;


  restaurant = {
    name: ' ',
    address: ' '
  };

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: 'my-auth-token'
    })
  };


  constructor(private http: HttpClient) {
  }

  ngOnInit() {
  }

// Method to post data to backend
  public saveCode(e): void {
    const name = e.target.value;
    const list = this.codeList.filter(x => x.name === name)[0];


    this.restaurant.name = list.name;
    this.restaurant.address = list.address;

    console.log(list.name);
    console.log(list.address);


// Additional information to the server content type
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
// Making an array with the values of the restaurant
    const data = {
      name: list.name,
      address: list.address
    };

    console.log(data);

// POST method
    this.http.post('http://localhost:8080/aquadine-jee/resources/restaurant',
      JSON.parse(JSON.stringify(data)) , httpOptions)

    // wait till it gets posted to the backend
      .subscribe( // subscribe to observable http.post
        res => {
          console.log("response" + " " + res); // log results otherwise log error
        },
        err => {
          console.log('Error occured');
        }
      );
  }



  // onOrganize(e): void {
  //   //   let name = e.target.value;
  //   //   let list = this.codeList.filter(x => x.name === name)[0];
  //   //
  //   //   /**
  //   //    * I temporarily casted the list.restaurantId to a string so the code would run
  //   //    * TODO: see if this is a fix
  //   //    */
  //   //   this.restaurant.restaurantId = String(list.restaurantId);
  //   //   this.restaurant.name = list.name;
  //   //
  //   //   const httpOptions = {
  //   //     headers: new HttpHeaders({
  //   //       'Content-Type': 'application/json'
  //   //     })
  //   //   };
  //   //
  //   //   const data = {
  //   //     id: list.restaurantId,
  //   //     name: list.name
  //   //   };
  //   //
  //   //
  //   // }
}


