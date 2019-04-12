import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ApiService } from '../_services/api.service';
import { AppComponent } from '../app.component';
//import { CartComponent } from '../cart/cart.component';
import { CartService } from '../_services/cart.service';
import { Product } from '../_models/product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: Product;
  //cart: any[] = [];
  
  constructor(private titleService: Title, public apiService: ApiService, private cartService: CartService) { 
    this.cartService.completed = false;
  }

  ngOnInit() {
      this.titleService.setTitle('BagelDrops | Bagel Standard of Coolness');
      this.apiService.get('products').subscribe((products) => {
        this.products = products;
      });
  }

  
  //export default cart;
}
