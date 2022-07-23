import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SlideBarComponent } from './slide-bar/slide-bar.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import { HeaderTrainerComponent } from './header-trainer/header-trainer.component';

@NgModule({
  declarations: [
    SlideBarComponent,
    HeaderTrainerComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule
  ],
  exports:[
    SlideBarComponent,
    HeaderTrainerComponent
  ]
})
export class SharedTrainerModule { }
