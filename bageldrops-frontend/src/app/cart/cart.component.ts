import { Component, OnInit } from '@angular/core';
import { ApiService } from '../_services/api.service';
import { AuthenticationService } from '../_services';
import { ProductsComponent } from '../products/products.component';
import { HomeComponent } from '../home/home.component';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  products: any;
  cart: any[] = [];
  subtotal: number = 0;
  
  constructor(public authenticationService: AuthenticationService, public apiService: ApiService, private appComponent: AppComponent) { 
    this.cart = this.appComponent.cart;
    this.getSubtotal();
  }

  ngOnInit() {
    this.apiService.get('products').subscribe((products) => {
      this.products = products;
      //this.cart.push(this.products);
      //console.log(this.cart);
    });
  }

  public getSubtotal(){
    var i;
    for (i = 0; i < this.cart.length; i++) {
      this.subtotal += this.cart[i].price;
    }
  }
  
}
