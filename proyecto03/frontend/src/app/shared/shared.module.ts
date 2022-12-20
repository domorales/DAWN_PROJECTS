import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from '../app-routing.module';
import { AddButtonComponent } from './add-button/add-button.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { IconsModule } from './icons/icons.module';
import { InputSearchProductComponent } from './input-search-product/input-search-product.component';
import { QuantityControlComponent } from './quantity-control/quantity-control.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    InputSearchProductComponent,
    AddButtonComponent,
    QuantityControlComponent,
  ],
  imports: [CommonModule, AppRoutingModule, FormsModule, IconsModule],
  exports: [
    HeaderComponent,
    FooterComponent,
    InputSearchProductComponent,
    AddButtonComponent,
    QuantityControlComponent,
    IconsModule,
  ],
})
export class SharedModule {}
