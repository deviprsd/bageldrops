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
  cart = [];
  //subtotal: number = 0;
  couponForm = new FormGroup({
    coupon: new FormControl('')
  });

  constructor(public authenticationService: AuthenticationService, public apiService: ApiService, private cartService: CartService) {
    this.getCart();
    //this.subtotal = this.cartService.subtotal;
  }

  ngOnInit() {
    this.apiService.get('products').subscribe((products) => {
      this.product = new Product();
      this.product.prod = products;
    });
    this.apiService.get('coupons').subscribe((coupons) => {
      this.coupons = coupons;

    });

  }
  getCart() {
    this.cart = this.cartService.cart;
  }

  onSubmit() {
    //this.couponForm.setValue({ coupon: this.couponForm.controls.coupon.value });
    let x;
    // console.log(JSON.stringify(this.couponForm.value));
    if ((x = this.couponsMatch(this.coupons, this.couponForm.get('coupon').value))) {
      console.log(x);
      this.cartService.discount = (x.discount * 1.0) / 100.0;
    } else {
      console.log('coupons do not match');
    }

  }

  couponsMatch(apiCoupons: Array<any>, coupon: string) {
    for (let i in apiCoupons) {
      if (apiCoupons[i].cp_code == coupon.toUpperCase()) {
        return apiCoupons[i];
      }
    }
    return false;
  }

}
