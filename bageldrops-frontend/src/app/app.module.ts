import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbdModalBasic } from './modal-basics';
import { FooterComponent } from './footer/footer.component';

@NgModule({
    declarations: [
        AppComponent,
        NgbdModalBasic,
        FooterComponent
    ],
    imports: [
        NgbModule,
        BrowserModule,
        AppRoutingModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
