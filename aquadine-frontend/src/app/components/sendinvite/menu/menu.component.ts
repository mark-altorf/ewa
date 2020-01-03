import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {NgForm} from '@angular/forms';
import {empty, Observable} from 'rxjs';
import {any} from 'codelyzer/util/function';
import {map} from 'rxjs/operators';

// import {cpus} from "os";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  public codeValue: string;

// Empty array of menu list
  codeList = [];

  // List of Mcdonalds menu
  codeListMcd = [
    {menuid: 1, name: 'Hamburger menu', price: 3.50},
    {menuid: 2, name: 'Big mac menu', price: 5.50},
    {menuid: 3, name: 'Quarter Pounder menu', price: 5.50},
    {menuid: 4, name: 'Maestro burger menu', price: 6.50},
    {menuid: 5, name: 'Big Tasty menu', price: 6.50}
  ];

  // List of Kentucky Fried chicken menu
  codeListKfc = [
    {menuid: 1, name: 'Chicken burger menu', price: 3.50},
    {menuid: 2, name: 'Chicken bucket menu', price: 5.50},
    {menuid: 3, name: 'Spicy chicken menu', price: 5.50},
    {menuid: 4, name: 'Tender chicken menu', price: 6.50},
    {menuid: 5, name: 'Chicken nuggets menu', price: 6.50}
  ];

  // List of Burger King menu
  codeListBk = [
    {menuid: 1, name: 'Whopper burger menu', price: 3.50},
    {menuid: 2, name: 'Texas Bacon king menu', price: 5.50},
    {menuid: 3, name: 'Double Steakhouse menu', price: 5.50},
    {menuid: 4, name: 'Chili Cheese burger menu', price: 6.50},
    {menuid: 5, name: 'Chicken Tendercrisp menu', price: 6.50}
  ];

  // List of Dominos pizza menu
  codeListDp = [
    {menuid: 1, name: 'Pizza Shoarma menu', price: 3.50},
    {menuid: 2, name: 'Pizza Roasted veggie menu', price: 5.50},
    {menuid: 3, name: 'Pizza Bbq mixed grill menu', price: 5.50},
    {menuid: 4, name: 'Pizza Hawaii menu', price: 6.50},
    {menuid: 5, name: 'Pizza Americana menu', price: 6.50}
  ];

  // List of New York pizza menu
  codeListNyp = [
    {menuid: 1, name: 'Pizza Double Tasty menu', price: 3.50},
    {menuid: 2, name: 'Pizza Mixed Grill menu', price: 5.50},
    {menuid: 3, name: 'Pizza Margherita menu', price: 5.50},
    {menuid: 4, name: 'Pizza BBQ Meatlovers', price: 6.50},
    {menuid: 5, name: 'Pizza Downtown Doner menu', price: 6.50}
  ];


  @ViewChild('f', {static: true}) form: NgForm;

  menu = {
    menuid: ' ',
    name: ' ',
    price: ' '
  };



  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'my-auth-token'
    })
  };


  constructor(private http: HttpClient) {
  }

  // Get the selected restaurant and fill the datalist with data
  ngOnInit() {
    this.http.get('http://localhost:8080/aquadine-jee/resources/restaurant')
      .subscribe(
        val => {
          const restStr = val;
          console.log(restStr);
          console.log(restStr[0].restaurantName);
          // @ts-ignore
          const restNaam = JSON.stringify(restStr[restStr.length - 1].restaurantName);
          console.log(restNaam);
          if (restNaam.toString() === '"Mcdonalds"') {

            this.codeList = this.codeListMcd;

          } else if (restNaam.toString() === '"Kentucky Fried Chicken"') {
            this.codeList = this.codeListKfc;
          } else if (restNaam.toString() === '"Burger King"') {
            this.codeList = this.codeListBk;
          } else if (restNaam.toString() === '"Dominos pizza"') {
            this.codeList = this.codeListDp;
          } else if (restNaam.toString() === '"New York Pizza"') {
            this.codeList = this.codeListNyp;
          }
        }
      );


  }

// Method to POST the menu data to the backend
  public saveMenu(e): void {

    const name = e.target.value;
    const list = this.codeList.filter(x => x.name === name)[0];

    this.menu.menuid = list.menuid.toString();
    this.menu.name = list.name;
    this.menu.price = list.price.toString();
    //
    // console.log(list.menuid);
    // console.log(list.name);
    // console.log(list.price);


    // HttpHeader to give the content type
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

// Array with data assigned to a const
    const data = {
      menuid: list.menuid.toString(),
      name: list.name,
      price: list.price.toString()
    };



    console.log(data)
    const myJsonString = JSON.stringify(data);
    console.log(myJsonString.valueOf());
    console.log(JSON.stringify(data) + 'test1234568910');

    // this.http.post('http://localhost:8080/aquadine-jee/resources/menu', JSON.parse(JSON.stringify(data)), httpOptions)
    this.http.post('http://localhost:8080/aquadine-jee/resources/menu', JSON.parse(myJsonString.valueOf()), httpOptions)
      .subscribe( // subscribe to observable http.post
        res => {
          console.log('response' + ' ' + res); // log results otherwise log error
        },
        err => {
          console.log('Error occured');
        }
      );


    // console.log(data);
    //
    // this.http.get('http://localhost:8080/aquadine-jee/resources/menu').subscribe(responseData => console.log(responseData));
    //
    // const printTest = (this.http.get('http://localhost:8080/aquadine-jee/resources/menu'));
    // printTest.subscribe(data => console.log(data));

    // console.log(data);
    //
    // this.http.post('http://localhost:8080/aquadine-jee/resources/menu', data, httpOptions)
    //
    //   .subscribe( // subscribe to observable http.post
    //     res => {
    //       console.log(res); // log results otherwise log error
    //     },
    //     err => {
    //       console.log('Error occured');
    //     });



    // const obj = data;
    //
    // const mapped = Object.keys(obj).map(key => ({type: key, value: obj[key]}));


    // this.http.post('http://localhost:8080/aquadine-jee/resources/restaurant', mapped, httpOptions)
    // this.http.post('http://localhost:8080/aquadine-jee/resources/menu',
    //   JSON.parse(JSON.stringify(mapped)) , httpOptions);

  }
}




