import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';
import { ApiService } from '../_services/api.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {

  constructor(public authenticationService: AuthenticationService) { 

  }

  //User must be able to edit their profile
  //Just going to be able to edit their name
  ngOnInit() {
  }

  products() {
    
  }

}
