import { Injectable } from '@angular/core';
import { Product, Products } from './product.interface';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class ProductsService {
  private cartCountSubject: BehaviorSubject<number> =
    new BehaviorSubject<number>(0);
  cartProducts: Product[] = [];
  storageKey = 'cartItems';
  cartCount = this.cartCountSubject.asObservable();

  url = 'http://localhost:3000/products';
  constructor(private _http: HttpClient) {
    this.loadCartItems();
  }

  //get list of products from backend
  getProducts(): Observable<Products> {
    return this._http.get<Products>(this.url);
  }

  //load cartitems from local storage - needed for perceiving data on page refresh
  loadCartItems() {
    const storedItems = localStorage.getItem(this.storageKey);
    if (storedItems) {
      this.cartProducts = JSON.parse(storedItems);
    }
  }
  //save items to local storage
  saveItems() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.cartProducts));
  }

  //add items to cart
  addToCart(item: Product) {
    this.cartProducts.push(item);
    this.cartCountSubject.next(this.cartCountSubject.value + 1);
    this.saveItems();
  }

  //get cart items
  getCartItems() {
    return this.cartProducts;
  }

  //remove single product added into the cart by id
  removeSingleProduct(id: number) {
    this.cartProducts.splice(id, 1);
    this.cartCountSubject.next(this.cartCountSubject.value - 1);
    this.saveItems();
  }

  //clear cart
  clearCart() {
    this.cartProducts = [];
    this.saveItems();
  }
}
