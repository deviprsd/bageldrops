import { Injectable } from '@angular/core';
import { Product } from '../_models/product';
import { ApiService } from './api.service';
import { AuthenticationService } from './authentication.service';
import { ACTIVE_INDEX } from '@angular/core/src/render3/interfaces/container';


@Injectable({ providedIn: 'root' })
export class CartService {
    public cart = []; //Users full cart
    public counter = 0; //Used to index items
    public discount = 0; //Discount percent
    public completed = false; //Checkout completed
    public currCustomer;
    public billing;
    public activeCart;
    public tax_state;
    public taxes = {};

    constructor(public apiService: ApiService, public authenticationService: AuthenticationService) {
       this.apiService.get('tax').subscribe((tax) => {
           for (let i in tax) {
                this.taxes[tax[i].state] = tax[i].tax_rate;
           }
       })
    }

    setCartFromDB(cart: any) { //Pulls in user's preexisting cart
        this.activeCart = cart;
        this.cart = [];
        
        const quantities = JSON.parse(this.activeCart.quantities)
        let counter = 0;
        for (let x in cart.products) {
            this.apiService.getFromId('products', cart.products[x]).subscribe((product) => {
                const p = new Product();
                p.prod = product;
                p.amount = quantities[p.prod.id];
                this.cart.push(p) //Adds item to local cart
            });
        }
    }

    runReInit() { //Used for getting or creating cart after a user signs in
        if(this.activeCart) {
            return;
        }
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
                            this.setCartFromDB(newCart); //Pickup saved cart
                        });
                } else {
                    this.apiService.get('carts').subscribe((carts) => {
                        for (let x in carts) {
                            if (carts[x].customer === user.customer_id) {
                                if (carts[x].cart_state == 'IN_PROGRESS') { //Pickup saved cart
                                    this.setCartFromDB(carts[x]);
                                }
                            }
                        }
                        if(!this.activeCart) { //Creates a new cart
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
                                    this.setCartFromDB(newCart);
                                });
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

    post() { //posts the cart to the database so items in it are not lost
        const products = {}
        for (let x in this.cart) {
            products[this.cart[x].prod.id] = this.cart[x].amount;
        }

        this.apiService.patch(
            'carts',
            this.activeCart.id,
            {
                cart_state: 'IN_PROGRESS',
                subtotal: this.subtotal(),
                total: 0,
                products: Object.keys(products),
                quantities: JSON.stringify(products)

            }
        ).subscribe((carts) => {
            console.log(carts);
        })
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
        this.post();
    }

    removeFromCart(product: Product) {
        const index = this.cart.indexOf(product, 0);
        if (index > -1) {
            this.cart.splice(index, 1);
        }
        this.post();
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
        return (parseFloat(this.subtotal()) * this.taxes[this.tax_state.toUpperCase()]).toFixed(2);
    }

    public total() { //Total including tax
        return (parseFloat(this.tax()) + parseFloat(this.subtotal())).toFixed(2);
    }

    public isCompleted() { //Checkout completed
        return this.completed;
    }

    public clearCart(bill_id) { //Used after completing checkout
        this.postCompleted(bill_id);
        this.activeCart = null;
        this.cart = [];
        this.counter = 0;
        this.discount = 0;
    }

    public postCompleted(bill_id){ //Updates the user's cart once they checkout, this cart cannot be accessed except for on the profile page where it is read only
        if(bill_id === -1) return;
        const products = {}
        for (let x in this.cart) {
            products[this.cart[x].prod.id] = this.cart[x].amount;
        }

        this.apiService.patch(
            'carts',
            this.activeCart.id,
            {
                cart_state: 'COMPLETED',
                subtotal: this.subtotal(),
                total: this.total(),
                products: Object.keys(products),
                quantities: JSON.stringify(products),
                cart_billing: bill_id

            }
        ).subscribe((carts) => {
            console.log(carts);
        })
    }
}
