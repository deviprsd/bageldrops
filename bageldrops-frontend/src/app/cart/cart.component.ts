import { Component, OnInit } from '@angular/core';
import { ApiService } from '../_services/api.service';
import { AuthenticationService } from '../_services';
import { CartService } from '../_services/cart.service';
import { Product } from '../_models/product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  product: Product;
  cart = [];
  subtotal: number = 0;

  constructor(public authenticationService: AuthenticationService, public apiService: ApiService, private cartService: CartService){
    this.getCart();
    this.subtotal = this.cartService.subtotal;
  }

  ngOnInit() {
    this.apiService.get('products').subscribe((products) => {
      this.product = new Product();
      this.product.prod = products;
    });
    
  }
  getCart(){
    this.cart = this.cartService.cart;
  }

}
