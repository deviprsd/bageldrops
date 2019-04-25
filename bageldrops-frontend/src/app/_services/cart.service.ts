import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Product } from '../_models/product';

import { config } from '../_models';
import { queueComponentIndexForCheck } from '@angular/core/src/render3/instructions';

@Injectable({ providedIn: 'root' })
export class CartService {
    public cart = []; //Users full cart
    public counter = 0; //Used to index items
    public discount = 0; //Discount percent
    public completed = false; //Checkout completed

    constructor() {}

    addToCart(product: any) {
        var p = new Product();
        p.prod = product;
        let i = 0;
        for (i = 0; i < this.cart.length; i++) {
            if (this.cart[i].prod.prod_id == p.prod.prod_id) { // If this item is already in cart -> increment its amount to eliminate duplication
                this.increment(this.cart[i]); 
                break;
            }
        }
        if (i == this.cart.length) { //product was not previously in cart
            p.cartID = this.counter;
            p.amount++;
            this.cart[this.cart.length] = p;
            this.counter++;
        }
    }

    increment(product: Product) {
        product.amount++;
    }

    decrement(product: Product) { 
        if (product.amount)
        if (product.amount == 1) {
            // do nothing
        } else {
            product.amount--;
        }
    }

    removeFromCart(product: Product) {
        const index = this.cart.indexOf(product, 0);
        if (index > -1) {
            this.cart.splice(index, 1);
        }
    }

    public subtotal() { //Gets cart subtotal
        var subtotal = 0;
        for (let i in this.cart) {
            subtotal += (this.cart[i].prod.price * this.cart[i].amount) * (1 - this.discount);
        }
        return subtotal.toFixed(2);
    }

    public get cartSize() { //Gets carts size
        var cartSize = 0;
        for (let i in this.cart) {
            cartSize += this.cart[i].amount;
        }
        return cartSize;
    }

    public tax() { //Fixed tax rate
        return (parseFloat(this.subtotal()) * 0.05).toFixed(2);
    }

    public total() { //Total including tax
        return ((parseFloat(this.tax()) + parseFloat(this.subtotal())).toFixed(2));
    }

    public isCompleted() { //Checkout completed
        return this.completed;
    }

    public clearCart() { //Used after completing checkout
        this.cart = [];
        this.counter = 0;
        this.discount = 0;
        //this.completed = false;
    }

}
