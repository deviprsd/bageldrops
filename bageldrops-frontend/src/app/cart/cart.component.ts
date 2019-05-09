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
    });
  }
  getCart() {
    this.cart = this.cartService.cart;
  }

  onSubmit() {
    let applied = false;
    let x;
    if ((x = this.couponsMatch(this.coupons, this.couponForm.get('coupon').value))) {
      this.apiService.getFromId('collections', x.collection).subscribe((collection) => {
        if (!collection.is_active) return;
        for (let j in collection.products) {
          for (let k in this.cartService.cart) { //Coupon and product filtering
            if (collection.products[j] === this.cartService.cart[k].prod.prod_id) {
              applied = true;
              alert("Coupon applied!");
              this.cartService.cart[k].couponValid = true;
              this.cartService.cart[k].discount = (x.discount * 1.0) / 100.0;

            }
          }
        }
      })
    }
    if (!applied){
      alert("Coupon invalid!");
    }

  }

  couponsMatch(apiCoupons: Array<any>, coupon: string) { //Coupon validation
    const today = new Date();
    for (let i in apiCoupons) {
      if (apiCoupons[i].cp_code.toUpperCase() == coupon.toUpperCase() && (today < (new Date(apiCoupons[i].exp_date)))) {
        return apiCoupons[i];
      }
    }
    return false;
  }

}
