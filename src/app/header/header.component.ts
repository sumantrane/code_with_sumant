import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { ProductsService } from '../shared/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private _productService: ProductsService,
    private _router: Router
  ) {}
  cartCount = 0;
  search = '';

  ngOnInit() {
    this._productService.cartCount.subscribe(
      (count) => (this.cartCount = count)
    );
  }

  onInputChange(event: any) {
    console.log(event.target.value);
  }

  onCartClick() {
    this._router.navigate(['/cart']);
  }
}
