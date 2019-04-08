import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Product } from '../_models/product';

import { config } from '../_models';
import { queueComponentIndexForCheck } from '@angular/core/src/render3/instructions';

@Injectable({ providedIn: 'root' })
export class CartService {
    public cart = [];
    public subtotal = 0;
    public counter = 0;

    constructor() {
        //this.apis = this.http.get<any>(`${config.api}`, {params: new HttpParams().set('format', 'json')}).pipe(map(res => res));
    }

    addToCart(product: any) {
        var p = new Product();
        p.prod = product;
        //const index = this.cart.indexOf(p.prod);
        let i = 0;
        for (i = 0; i < this.cart.length; i++) {
            if (this.cart[i].prod.prod_id == p.prod.prod_id) {
                this.increment(this.cart[i]);
                break;
            }
        }
        if (i == this.cart.length) { //product was not previously in cart
            p.cartID = this.counter;
            p.ammount++;
            this.cart[this.cart.length] = p;
            this.counter++;
        }

        //console.log(this.cart[this.counter]);

        this.getSubtotal();
    }

    increment(product: Product) {
        product.ammount++;
        this.getSubtotal();
    }

    decrement(product: Product) {
        if (product.ammount == 1) {
            // do nothing
        } else {
            product.ammount--;
            this.getSubtotal();
        }
    }

    removeFromCart(product: Product) {
        const index = this.cart.indexOf(product, 0);
        if (index > -1) {
            this.cart.splice(index, 1);
        }
        this.getSubtotal();
    }

    public getSubtotal() {
        this.subtotal = 0;
        //var i;
        for (let i = 0; i < this.cart.length; i++) {
            this.subtotal += (this.cart[i].prod.price * this.cart[i].ammount);
        }
    }

    get cartSize() {
        return this.cart.length;
    }

}
