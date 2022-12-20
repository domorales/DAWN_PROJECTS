import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, switchMap, take } from 'rxjs';
import { enviroment } from 'src/enviroment/enviroment';

import { CartResponse, ProductsCart } from '../model/Cart';
import { CredentialRequest, CredentialResponse } from '../model/Credential';
import { ProductResponse } from '../model/Product';
import { UserResponse } from '../model/User';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private domain: string = enviroment.domain;
  private loginEndpoint: string = 'auth/login';
  private productEndpoint: string = 'products';
  private cardEndpoint: string = 'carts';
  private userEndpoint: string = 'users';

  constructor(private http: HttpClient) {}

  login(credentialRequest: CredentialRequest): Observable<CredentialResponse> {
    return this.http.post<CredentialResponse>(
      `${this.domain}${this.loginEndpoint}`,
      credentialRequest
    );
  }

  userById(userId: string): Observable<UserResponse> {
    return this.http.get<UserResponse>(
      `${this.domain}${this.userEndpoint}/${userId}`
    );
  }

  productById(_id: number): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(
      `${this.domain}${this.productEndpoint}/${_id}`
    );
  }

  allProducts(): Observable<ProductResponse[]> {
    return this.http.get<ProductResponse[]>(
      `${this.domain}${this.productEndpoint}`
    );
  }

  productsByCategory(category: string): Observable<ProductResponse[]> {
    return this.http.get<ProductResponse[]>(
      `${this.domain}${this.productEndpoint}/category/${category}`
    );
  }

  cartByUser(userId: string): Observable<CartResponse[]> {
    return this.http.get<CartResponse[]>(
      `${this.domain}${this.cardEndpoint}/user/${userId}`
    );
  }

  addNewProducIntCart(
    product: ProductResponse,
    userId: string
  ): Observable<CartResponse> {
    return this.http
      .get<CartResponse[]>(`${this.domain}${this.cardEndpoint}/user/${userId}`)
      .pipe(
        take(1),
        switchMap((cart: CartResponse[]) => {
          if (cart.length > 0) {
            const productSearched = cart[0].products.filter(
              (item) => (<ProductResponse>item.productId)._id === product._id
            );
            let newCart;

            if (productSearched.length === 0) {
              newCart = [
                ...cart[0].products,
                { productId: product._id, quantity: 1 },
              ];
            } else {
              newCart = cart[0].products.map((item) => {
                if ((<ProductResponse>item.productId)._id === product._id)
                  return {
                    productId: product._id,
                    quantity: item.quantity + 1,
                  };
                return item;
              });
            }

            return this.newProducIntCart(cart, newCart);
          }
          return this.createCart(product, userId);
        })
      );
  }

  removeProducIntCart(
    product: ProductResponse,
    userId: string
  ): Observable<CartResponse> {
    return this.http
      .get<CartResponse[]>(`${this.domain}${this.cardEndpoint}/user/${userId}`)
      .pipe(
        take(1),
        switchMap((cart: CartResponse[]) => {
          const productSearched = cart[0].products.filter(
            (item) => (<ProductResponse>item.productId)._id === product._id
          );
          let newCart;

          if (productSearched.length > 0) {
            newCart = cart[0].products.map((item) => {
              if ((<ProductResponse>item.productId)._id === product._id)
                return {
                  productId: product._id,
                  quantity: item.quantity - 1,
                };
              return item;
            });
            return this.newProducIntCart(cart, newCart);
          }

          return of(cart[0]);
        })
      );
  }

  deleteProducIntCart(
    product: ProductResponse,
    userId: string
  ): Observable<CartResponse> {
    return this.http
      .get<CartResponse[]>(`${this.domain}${this.cardEndpoint}/user/${userId}`)
      .pipe(
        take(1),
        switchMap((cart: CartResponse[]) => {
          const newCart = cart[0].products.filter(
            (item) => (<ProductResponse>item.productId)._id !== product._id
          );

          return this.newProducIntCart(cart, newCart);
        })
      );
  }

  private createCart(product: ProductResponse, userId: string) {
    return this.http.post<CartResponse>(`${this.domain}${this.cardEndpoint}`, {
      userId: userId,
      date: new Date(),
      products: [{ productId: product._id, quantity: 1 }],
    });
  }

  private newProducIntCart(cart: CartResponse[], newProducts: ProductsCart[]) {
    return this.http.put<CartResponse>(
      `${this.domain}${this.cardEndpoint}/${cart[0]._id}`,
      {
        userId: cart[0].userId,
        date: new Date(),
        products: newProducts,
      }
    );
  }
}
