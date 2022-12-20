import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductResponse } from 'src/app/shared/model/Product';

import { ShoppingCartService } from '../service/shopping-cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponent {
  productsInCart$ = this.shoppingCartService.productsInCart$;
  totalForProductsInCart$ = this.shoppingCartService.totalForProductsInCart$;

  constructor(
    private shoppingCartService: ShoppingCartService,
    private router: Router
  ) {}

  addProduct(product: string | ProductResponse) {
    this.shoppingCartService.addProductToCart(product as ProductResponse);
  }

  removeProduct(product: string | ProductResponse) {
    this.shoppingCartService.removeProductToCart(product as ProductResponse);
  }

  navigateProduct(productId: string | ProductResponse) {
    this.router.navigate(['/product', (productId as ProductResponse)._id]);
  }

  deleteProduct(product: string | ProductResponse) {
    this.shoppingCartService.deleteProductToCart(product as ProductResponse);
  }
}
