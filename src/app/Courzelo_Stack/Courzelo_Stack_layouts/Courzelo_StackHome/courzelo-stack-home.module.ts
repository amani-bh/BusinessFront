import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourzeloStackHomeRoutingModule } from './courzelo-stack-home-routing.module';
import { CourzeloStackHomeComponent } from './courzelo-stack-home.component';
import { SharedStackModule } from '../../Shared/shared-stack.module';
@NgModule({
  declarations: [
    CourzeloStackHomeComponent,
  ],
  imports: [
    CommonModule,
    CourzeloStackHomeRoutingModule,
    SharedStackModule
  ],
  exports:[
    CourzeloStackHomeComponent
  ]
})
export class CourzeloStackHomeModule { }
