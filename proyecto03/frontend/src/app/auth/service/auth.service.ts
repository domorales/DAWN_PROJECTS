import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  BehaviorSubject,
  catchError,
  EMPTY,
  ignoreElements,
  Observable,
  tap,
  throwError,
} from 'rxjs';
import { ApiService } from 'src/app/shared/service/api.service';

import {
  CredentialRequest,
  CredentialResponse,
} from '../../shared/model/Credential';
import { ShoppingCartService } from 'src/app/shopping-cart/service/shopping-cart.service';
import { UserResponse } from 'src/app/shared/model/User';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private userData: BehaviorSubject<UserResponse> = new BehaviorSubject({});
  constructor(
    private router: Router,
    private apiService: ApiService,
    private shoppingCartService: ShoppingCartService
  ) {}

  get isLoggedIn$(): Observable<boolean> {
    return this.isLoggedIn.asObservable();
  }

  get userData$(): Observable<UserResponse> {
    return this.userData.asObservable();
  }

  getUser() {
    const userid = localStorage.getItem('id');
    if (userid) {
      this.apiService
        .userById(userid)
        .pipe(
          tap((user) => {
            this.userData.next(user);
            this.isLoggedIn.next(true);
          })
        )
        .subscribe();
    }
  }

  signOut() {
    this.isLoggedIn.next(false);
    localStorage.clear();
    this.shoppingCartService.initCart();
    this.router.navigate(['/']);
  }

  signIn(credential: CredentialRequest): Observable<string> {
    return this.apiService.login(credential).pipe(
      tap((data: CredentialResponse) => {
        data && this.handleSuccesSignIn(data.token);
        localStorage.setItem('token', data.token);
        localStorage.setItem('id', data._id);
        this.shoppingCartService.initCart();
      }),
      ignoreElements(),
      catchError((err) => {
        this.isLoggedIn.next(false);
        if (err.status !== 200)
          return throwError(new Error('Invalid credentials'));

        return EMPTY;
      })
    );
  }

  private handleSuccesSignIn(token: string): void {
    this.isLoggedIn.next(true);
    this.router.navigate(['/']);
  }
}
