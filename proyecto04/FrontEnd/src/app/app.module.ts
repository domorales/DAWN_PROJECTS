import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {CustomersModule} from "./report/customers.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AppRoutingModule} from './app-routing.module';
import {SharedModule} from "./shared/shared.module";
import {LoaderInterceptor} from "./shared/interceptors/loader.interceptor";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports:      [
    BrowserModule,
    HttpClientModule,
    CustomersModule,
    AppRoutingModule,
    SharedModule
  ],
  providers:    [{provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true}],
  bootstrap:    [AppComponent]
})
export class AppModule {
}
