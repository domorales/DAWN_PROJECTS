import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { AuthService } from 'src/app/auth/service/auth.service';
import { ShoppingCartService } from 'src/app/shopping-cart/service/shopping-cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  @Input() stateNavBar: boolean = false;
  @Output() showNavBar = new EventEmitter<void>();
  countProducts$ = this.shoppingCartService.countProductsInCart$;
  isLoggedIn$ = this.authService.isLoggedIn$;
  constructor(
    private shoppingCartService: ShoppingCartService,
    private authService: AuthService
  ) {}

  signOut() {
    this.authService.signOut();
  }

  clickNavBar() {
    this.showNavBar.emit();
  }
}
