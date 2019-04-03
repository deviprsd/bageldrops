import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { config } from '../_models';

@Injectable({ providedIn: 'root' })
export class CartService {
    public cart = {}; 
    public subtotal = 0;
    public cartSize = 0;

    constructor() {
        //this.apis = this.http.get<any>(`${config.api}`, {params: new HttpParams().set('format', 'json')}).pipe(map(res => res));
    }

    addToCart(product: any){
        this.cartSize++;
        /*this.cart.Add({
            product: product,
            key: this.cartSize
        });*/
        this.cart[this.cartSize] = product; 
        console.log(this.cart[this.cartSize]);
    }

    removeFromCart(product: any){

    }

    public getSubtotal() {
        this.subtotal = 0;
        var i;
        for (i = 0; i < Object.keys(this.cart).length; i++) {
          this.subtotal += this.cart[i].price;
        }
      }

}
