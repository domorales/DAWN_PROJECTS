import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {CustomersComponent} from "./report/pages/customers/customers.component";
import {OrdersComponent} from "./report/pages/orders/orders.component";
import {ProductsComponent} from "./report/pages/products/products.component";

const routes: Routes = [
  {
    path:      '',
    component: CustomersComponent
  },
  {
    path:      'orders/:id',
    component: OrdersComponent
  },
  {
    path:      'products/:id',
    component: ProductsComponent
  },
  {
    path:       '**',
    redirectTo: ''
  }
];

@NgModule({
  declarations: [],
  imports:      [
    RouterModule.forRoot(routes)
  ],
  exports:      [RouterModule]
})
export class AppRoutingModule {
}
