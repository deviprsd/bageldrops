import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ApiService } from '../_services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: any;

  constructor(private titleService: Title, public apiService: ApiService) { }

  ngOnInit() {
      this.titleService.setTitle('BagelDrops | Bagel Standard of Coolness');
      this.apiService.get('products').subscribe((products) => {
        console.log(products);
        this.products = products;
      });
  }

}
