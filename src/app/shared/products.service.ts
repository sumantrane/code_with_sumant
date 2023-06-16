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

  //get productBy id
  getProductById(id: number): Observable<Product> {
    return this._http.get<Product>(this.url + '/' + id);
  }

  //load cartitems from local storage - needed for perceiving data on page refresh
  loadCartItems() {
    const storedItems = localStorage.getItem(this.storageKey);
    if (storedItems) {
      this.cartProducts = JSON.parse(storedItems);
      this.updateCartCount();
    }
  }
  //save items to local storage
  saveItems() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.cartProducts));
  }

  //add items to cart
  addToCart(item: Product) {
    const existingItemIndex = this.cartProducts.findIndex(
      (cartItem) => cartItem.name === item.name
    );
    if (existingItemIndex !== -1) {
      this.cartProducts[existingItemIndex].quantity++;
    } else {
      this.cartProducts.push({ ...item, quantity: 1 });
    }
    this.updateCartCount();
    //this.cartCountSubject.next(this.cartCountSubject.value + 1);
    this.saveItems();
  }

  updateCartCount() {
    const totalCount = this.cartProducts.reduce(
      (total, item) => total + item.quantity,
      0
    );

    this.cartCountSubject.next(totalCount);
  }

  //get cart items
  getCartItems() {
    return this.cartProducts;
  }

  //remove single product added into the cart by id
  removeSingleProduct(id: number) {
    const existingItemIndex = this.cartProducts.findIndex(
      (item) => item._id === id
    );
    if (existingItemIndex !== -1) {
      this.cartProducts[existingItemIndex].quantity--;
      if (this.cartProducts[existingItemIndex].quantity === 0) {
        this.cartProducts.splice(existingItemIndex, 1);
      }
    }
    this.updateCartCount();
    /* this.cartProducts.splice(id, 1);
    this.cartCountSubject.next(this.cartCountSubject.value - 1); */
    this.saveItems();
  }

  //clear cart
  clearCart() {
    this.cartProducts = [];
    this.updateCartCount();
    this.saveItems();
  }
}
