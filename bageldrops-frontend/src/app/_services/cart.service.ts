import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Product } from '../_models/product';
import { User } from '../_models/user'

import { config } from '../_models';
import { queueComponentIndexForCheck } from '@angular/core/src/render3/instructions';
import { CheckoutComponent } from '../checkout/checkout.component';
import { ApiService } from './api.service';
import { post } from 'selenium-webdriver/http';
import { AuthenticationService } from './authentication.service';


@Injectable({ providedIn: 'root' })
export class CartService {
    public cart = []; //Users full cart
    public counter = 0; //Used to index items
    public discount = 0; //Discount percent
    public completed = false; //Checkout completed
    public currCustomer;
    public billing;

    public options = new HttpHeaders({
        'Content-Type': 'application/json'
    });

    constructor(public apiService: ApiService, public http: HttpClient, public authenticationService: AuthenticationService) {
        const user = this.authenticationService.currentUserSubject.value;
        this.apiService.get('customers').subscribe((customers) => {
            console.log(customers);
            for (let x in customers) {
                if (user && user.customer_id === customers[x].user) {
                    this.currCustomer = customers[x];
                    console.log(this.currCustomer);
                    if (this.currCustomer.carts == null) {
                        if (this.currCustomer.carts.completed) {
                            //this.apiService.patch('carts', 
                        }
                    } else {
                        this.apiService.get('carts').subscribe((dbCarts) => {
                            for (let i in dbCarts) {

                            }
                        });
                    }
                }

            }
        });
    }

    runReInit() {
        const user = this.authenticationService.currentUserSubject.value;
        console.log(user.customer_id);
        this.apiService.get('customers').subscribe((customers) => {
            console.log(customers);
            for (let x in customers) {
                if (user && user.customer_id === customers[x].user) {
                    this.currCustomer = customers[x];
                    console.log(this.currCustomer);
                    if (this.currCustomer.carts == null || !this.currCustomer.carts.completed) {
                        this.http.post<any>(`${config.api}/carts/`, { cart_id: user.customer_id }).subscribe((dbCarts) => {
                            this.cart = dbCarts;
                        })
                    } else {
                        this.apiService.get('carts').subscribe((dbCarts) => {
                            for (let i in dbCarts) {

                            }
                        });
                    }
                }

            }
        });
    }

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
        this.post();
    }

    post() {

    }

    increment(product: Product) {
        product.amount++;
    }

    decrement(product: Product) {
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
            if (this.cart[i].couponValid) {
                subtotal += (this.cart[i].prod.price * this.cart[i].amount) * (1 - this.cart[i].discount);
            } else {
                subtotal += (this.cart[i].prod.price * this.cart[i].amount);
            }
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
        return (parseFloat(this.tax()) + parseFloat(this.subtotal())).toFixed(2);
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

    public sendCartToServer() {
        //this.apiService
    }

}
