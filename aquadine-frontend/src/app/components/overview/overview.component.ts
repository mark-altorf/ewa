import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-restaurant',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  // placeholder for invites array
  haveInvites = false;
  
  // START TESTING BLOCK
  // TODO: replace when server functions
  newInvite = {
    id: '1',
    name: 'McDonalds',
    organizer: 'John Doe',
    location: 'Bijlmerplein 368, Amsterdam'
  }

  invites: any[] = []; // array to hold data to transfer to invitelist comp
  // END TESTING BLOCK

  constructor(private http: HttpClient) { }

  ngOnInit() {
    
  }

  loadInvites(){
    this.invites.push(this.newInvite);
    this.haveInvites = true;
  }

  // removes a child invitelist from the invitelist stack
  killChild(){
    this.invites.pop();
  }

  // accepts a child invitelist from the invitelist stack
  acceptChild(){
    this.invites.pop();
    // TODO: make dynamic
  }
}
