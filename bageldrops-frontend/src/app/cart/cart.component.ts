import { Component, OnInit } from '@angular/core';
import { ApiService } from '../_services/api.service';
import { AuthenticationService } from '../_services';
import { CartService } from '../_services/cart.service';
import { Product } from '../_models/product';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  product: Product;
  coupons: Array<any>;
  collections: Array<any>;
  cart = [];
  couponForm = new FormGroup({
    coupon: new FormControl('')
  });

  constructor(public authenticationService: AuthenticationService, public apiService: ApiService, private cartService: CartService) {
    this.getCart();
  }

  ngOnInit() { //Loading products and cart
    this.apiService.get('products').subscribe((products) => {
      this.product = new Product();
      this.product.prod = products;
    });
    this.apiService.get('coupons').subscribe((coupons) => {
      this.coupons = coupons;
      //console.log(coupons);
    });
    this.apiService.get('collections').subscribe((collections) => {
      this.collections = collections;
      //console.log(this.collections);
    })

  }
  getCart() {
    this.cart = this.cartService.cart;
  }

  onSubmit() {
    let x;
    if ((x = this.couponsMatch(this.coupons, this.couponForm.get('coupon').value))) {
      console.log(x);
      for (let i in this.collections) {
        //if (this.collections[i].id === x.collection)
        for (let j in this.collections[i].products) {
          for (let k in this.cartService.cart) {
            //console.log(this.collections[i].products[j]);
            if (this.collections[i].products[j] === this.cartService.cart[k].prod.prod_id) {
              console.log(this.collections[i]);
              console.log(this.collections[i].products[j] + " " + this.cartService.cart[k].prod.prod_id);
              this.cartService.cart[k].couponValid = true;
              this.cartService.cart[k].discount = (x.discount * 1.0) / 100.0;
            }
          }
          //if (this.collections[i].products[j])
          //for (let i in this.cartService.cart) {
          //go through collections for this specific coupon and see if any products are in there
          //this.cartService.discount = (x.discount * 1.0) / 100.0;
        }
      }
    } else {
      console.log('coupons do not match');
    }

  }

  couponsMatch(apiCoupons: Array<any>, coupon: string) { //Coupon validation
    for (let i in apiCoupons) {
      if (apiCoupons[i].cp_code.toUpperCase() == coupon.toUpperCase()) {
        return apiCoupons[i];
      }
    }
    return false;
  }

}
