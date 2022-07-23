import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CoreAuthGuardService as CoreAuthGuard } from './CoreAuthGuardService';
const routes: Routes = [
  { path: '', component: AppComponent },
  { path: '', loadChildren: () => import('src/app/Courzelo_Core/Courzelo_Core_layouts/courzelo-corehome/courzelo-corehome.module').then((m)=>m.CourzeloCorehomeModule) },
  { path: 'trainerSpace',canActivate: [CoreAuthGuard], loadChildren: () => import('src/app/Courzelo_Trainer/Courzelo_Trainer_layouts/courzelo-trainerhome/trainer.module').then((m)=>m.TrainerModule ) },
  { path: 'classroomSpace',canActivate: [CoreAuthGuard],loadChildren: () => import('src/app/Courzelo_Classroom/Courzelo_Classroom_Trainee/Courzelo_Classroom_layouts/classroomTraineehome/classroomTraineehome.module').then((m)=>m.ClassroomTraineehomeModule ) },
  { path: 'quizzSpace',loadChildren: () => import('src/app/Courzelo_Quizz/Courzelo_layouts/CourzeloQuizzHome/courzelo-quizz-home.module').then((m)=>m.CourzeloQuizzHomeModule ) },
  { path: 'businessSpace',loadChildren: () => import('src/app/Courzelo_Business/Courzelo_Business_layouts/Courzelo_businessHome/courzelo-business-home.module').then((m)=>m.CourzeloBusinessHomeModule ) },
  { path: 'stackSpace', canActivate: [CoreAuthGuard], loadChildren: () => import('src/app/Courzelo_Stack/Courzelo_Stack_layouts/Courzelo_StackHome/courzelo-stack-home.module').then((m)=>m.CourzeloStackHomeModule ) },
  { path: 'skillsSpace',canActivate: [CoreAuthGuard],loadChildren: () => import('src/app/Courzelo_Skills/Courzelo_Skills_layouts/Courzelo_SkillsHome/courzelo-skills-home.module').then((m)=>m.CourzeloSkillsHomeModule ) },
  { path: 'adminSpace', canActivate: [CoreAuthGuard],loadChildren: () => import('src/app/Courzelo_Admin/Courzelo_Admin_layouts/Courzelo_AdminHome/courzelo-admin-home.module').then((m)=>m.CourzeloAdminHomeModule ) },
  { path: 'classroomTrainerSpace',canActivate: [CoreAuthGuard], loadChildren: () => import('src/app/Courzelo_Classroom/Courzelo_Classroom_Trainer/Courzelo_Classroom_Trainer_layouts/Trainerhome/trainerhome.module').then((m)=>m.TrainerhomeModule ) },
  { path: '', redirectTo: '', pathMatch: 'full' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes),],
  exports: [RouterModule]
})
export class AppRoutingModule { }
