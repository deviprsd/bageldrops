import { Component } from '@angular/core';
import { AuthenticationService } from './_services';
import { first } from 'rxjs/operators';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    constructor(private authenticationService: AuthenticationService) { }

    title = 'Bagel Drops fsdhsidjfsdjfds';

    login() {
        
    }
}
