import {Component, EventEmitter, OnInit, Output, Input} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from '@angular/common/http';
import {DomSanitizer} from '@angular/platform-browser';

// for testing!
// TODO: remove

import { UserService } from 'src/app/services/user/user.service';
import { EnvironmentService } from 'src/app/services/environment/environment.service';

@Component({
  selector: 'app-invite',
  templateUrl: './invitelist.component.html',
  styleUrls: ['./invitelist.component.css']
})
export class InvitelistComponent implements OnInit {
  @Output() killInviteEmit: EventEmitter<any> = new EventEmitter();
  @Output() acceptInviteEmit: EventEmitter<any> = new EventEmitter();

  public name : String;
  public organizerName : String;


  constructor(private router: Router, private _http: HttpClient, private _sanitizer: DomSanitizer, private _environmentService: EnvironmentService) { }

  /**
   * Used to hold data from REST API
   * TODO: implement actual calls to REST API
   */
  @Input() invites: any[];
  status: String = "";
  ngOnInit() {
    this.status = "OPEN";
  //  this._http.get('http://localhost:8080/aquadine-jee/resources/invites')
  //   .subscribe(data => {
  //          this.name = this._sanitizer.bypassSecurityTrustHtml(data.name);
  //          this.organizerName = this._sanitizer.bypassSecurityTrustHtml(data.organizerName);
  //          console.log(data);
  //  });
   
  }

  // btnClick= function () {
  //   this.router.navigateByUrl('/sendinvite');
  // };


  killInvite(){
    console.log(this._environmentService.getUserData())
    this.killInviteEmit.emit()
  }

  acceptInvite(){
    this.acceptInviteEmit.emit()
    this.status = "ACCEPTED";
  }



}


