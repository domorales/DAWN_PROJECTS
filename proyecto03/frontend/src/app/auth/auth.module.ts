import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';

@NgModule({
  declarations: [LoginComponent, UserComponent],
  imports: [CommonModule, ReactiveFormsModule, AuthRoutingModule],
  exports: [LoginComponent],
})
export class AuthModule {}
