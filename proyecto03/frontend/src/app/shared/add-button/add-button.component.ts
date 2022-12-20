import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ShoppingCartService } from 'src/app/shopping-cart/service/shopping-cart.service';

import { ProductResponse } from '../model/Product';

@Component({
  selector: 'app-add-button',
  templateUrl: './add-button.component.html',
  styleUrls: ['./add-button.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddButtonComponent {
  @Input() product!: ProductResponse;

  constructor(private shoppingCartService: ShoppingCartService) {}

  addProduct(product: ProductResponse) {
    this.shoppingCartService.addProductToCart(product);
  }
}
