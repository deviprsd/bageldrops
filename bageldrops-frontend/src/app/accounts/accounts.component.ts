import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';
import { ApiService } from '../_services/api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpHeaders, HttpClient } from '@angular/common/http';
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
    firstName: new FormControl("", [Validators.required]),
    lastName: new FormControl("", [Validators.required])
  });
  submitted = false;

  public options = new HttpHeaders({
    'Content-Type': 'application/json'
  }); 

  constructor(public authenticationService: AuthenticationService, public apiService: ApiService, public http: HttpClient) {
    this.apiService.get('carts').subscribe((carts) => {
      for (let x in carts) {
        if (carts[x].cart_state === 'COMPLETED') {
          this.pastCarts[this.pastCarts.length] = carts[x];
        }
        //console.log(carts[x]);
      }
    })
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
    console.log(this.editNameForm.value.firstName);
    this.apiService.get('customers').subscribe((customers) => {
      for (let x in customers) {
        console.log(user);
        console.log(customers[x])
        if (user.customer_id === customers[x].user) {

        }
      }
    });
    
    // this.http.patch<any>('localhost:8000/api/v1/customers/1', {user: 1}).subscribe((data) => {
    //   console.log(data);
    // });
    this.apiService.get('customers').subscribe((customers) => {
      for (let j in customers){
        if (customers[j].user === 2){
          var tempcustomer = customers[j];
          tempcustomer.carts = 12738614;
          console.log(tempcustomer);

          this.apiService.patch('customers', tempcustomer.user - 1, tempcustomer).subscribe((data) => {
            console.log(data);
          });
        }
      }
    });
    
    //this.apiService.patch('customers', 2, { first_name: `${this.editNameForm.value.firstName}`, last_name: `${this.editNameForm.value.lastName}` }).subscribe((data) => {
    //console.log(data);
    //});
  }

  products() {

  }

}
