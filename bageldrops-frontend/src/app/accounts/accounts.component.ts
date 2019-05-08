import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';
import { ApiService } from '../_services/api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { config } from '../_models/config';
// { userInfo } from 'os';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {
  pastCarts = [];
  editName = false;
  editNameForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required])
  });
  submitted = false;
  billingInfo: any;
  billingAddress: any;
  shippingAddress: any;

  public options = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(public authenticationService: AuthenticationService, public apiService: ApiService, public http: HttpClient) {
    this.http.get<any>(`${config.api}/billing/${this.authenticationService.currentUserValue.customer_id}/`).subscribe((billing) => {
      this.billingInfo = billing;
      this.http.get<any>(`${config.api}/addresses/${this.billingInfo.billing_address}`).subscribe((billingAddress) => {
        this.billingAddress = billingAddress;
      });
      this.http.get<any>(`${config.api}/addresses/${this.billingInfo.delivery_address}`).subscribe((shippingAddress) => {
        this.shippingAddress = shippingAddress;
      });

    });
    
  }

  //User must be able to edit their profile
  //Just going to be able to edit their name
  ngOnInit() {
  }

  onSubmit() {
    const user = this.authenticationService.currentUserValue;
    this.submitted = true;

    if (!this.editNameForm.valid) {
      return;
    }

    this.apiService.patch(
      'customers',
      user.customer_id,
      {
        first_name: `${this.editNameForm.value.firstName}`,
        last_name: `${this.editNameForm.value.lastName}`,
        email: `${this.editNameForm.value.email}`
      }).subscribe((data) => {
        this.authenticationService.currentUserValue.firstName = this.editNameForm.value.firstName;
        this.authenticationService.currentUserValue.lastName = this.editNameForm.value.lastName;
        this.authenticationService.currentUserValue.email = this.editNameForm.value.email;
      });
  }

  products() {

  }

}
