import { Component, OnInit } from '@angular/core';
import { ApiService } from '../_services/api.service';
import { AuthenticationService } from '../_services';
import { ProductsComponent } from '../products/products.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  products: any;
  cart: any[] = [];
  
  constructor(public authenticationService: AuthenticationService, public apiService: ApiService) { }

  ngOnInit() {
    this.apiService.get('products').subscribe((products) => {
      this.products = products;
      this.cart.push(this.products);
      console.log(this.cart);
    });
  }

  public addToCart(any) {
    this.cart.push(any);
    console.log(any);
  }

  public get getCart() {
    return this.cart;
  }

}
