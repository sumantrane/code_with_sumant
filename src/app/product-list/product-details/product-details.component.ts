import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs';
import { ProductsService } from 'src/app/shared/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent {
  productId: number = 0;
  constructor(
    private activateRoute: ActivatedRoute,
    private productService: ProductsService
  ) {}

  ngOnInit() {
    const id = this.activateRoute.snapshot.paramMap.get('id');
    this.getProductDetails(parseInt(id!));
    //below code will return same reults
    /* this.activateRoute.paramMap.subscribe((params) => {
      const id = params.get('id');
      console.log(id);
      this.getProductDetails(this.productId);
    }); */
  }

  getProductDetails(productId: number) {
    this.productService
      .getProductById(productId)
      .subscribe((res) => console.log(res));
  }
}
