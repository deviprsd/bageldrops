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
    //public subtotal = 0;
    public counter = 0;
    public discount = 0;
    public completed = false;

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

        //this.getSubtotal();
    }

    increment(product: Product) {
        product.ammount++;
        //this.getSubtotal();
    }

    decrement(product: Product) {
        if (product.ammount == 1) {
            // do nothing
        } else {
            product.ammount--;
            //this.getSubtotal();
        }
    }

    removeFromCart(product: Product) {
        const index = this.cart.indexOf(product, 0);
        if (index > -1) {
            this.cart.splice(index, 1);
        }
        //this.getSubtotal();
    }

    public subtotal() {
        var subtotal = 0;
        //var i;
        for (let i in this.cart) {
            subtotal += (this.cart[i].prod.price * this.cart[i].ammount) * (1 - this.discount);
        }
        //this.subtotal = (Math.floor(this.subtotal * 100) / 100);
        //subtotal = subtotal * (1 - this.discount);
        return subtotal.toFixed(2);
    }

    public get cartSize() {
        var cartSize = 0;
        for (let i in this.cart) {
            cartSize += this.cart[i].ammount;
        }
        return cartSize;
    }

    public tax() {
        return (parseFloat(this.subtotal()) * 0.05).toFixed(2);
    }

    public total() {
        return ((parseFloat(this.tax()) + parseFloat(this.subtotal())).toFixed(2));
    }

    public isCompleted() {
        return this.completed;
    }

    public clearCart() {
        this.cart = [];
        this.counter = 0;
        this.discount = 0;
        //this.completed = false;
    }

}
