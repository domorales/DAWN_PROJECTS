import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { CartComponent } from './cart/cart.component';
import { ShoppingCartRoutingModule } from './shopping-cart-routing.module';
import { CastPipe } from './cast.pipe';

@NgModule({
  declarations: [CartComponent, CastPipe],
  imports: [CommonModule, ShoppingCartRoutingModule, SharedModule],
})
export class ShoppingCartModule {}
