import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddQuizComponent } from '../../Modules/add-quiz/add-quiz.component';
import { HomeQuizComponent } from '../../Modules/home-quiz/home-quiz.component';
import { CourzeloQuizzHomeComponent } from './courzelo-quizz-home.component';
import { AddQuestionsComponent } from '../../Modules/add-questions/add-questions.component';
import { QuizManagementComponent } from '../../Modules/quiz-management/quiz-management.component';
import { QuizDetailComponent } from '../../Modules/quiz-detail/quiz-detail.component';
import { QuizPertraineeComponent } from '../../Modules/quiz-pertrainee/quiz-pertrainee.component';
import { QuizQuestionsPertraineeComponent } from '../../Modules/quiz-questions-pertrainee/quiz-questions-pertrainee.component';
import { AddprojectComponent } from '../../Modules/addproject/addproject.component';
import { ShowprojectComponent } from '../../Modules/showproject/showproject.component';
import { QuizupdateComponent } from '../../Modules/quizupdate/quizupdate.component';
import { UpdateprojectComponent } from '../../Modules/updateproject/updateproject.component';
const routes: Routes = [
  { path:'', component: CourzeloQuizzHomeComponent,
  children: [
    { path: '', component: HomeQuizComponent },
    { path: 'AddQuiz', component: AddQuizComponent },
    { path: 'AddQuiz/AddQuestions/:id', component: AddQuestionsComponent },
    { path: 'Quizmanagement', component: QuizManagementComponent },
    { path: 'quizdetail/:id', component: QuizDetailComponent }  ,
    {path:'Quizupdate/:id',component:QuizupdateComponent},
    { path: 'quizanswer/:id', component: QuizPertraineeComponent },
    { path: 'quizanswerperquestion/:id', component: QuizQuestionsPertraineeComponent },
    {path :'addproject',component:AddprojectComponent},
    {path :'showproject/:id',component:ShowprojectComponent},
    {path:'updateproject/:id',component:UpdateprojectComponent}
    
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourzeloQuizzHomeRoutingModule { }
