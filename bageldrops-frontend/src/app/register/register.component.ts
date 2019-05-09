import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { AuthenticationService } from '../_services/authentication.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { config } from '../_models';
import { map } from 'rxjs/operators';
import { ApiService } from '../_services/api.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    registerForm = new FormGroup({
        username: new FormControl('', [Validators.required, Validators.minLength(4)]),
        password: new FormControl('', [Validators.required, Validators.minLength(8)]),
        confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
        firstName: new FormControl('', [Validators.required]),
        lastName: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email])
    }, this.checkPasswords);
    error: string;
    returnUrl: string;
    submitted = false;

    constructor(
        private titleService: Title,
        private authenticationService: AuthenticationService,
        private route: ActivatedRoute,
        private router: Router,
        private http: HttpClient,
        private apiService: ApiService
    ) { }

    ngOnInit() {
        this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';

        if (this.authenticationService.currentUserValue) {
            this.router.navigate([this.returnUrl]);
        }

        this.titleService.setTitle('BagelDrops | Register');
    }

    checkPasswords(group: FormGroup) {
        const pass = group.get('password').value;
        const confirmPass = group.get('confirmPassword').value;

        return pass === confirmPass ? null : { notSame: true };
    }

    get f() {
        return this.registerForm.controls;
    }

    onSubmit() {
        this.submitted = true;

        if (!this.registerForm.valid) {
            return;
        }

        this.http.post<any>(`${config.apiAuth}/accounts/register/`, { //Posts new user to database
            username: this.f.username.value,
            email: this.f.email.value,
            password: this.f.password.value,
            first_name: this.f.firstName.value,
            last_name: this.f.lastName.value
        })
        .subscribe(
            data => {
                this.router.navigate(['/login']);
            },
            error => {
                this.error = error;
            }
        );
    }

}
