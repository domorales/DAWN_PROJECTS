import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './principal/principal.component';

const routes: Routes = [
  {
    path: '',
    component: PrincipalComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('../store/store-routing.module').then(
            (m) => m.StoreRoutingModule
          ),
      },
      {
        path: 'cart',
        loadChildren: () =>
          import('../shopping-cart/shopping-cart-routing.module').then(
            (m) => m.ShoppingCartRoutingModule
          ),
      },
      {
        path: 'user',
        loadChildren: () =>
          import('../auth/auth-routing.module').then(
            (m) => m.AuthRoutingModule
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
