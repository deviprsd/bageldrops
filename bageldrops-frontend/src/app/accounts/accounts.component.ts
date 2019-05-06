import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';
import { ApiService } from '../_services/api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
// { userInfo } from 'os';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {
  editName = false;
  editNameForm = new FormGroup({
    firstName: new FormControl("", [Validators.required]),
    lastName: new FormControl("", [Validators.required])
  });
  submitted = false;

  constructor(public authenticationService: AuthenticationService, public apiService: ApiService) {

  }

  //User must be able to edit their profile
  //Just going to be able to edit their name
  ngOnInit() {
  }

  onSubmit() {
    this.submitted = true;

    if (!this.editNameForm.valid) {
        return;
    }

    this.apiService.post('customers', {}).subscribe((data) => {
      console.log(data)
    });
  }

  products() {

  }

}
