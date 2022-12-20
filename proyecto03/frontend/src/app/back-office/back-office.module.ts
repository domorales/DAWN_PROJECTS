import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AdministratorComponent } from './administrator/administrator.component';
import { BackOfficeRoutingModule } from './back-office-routing.module';

@NgModule({
  declarations: [AdministratorComponent],
  imports: [CommonModule, BackOfficeRoutingModule],
  exports: [AdministratorComponent],
})
export class BackOfficeModule {}
