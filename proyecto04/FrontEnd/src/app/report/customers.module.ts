import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CustomersComponent} from './pages/customers/customers.component';
import {ClientTableComponent} from './components/client-table/client-table.component';
import {OrdersComponent} from './pages/orders/orders.component';
import {RouterLink} from "@angular/router";
import {OrdersTableComponent} from './components/orders-table/orders-table.component';
import {AsNumberPipe} from './pipes/as-number.pipe';
import {AsDoublePipe} from './pipes/as-double.pipe';
import {ProductsComponent} from './pages/products/products.component';
import {ProductsTableComponent} from './components/products-table/products-table.component';
import {InfiniteScrollModule} from "ngx-infinite-scroll";

@NgModule({
  declarations: [
    CustomersComponent,
    ClientTableComponent,
    OrdersComponent,
    OrdersTableComponent,
    AsNumberPipe,
    AsDoublePipe,
    ProductsComponent,
    ProductsTableComponent
  ],
  imports:      [
    CommonModule,
    RouterLink,
    InfiniteScrollModule
  ],
  exports:      [
    CustomersComponent
  ]
})
export class CustomersModule {
}
