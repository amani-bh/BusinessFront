import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalenderComponent } from 'src/app/Courzelo_Classroom/Courzelo_Classroom_Trainee/Module/calender/calender.component';
import { AddQuestionsComponent } from 'src/app/Courzelo_Quizz/Modules/add-questions/add-questions.component';
import { AddQuizComponent } from 'src/app/Courzelo_Quizz/Modules/add-quiz/add-quiz.component';
import { ArchivedCoursesTrainerComponent } from '../../Module/archived-courses-trainer/archived-courses-trainer.component';
import { AssessmentsComponent } from '../../Module/assessments/assessments.component';
import { AttendeesTrainerComponent } from '../../Module/attendees-trainer/attendees-trainer.component';
import { ClassWorkTrainerComponent } from '../../Module/class-work-trainer/class-work-trainer.component';
import { CoursesTrainerComponent } from '../../Module/courses-trainer/courses-trainer.component';
import { FluxTrainerComponent } from '../../Module/flux-trainer/flux-trainer.component';
import { GradesTrainerComponent } from '../../Module/grades-trainer/grades-trainer.component';
import { HomeWorkTrainerComponent } from '../../Module/home-work-trainer/home-work-trainer.component';
import { ModalCoursesTrainerComponent } from '../../Module/modal-courses-trainer/modal-courses-trainer.component';
import { PdfviewerComponent } from '../../Module/pdfviewer/pdfviewer.component';
import { TrainerhomeComponent } from './trainerhome.component';

const routes: Routes = [

 
 
 
  { path:'trainer', component:TrainerhomeComponent,

  children: [
  
  { path:'modalcoursestrainer', component:ModalCoursesTrainerComponent},
  //{ path:'fluxtrainer', component:FluxTrainerComponent},
  { path:'examstrainer', component:GradesTrainerComponent},
  //{ path:'attendeestrainer', component:AttendeesTrainerComponent},
  //{ path:'gradestrainer', component:GradesTrainerComponent},
  { path:'homeworktrainer', component:HomeWorkTrainerComponent},
  //{ path:'classworktrainer', component:ClassWorkTrainerComponent, },
  { path:'cal', component:CalenderComponent},
  //{ path:'Quizmanagement', component:AssessmentsComponent},
  { path: 'AddQuiz', component: AddQuizComponent},
  { path: 'AddQuiz/AddQuestions/:id', component: AddQuestionsComponent},
  { path:'archivedcoursestrainer', component:ArchivedCoursesTrainerComponent},
  { path:'coursestrainer', component:CoursesTrainerComponent ,
},
   { path:'coursestrainer/fluxtrainer', component:FluxTrainerComponent },
   { path:'coursestrainer/classworktrainer', component:ClassWorkTrainerComponent, },
   { path:'coursestrainer/attendeestrainer', component:AttendeesTrainerComponent},
   { path:'coursestrainer/gradestrainer', component:GradesTrainerComponent},
   { path:'coursestrainer/Quizmanagement', component:AssessmentsComponent},

   { path:'coursestrainer/pdf', component:PdfviewerComponent},

   { path:'archivedcoursestrainer/fluxtrainer', component:FluxTrainerComponent},
   { path:'archivedcoursestrainer/classworktrainer', component:ClassWorkTrainerComponent,pathMatch: 'full' },
   { path:'archivedcoursestrainer/attendeestrainer', component:AttendeesTrainerComponent},
   { path:'archivedcoursestrainer/gradestrainer', component:GradesTrainerComponent},
   { path:'archivedcoursestrainer/Quizmanagement', component:AssessmentsComponent},

  ] }
  //{ path: 'trainer/AddQuestions/:id', component: AddQuestionsComponent,pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainerhomeRoutingModule { }
