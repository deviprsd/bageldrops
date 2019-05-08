import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import { first } from 'rxjs/operators';
import { CartService } from '../_services/cart.service';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    loginForm = new FormGroup({ //Retrieving login info
        username: new FormControl('', [Validators.required, Validators.minLength(4)]),
        password: new FormControl('', [Validators.required, Validators.minLength(8)])
    });
    returnUrl: string;
    submitted = false;
    error: string;

    constructor(
        private titleService: Title,
        private authenticationService: AuthenticationService,
        private route: ActivatedRoute,
        private router: Router,
        private cartService: CartService,
        private http: HttpClient
    ) { }

    ngOnInit() {
        this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';

        if (this.authenticationService.currentUserValue) {
            this.router.navigate([this.returnUrl]);
        }

        this.titleService.setTitle('BagelDrops | Log In');
    }

    get f() {
        return this.loginForm.controls;
    }

    onSubmit() { //Validating login
        this.submitted = true;

        if (!this.loginForm.valid) {
            return;
        }

        this.authenticationService.login(this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.cartService.runReInit();
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.error = error;
                }
            );
    }
}
