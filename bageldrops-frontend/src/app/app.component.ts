import { Component } from '@angular/core';
import { AuthenticationService } from './_services';
import { FormGroup, FormControl } from '@angular/forms';
import { ApiService } from './_services/api.service';
import { CartService } from './_services/cart.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    searchForm = new FormGroup({
        search: new FormControl('')
    });

    constructor(public authenticationService: AuthenticationService, public apiService: ApiService, private cartService: CartService) { }

    logout() {
        this.authenticationService.logout();
    }

    onSubmit() { //Search
        console.log(this.searchForm.value.search);
        console.log(this.apiService.get(this.searchForm.value.search));
    }
}
