import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  switchMap,
  take,
  tap,
  withLatestFrom,
} from 'rxjs';
import { ProductResponse } from 'src/app/shared/model/Product';
import { ApiService } from 'src/app/shared/service/api.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private products: BehaviorSubject<ProductResponse[]> = new BehaviorSubject<
    ProductResponse[]
  >([]);

  private product: BehaviorSubject<ProductResponse> =
    new BehaviorSubject<ProductResponse>({} as ProductResponse);

  constructor(private apiService: ApiService) {}

  get products$(): Observable<ProductResponse[]> {
    return this.products.asObservable();
  }

  get product$(): Observable<ProductResponse> {
    return this.product.asObservable();
  }

  getProductById(id: number) {
    return this.apiService
      .productById(id)
      .pipe(take(1))
      .subscribe((product) => {
        this.product.next(product);
      });
  }
  getAllProducts() {
    return this.apiService
      .allProducts()
      .pipe(take(1))
      .subscribe((products) => {
        console.log(products);
        this.products.next(products);
      });
  }

  getAllProductsByCategory(category: string) {
    return this.apiService
      .productsByCategory(category)
      .pipe(take(1))
      .subscribe((products) => {
        this.products.next(products);
      });
  }

  filterProductsByValue(value: string, category: string) {
    this.apiService
      .productsByCategory(category)
      .pipe(
        take(1),
        tap((products) => {
          this.products.next(
            products.filter((product) =>
              product.title.toLowerCase().includes(value.toLowerCase())
            )
          );
        })
      )
      .subscribe();
  }

  filterAllProductsByValue(value: string) {
    this.apiService
      .allProducts()
      .pipe(
        take(1),
        tap((products) => {
          this.products.next(
            products.filter((product) =>
              product.title.toLowerCase().includes(value.toLowerCase())
            )
          );
        })
      )
      .subscribe();
  }
}
