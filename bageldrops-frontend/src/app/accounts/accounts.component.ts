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
  pastCarts = [];
  editName = false;
  editNameForm = new FormGroup({
    firstName: new FormControl("", [Validators.required]),
    lastName: new FormControl("", [Validators.required])
  });
  submitted = false;

  constructor(public authenticationService: AuthenticationService, public apiService: ApiService) {
    this.apiService.get('carts').subscribe((carts) => {
      for (let x in carts) {
        if (carts[x].cart_state === 'COMPLETED'){
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
