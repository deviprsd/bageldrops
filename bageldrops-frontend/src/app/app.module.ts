import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import { DropdownComponent } from './dropdown/dropdown.component';

@NgModule({
    declarations: [
        AppComponent,
        DropdownComponent
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
