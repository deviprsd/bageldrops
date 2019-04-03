import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ApiService } from '../_services/api.service';
import { AppComponent } from '../app.component';
//import { CartComponent } from '../cart/cart.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: any;
  //cart: any[] = [];
  
  constructor(private titleService: Title, public apiService: ApiService, private appComponent: AppComponent) { }

  ngOnInit() {
      this.titleService.setTitle('BagelDrops | Bagel Standard of Coolness');
      this.apiService.get('products').subscribe((products) => {
        this.products = products;
      });
  }

  addToCart(product) {
    //alert(product.prod_name);
    console.log(product);
    this.appComponent.cart.push(product);
    this.appComponent.cartSize++;
  }
  //export default cart;
}
