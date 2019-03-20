import { Component } from '@angular/core';
import { AuthenticationService } from './_services';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    searchForm = new FormGroup({
        search: new FormControl('')
    });

    constructor(private authenticationService: AuthenticationService) { }

    logout() {
        this.authenticationService.logout();
    }
}
