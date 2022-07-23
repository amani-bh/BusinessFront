import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourzeloStackHomeComponent } from './courzelo-stack-home.component';

const routes: Routes = [
  { path:'', component:  CourzeloStackHomeComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourzeloStackHomeRoutingModule { }
