import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../shared/products.service';
import { Product } from '../shared/product.interface';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartItems: Product[] = [];

  constructor(private productService: ProductsService) {}

  ngOnInit(): void {
    this.cartItems = this.productService.getCartItems();
  }

  deleteProduct(id: number) {
    this.productService.removeSingleProduct(id);
  }
}
