import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourzeloAdminHomeComponent } from './courzelo-admin-home.component';

const routes: Routes = [
  { path:'', component: CourzeloAdminHomeComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourzeloAdminHomeRoutingModule { }
