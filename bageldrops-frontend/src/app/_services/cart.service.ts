import { Injectable } from '@angular/core';
import { Product } from '../_models/product';
import { ApiService } from './api.service';
import { AuthenticationService } from './authentication.service';


@Injectable({ providedIn: 'root' })
export class CartService {
    public cart = []; //Users full cart
    public counter = 0; //Used to index items
    public discount = 0; //Discount percent
    public completed = false; //Checkout completed
    public currCustomer;
    public billing;

    constructor(public apiService: ApiService, public authenticationService: AuthenticationService) {
        // const user = this.authenticationService.currentUserSubject.value;
        // if (user) {
        //     this.currCustomer = user;
        //     this.apiService.getFromId('customers', user.customer_id).subscribe((customers) => {
        //         console.log(customers.carts)
        //         if (customers.carts == []) { //No current cart
        //             this.apiService.post(
        //                 'carts',
        //                 {
        //                     cart_state: 'IN_PROGRESS',
        //                     subtotal: 0,
        //                     total: 0,
        //                     products: [],
        //                     cart_billing: null

        //                 }).subscribe((newCart) => {
        //                     console.log(newCart);
        //                 });
        //         } else {
        //             this.apiService.get('carts').subscribe((carts) => {
        //                 for (let x in carts) {
        //                     if (carts[x].cart_id === user.customer_id) {
        //                         if (carts.cart_state == 'IN_PROGRESS') { // pickup saved cart
        //                             this.setCartFromDB(carts);
        //                         } else {

        //                         }
        //                     }
        //                 }
        //             });
        //         }
        //     });
        // }
    }

    setCartFromDB(cart: any) {
        console.log(cart);
    }

    runReInit() {
        const user = this.authenticationService.currentUserSubject.value;
        if (user) {
            this.currCustomer = user;
            this.apiService.getFromId('customers', user.customer_id).subscribe((customers) => {
                if (customers.carts.length === 0) { //No current cart
                    this.apiService.post(
                        'carts',
                        {
                            cart_state: 'IN_PROGRESS',
                            subtotal: 0,
                            total: 0,
                            products: [],
                            cart_billing: null,
                            customer: user.customer_id

                        }).subscribe((newCart) => {
                            console.log(newCart);
                        });
                } else {
                    this.apiService.get('carts').subscribe((carts) => {
                        for (let x in carts) {
                            if (carts[x].customer === user.customer_id) {
                                if (carts[x].cart_state == 'IN_PROGRESS') { // pickup saved cart
                                    this.setCartFromDB(carts);
                                } else {
                                    this.apiService.post(
                                        'carts',
                                        {
                                            cart_state: 'IN_PROGRESS',
                                            subtotal: 0,
                                            total: 0,
                                            products: [],
                                            cart_billing: null,
                                            customer: user.customer_id
                
                                        }).subscribe((newCart) => {
                                            console.log(newCart);
                                        });
                                }
                            }
                        }
                    });
                }
            });
        }
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
        // this.apiService.post(
        //     'carts',
        //     {
        //         cart_state: 'IN_PROGRESS',
        //         cart_id: `${this.currCustomer.customer_id}`,
        //         subtotal: this.subtotal(),
        //         //total: 0,
        //         products: JSON.stringify(this.cart)
                
        //     }
        // ).subscribe((carts) => {
        //     console.log(carts);
        // })
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
