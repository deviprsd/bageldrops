import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbdModalBasic } from './modal-basics';

import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
<<<<<<< HEAD
import { AccountsComponent } from './accounts/accounts.component';
=======
import { CartComponent } from './cart/cart.component';
>>>>>>> 6f4621f... Added cart component

@NgModule({
    declarations: [
        AppComponent,
        NgbdModalBasic,
        LoginComponent,
        RegisterComponent,
        HomeComponent,
<<<<<<< HEAD
        AccountsComponent
=======
        CartComponent
>>>>>>> 6f4621f... Added cart component
    ],
    imports: [
        NgbModule,
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        Title
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
