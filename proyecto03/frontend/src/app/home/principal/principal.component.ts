import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthService } from 'src/app/auth/service/auth.service';
import { ShoppingCartService } from 'src/app/shopping-cart/service/shopping-cart.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrincipalComponent {
  stateNavBar = false;
  constructor(
    private shoppingCartService: ShoppingCartService,
    private authService: AuthService
  ) {
    this.shoppingCartService.initCart();
    this.authService.getUser();
  }

  hideNavBar() {
    this.stateNavBar = false;
  }
}
