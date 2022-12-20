import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { ShoppingCartService } from 'src/app/shopping-cart/service/shopping-cart.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  loginForm!: FormGroup;

  isLoggedIn$: Observable<boolean> = this.authService.isLoggedIn$;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private shoppingCartService: ShoppingCartService
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(1)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  signIn() {
    this.authService.signIn(this.loginForm.value).subscribe();
  }
}
