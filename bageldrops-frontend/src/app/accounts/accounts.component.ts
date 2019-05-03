import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';
import { ApiService } from '../_services/api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { userInfo } from 'os';

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

  constructor(public authenticationService: AuthenticationService, public apiService: ApiService) {

  }

  //User must be able to edit their profile
  //Just going to be able to edit their name
  ngOnInit() {
  }

  onSubmit() {
    //console.log(this.editNameForm.value.firstName + " " + this.editNameForm.value.lastName);
    //this.apiService.post() implement posting new name values
    const user = this.authenticationService.currentUserValue;
    user.firstName = this.editNameForm.value.firstName;
    user.lastName = this.editNameForm.value.lastName;
    console.log(user);
    this.authenticationService.updateName(this.editNameForm.value.firstName, this.editNameForm.value.lastName);
    //this.authenticationService.currentUser.firstName = this.editNameForm.value.firstName;
    //this.apiService.put(editNameForm.firstName).subscribe(())
  }

  products() {

  }

}
