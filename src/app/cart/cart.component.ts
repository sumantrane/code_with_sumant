import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../shared/products.service';
import { Product } from '../shared/product.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartItems: Product[] = [];

  constructor(
    private productService: ProductsService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.cartItems = this.productService.getCartItems();
    console.log(this.cartItems);
  }

  clearCart() {
    this.productService.clearCart();
  }

  deleteProduct(id: any) {
    this.productService.removeSingleProduct(id);
  }

  onContinueShopping() {
    this._router.navigate(['/products']);
  }
}
