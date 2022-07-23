import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseHomeComponent } from '../../Modules/course-home/course-home.component';
import { AddCourseComponent } from '../../Modules/addCourse/addCourse.component';
import { CustomCourseComponent } from '../../Modules/custom-course/custom-course.component';
import { InstructorComponent } from '../../Modules/instructor/instructor.component';
import { ManageCourseComponent } from '../../Modules/manage-course/manage-course.component';
import { TrainerComponent } from './trainer.component';
import { CourseUpdateComponent } from '../../Modules/course-update/course-update.component';
import { AddQuizComponent } from 'src/app/Courzelo_Quizz/Modules/add-quiz/add-quiz.component';
import { AddQuestionsComponent } from 'src/app/Courzelo_Quizz/Modules/add-questions/add-questions.component';

const routes: Routes = [
  {
    path: '',
    component: TrainerComponent,
    children: [
      {
        path: 'addCourse',
        component: AddCourseComponent,
        children: [
          {
            path: 'addQuizzSection',
            component: AddQuizComponent,
          },
          {
            path: 'addQuizzSection/AddQuestions/:id',
            component: AddQuestionsComponent,
          },
        ],
      },
      { path: 'customCourse', component: CustomCourseComponent },
      { path: 'becomeInstructor', component: InstructorComponent },
      { path: 'takenCourses', component: ManageCourseComponent },
      { path: 'courseHome', component: CourseHomeComponent },
      { path: 'courseUpdate/:id', component: CourseUpdateComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrainerRoutingModule {}
