import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssessmentsComponent } from 'src/app/Courzelo_Classroom/Courzelo_Classroom_Trainer/Module/assessments/assessments.component';
import { ArchivedcoursesComponent } from '../../Module/archivedcourses/archivedcourses.component';
import { AssessmentsTraineeComponent } from '../../Module/assessments-trainee/assessments-trainee.component';
import { AttendeesTraineeComponent } from '../../Module/attendees-trainee/attendees-trainee.component';
import { ClassWorkTraineeComponent } from '../../Module/class-work-trainee/class-work-trainee.component';
import { DetailFormationComponent } from '../../Module/detail-formation/detail-formation.component';
import { EspaceFormationComponent } from '../../Module/espace-formation/espace-formation.component';
import { FluxTraineeComponent } from '../../Module/flux-trainee/flux-trainee.component';
import { FormationComponent } from '../../Module/formation/formation.component';
import { GradesTraineeComponent } from '../../Module/grades-trainee/grades-trainee.component';
import { MyclassesComponent } from '../../Module/myclasses/myclasses.component';
import { ClassroomTraineehomeComponent } from './classroomTraineehome.component';


const routes: Routes = [
  
  { path: 'formation', component: FormationComponent}, 
  { path: 'detailFormation', component:DetailFormationComponent},
  { path:'sidebar', component: ClassroomTraineehomeComponent,
  
  children: [

  
   { path:'archivedcourses', component:ArchivedcoursesComponent},
   //{ path:'myClasses/:id', component:MyclassesComponent},
   //{ path:'classworktrainee', component:ClassWorkTraineeComponent},
   //{ path:'fluxtrainee', component:FluxTraineeComponent},
   //{ path:'Quizmanagementtrainee', component:AssessmentsTraineeComponent},
   //{ path:'attendeestrainee', component:AttendeesTraineeComponent},
   //{ path:'gradestrainee', component:GradesTraineeComponent},
   { path:'espaceformation', component:EspaceFormationComponent},

   { path:'espaceformation/fluxtrainee', component:FluxTraineeComponent },
   { path:'espaceformation/classworktrainee', component:ClassWorkTraineeComponent, },
   { path:'espaceformation/attendeestrainee', component:AttendeesTraineeComponent},
   { path:'espaceformation/gradestrainee', component:GradesTraineeComponent},
   { path:'espaceformation/Quizmanagementtrainee', component:AssessmentsTraineeComponent},

   { path:'archivedcourses/fluxtrainee', component:FluxTraineeComponent},
   { path:'archivedcourses/classworktrainee', component:ClassWorkTraineeComponent,pathMatch: 'full' },
   { path:'archivedcourses/attendeestrainee', component:AttendeesTraineeComponent},
   { path:'archivedcourses/gradestrainee', component:GradesTraineeComponent},
   { path:'archivedcourses/Quizmanagementtrainee', component:AssessmentsTraineeComponent},


  ] }
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClassroomhomeComponentRoutingModule { }
