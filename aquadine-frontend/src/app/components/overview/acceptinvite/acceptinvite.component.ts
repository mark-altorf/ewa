import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-acceptinvite',
  templateUrl: './acceptinvite.component.html',
  styleUrls: ['./acceptinvite.component.css']
})
export class AcceptinviteComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }

  onPickFood(){
    this.router.navigate(['/overview']);
  }

}
