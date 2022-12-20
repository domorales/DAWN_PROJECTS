import { NgModule } from '@angular/core';
import { FeatherModule } from 'angular-feather';
import { User, ShoppingCart, Delete } from 'angular-feather/icons';

const icons = { User, ShoppingCart, Delete };
@NgModule({
  declarations: [],
  imports: [FeatherModule.pick(icons)],
  exports: [FeatherModule],
})
export class IconsModule {}
