import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';
import { ApiService } from '../_services/api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { config } from '../_models/config';
import { Product } from '../_models/product';
// { userInfo } from 'os';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {
  completedCarts = [];
  editName = false;
  editNameForm = new FormGroup({ 
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required])
  });
  submitted = false;

  public options = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(
    public authenticationService: AuthenticationService,
    public apiService: ApiService,
    public http: HttpClient
  ) {}

  ngOnInit() {
    this.getCompletedCarts(); //Pulls the user's completed checkouts
  }

  onSubmit() {
    const user = this.authenticationService.currentUserValue;
    this.submitted = true;

    if (!this.editNameForm.valid) {
      return;
    }

    this.apiService.patch( //Submits new user values
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

  getCompletedCarts(){
    const user = this.authenticationService.currentUserValue;
    this.apiService.get('carts').subscribe((carts) => {
      for (let x in carts) {
        if (carts[x].customer === user.customer_id && carts[x].cart_state === 'COMPLETED'){ //Cart is completed, so it will be displayed
          const quantities = JSON.parse(carts[x].quantities)
          for (let i in carts[x].products) {
            carts[x].prod = []
            this.apiService.getFromId('products', carts[x].products[i]).subscribe((product) => {
                const p = new Product();
                p.prod = product;
                p.amount = quantities[p.prod.id];
                carts[x].prod.push(p);
            });
          }
          this.completedCarts.push(carts[x]);
        }
      }
      console.log(this.completedCarts);
    })
  }

}
