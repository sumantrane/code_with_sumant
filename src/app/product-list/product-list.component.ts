import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../shared/products.service';
import { map } from 'rxjs';
import { Products, Product } from '../shared/product.interface';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  productList: Product[] = [];
  discountedProducts: Product[] = [];
  constructor(private productService: ProductsService) {}

  ngOnInit(): void {
    this.productService
      .getProducts()
      .pipe(
        map((res: Products) => {
          return res.products.map((product) => this.formatProdcuts(product));
        })
      )
      .subscribe((formattedroducts: Product[]) => {
        this.productList = formattedroducts;
        this.getDiscountedProducts();
      });
  }
  formatProdcuts(res: Product): any {
    return {
      _id: res._id,
      p_id: res.p_id,
      name: res.name,
      description: res.description,
      price: parseInt(res.price),
      image: res.image,
      discount: res?.discount,
      hasDiscount: res?.hasDiscount,
    };
  }

  addToCart(product: Product) {
    this.productService.addToCart(product);
  }

  getDiscountedProducts() {
    this.discountedProducts = this.productList.filter(
      (product) => product.hasDiscount
    );
  }
}
