import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, take, tap } from 'rxjs';
import { CartResponse, ProductsCart } from 'src/app/shared/model/Cart';
import { ProductResponse } from 'src/app/shared/model/Product';
import { ApiService } from 'src/app/shared/service/api.service';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  private productsInCart: BehaviorSubject<ProductsCart[]> = new BehaviorSubject<
    ProductsCart[]
  >([]);
  private countProductsInCart: BehaviorSubject<number> =
    new BehaviorSubject<number>(0);

  private totalForProductsInCart: BehaviorSubject<number> =
    new BehaviorSubject<number>(0);

  constructor(private apiService: ApiService, private router: Router) {}

  get countProductsInCart$() {
    return this.countProductsInCart.asObservable();
  }

  get productsInCart$() {
    return this.productsInCart.asObservable();
  }

  get totalForProductsInCart$() {
    return this.totalForProductsInCart.asObservable();
  }

  initCart() {
    const userid = localStorage.getItem('id');
    if (userid) {
      this.apiService
        .cartByUser(userid)
        .pipe(
          take(1),
          tap((cart: CartResponse[]) => {
            this.calculateCart(cart[0]);
          })
        )
        .subscribe();
      return;
    }

    this.calculateCartClear();
  }

  addProductToCart(product: ProductResponse) {
    const userid = localStorage.getItem('id');
    if (userid) {
      this.apiService
        .addNewProducIntCart(product, userid)
        .pipe(
          take(1),
          tap((cart) => {
            this.calculateCart(cart);
          })
        )
        .subscribe();
      return;
    }

    this.router.navigate(['user']);
  }

  removeProductToCart(product: ProductResponse) {
    const userid = localStorage.getItem('id') || '0';
    this.apiService
      .removeProducIntCart(product, userid)
      .pipe(
        take(1),
        tap((cart) => {
          this.calculateCart(cart);
        })
      )
      .subscribe();
  }

  deleteProductToCart(product: ProductResponse) {
    const userid = localStorage.getItem('id') || '0';
    this.apiService
      .deleteProducIntCart(product, userid)
      .pipe(
        take(1),
        tap((cart) => {
          this.calculateCart(cart);
        })
      )
      .subscribe();
  }

  private calculateCart(cart: CartResponse) {
    const count = cart.products.reduce(
      (accumulator, currentValue) => accumulator + currentValue.quantity,
      0
    );

    const total = cart.products.reduce(
      (accumulator, currentValue) =>
        accumulator +
        currentValue.quantity *
          (currentValue.productId as ProductResponse).price,
      0
    );
    this.productsInCart.next(cart.products);
    this.countProductsInCart.next(count);
    this.totalForProductsInCart.next(total);
  }

  private calculateCartClear() {
    this.productsInCart.next([]);
    this.countProductsInCart.next(0);
    this.totalForProductsInCart.next(0);
  }
}
