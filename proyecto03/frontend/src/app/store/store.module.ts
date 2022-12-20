import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { AllProductsComponent } from './all-products/all-products.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductComponent } from './product/product.component';
import { StoreRoutingModule } from './store-routing.module';

@NgModule({
  declarations: [ProductComponent, ProductCardComponent, AllProductsComponent],
  imports: [CommonModule, StoreRoutingModule, SharedModule],
  exports: [ProductComponent, ProductCardComponent, AllProductsComponent],
})
export class StoreModule {}
