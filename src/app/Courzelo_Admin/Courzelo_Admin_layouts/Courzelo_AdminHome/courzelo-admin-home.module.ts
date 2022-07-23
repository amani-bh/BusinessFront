import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourzeloAdminHomeRoutingModule } from './courzelo-admin-home-routing.module';
import { CourzeloAdminHomeComponent } from './courzelo-admin-home.component';
import { RouterModule } from '@angular/router';
import { SharedAdminModule } from '../../Shared/shared-admin.module';


@NgModule({
  declarations: [
    CourzeloAdminHomeComponent
  ],
  imports: [
    CommonModule,
    CourzeloAdminHomeRoutingModule,
    SharedAdminModule,
    RouterModule
  ],
  exports:[
    CourzeloAdminHomeComponent,
    RouterModule,

  ]
})
export class CourzeloAdminHomeModule { }
