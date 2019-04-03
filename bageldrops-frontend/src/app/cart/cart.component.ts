import { Component, OnInit } from '@angular/core';
import { ApiService } from '../_services/api.service';
import { AuthenticationService } from '../_services';
import { CartService } from '../_services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  products: any;
  cart = {};
  subtotal: number = 0;

  constructor(public authenticationService: AuthenticationService, public apiService: ApiService, private cartService: CartService){
    this.getCart();
  }

  ngOnInit() {
    this.apiService.get('products').subscribe((products) => {
      this.products = products;
      //this.cart.push(this.products);
      //console.log(this.cart);
    });
  }
  getCart(){
    this.cart = this.cartService.cart;
  }
}
