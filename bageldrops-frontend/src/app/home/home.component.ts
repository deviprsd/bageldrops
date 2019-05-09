import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ApiService } from '../_services/api.service';
import { AppComponent } from '../app.component';
import { CartService } from '../_services/cart.service';
import { Product } from '../_models/product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: Product;

  constructor(private titleService: Title, public apiService: ApiService, private cartService: CartService) {

  }

  ngOnInit() {
    this.titleService.setTitle('BagelDrops | Bagel Standard of Coolness');
    this.apiService.get('products').subscribe((products) => {
      this.products = products; //Gets products to display on home page
    });
    this.cartService.runReInit();
    this.cartService.completed = false;
  }
}
