import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Product } from '../_models/product';

import { config } from '../_models';

@Injectable({ providedIn: 'root' })
export class CartService {
    public cart = [];
    public subtotal = 0;
    public cartSize = 0;
    public counter = 0;

    constructor() {
        //this.apis = this.http.get<any>(`${config.api}`, {params: new HttpParams().set('format', 'json')}).pipe(map(res => res));
    }

    addToCart(product: any) {
        var p = new Product();
        p.prod = product;
        p.cartID = this.counter;
        p.ammount++;
        this.cart[this.cartSize] = p;
        console.log(this.cart[this.counter]);
        this.counter++;
        this.cartSize++;
        this.getSubtotal();
    }

    increment(product: Product) {
        product.ammount++;
        this.getSubtotal();
    }

    decrement(product: Product) {
        product.ammount--;
        if (product.ammount < 1) {
            this.removeFromCart(product);
        } else {
            this.getSubtotal();
        }
    }

    removeFromCart(product: Product) {
        const index = this.cart.indexOf(product, 0);
        if (index > -1) {
            this.cart.splice(index, 1);
        }
        this.cartSize--;
        this.getSubtotal();
    }

    public getSubtotal() {
        this.subtotal = 0;
        var i;
        for (i = 0; i < this.cart.length; i++) {
            this.subtotal += (this.cart[i].prod.price * this.cart[i].ammount);
        }
    }

}
