import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AuthModule } from '../auth/auth.module';
import { SharedModule } from '../shared/shared.module';
import { ShoppingCartModule } from '../shopping-cart/shopping-cart.module';
import { StoreModule } from '../store/store.module';
import { HomeRoutingModule } from './home-routing.module';
import { PrincipalComponent } from './principal/principal.component';

@NgModule({
  declarations: [PrincipalComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    AuthModule,
    StoreModule,
    ShoppingCartModule,
  ],
  exports: [PrincipalComponent],
})
export class HomeModule {}
