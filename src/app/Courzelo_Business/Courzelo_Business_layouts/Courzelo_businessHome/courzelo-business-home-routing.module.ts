import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddQuestionsComponent } from 'src/app/Courzelo_Quizz/Modules/add-questions/add-questions.component';
import { AddQuizComponent } from 'src/app/Courzelo_Quizz/Modules/add-quiz/add-quiz.component';
import { AboutUsComponent } from '../../Modules/about-us/about-us.component';
import { AddTestDialogComponent } from '../../Modules/add-test-dialog/add-test-dialog.component';
import { AdminUserComponent } from '../../Modules/admin-user/admin-user.component';
import { BusinessLoginComponent } from '../../Modules/business-login/business-login.component';
import { CandidateAppComponent } from '../../Modules/candidate-app/candidate-app.component';
import { CandidateJobsComponent } from '../../Modules/candidate-jobs/candidate-jobs.component';
import { HomepageComponent } from '../../Modules/homepage/homepage.component';
import { JobAppComponent } from '../../Modules/job-app/job-app.component';
import { JobDashboardComponent } from '../../Modules/job-dashboard/job-dashboard.component';
import { JobOffersComponent } from '../../Modules/job-offers/job-offers.component';
import { JobOverviewComponent } from '../../Modules/job-overview/job-overview.component';
import { JobTestsComponent } from '../../Modules/job-tests/job-tests.component';
import { JobViewComponent } from '../../Modules/job-view/job-view.component';
import { RegisterComponent } from '../../Modules/register/register.component';
import { TechTestComponent } from '../../Modules/tech-test/tech-test.component';
import { TestsComponent } from '../../Modules/tests/tests.component';
import { UpdateTestComponent } from '../../Modules/update-test/update-test.component';
import { UserApplicationsComponent } from '../../Modules/user-applications/user-applications.component';
import { CourzeloBusinessHomeComponent } from './courzelo-business-home.component';
import { AuthGuardService as AuthGuard } from '../../Shared/services/AuthGuardService';
import { CoreAuthGuardService as CoreAuthGuard } from '../../../CoreAuthGuardService';
import { MeetComponent } from '../../Modules/meet/meet.component';
import { QuizPertraineeComponent } from 'src/app/Courzelo_Quizz/Modules/quiz-pertrainee/quiz-pertrainee.component';
import { TrackBoardComponent } from '../../Modules/track-board/track-board.component';
import { CompareCandidateComponent } from '../../Modules/compare-candidate/compare-candidate.component';
import { SideNavComponent } from '../../Shared/side-nav/side-nav.component';
import { BusinessForgotPassComponent } from '../../Modules/business-forgot-pass/business-forgot-pass.component';
import { BusinessResetPassComponent } from '../../Modules/business-reset-pass/business-reset-pass.component';
import { BusinessProfileComponent } from '../../Modules/business-profile/business-profile.component';
import { SubAccountsComponent } from '../../Modules/sub-accounts/sub-accounts.component';

const routes: Routes = [
  { path:'', component: CourzeloBusinessHomeComponent,
    children: [
    { path: '', component: RegisterComponent },
    { path: 'Meet', component: MeetComponent },
    { path: 'Businessregister', component: RegisterComponent },
    { path: 'BusinessForgotPass', component: BusinessForgotPassComponent },
    { path: 'BusinessReset', component: BusinessResetPassComponent },
    { path: 'CourzeloForBusiness', component: HomepageComponent },
    { path: 'tracker', component: TrackBoardComponent ,canActivate: [AuthGuard]  },
    { path: 'jobOffers', component: JobOffersComponent ,canActivate: [AuthGuard]  },
    { path: 'JobDashboard/:idJob', component: JobDashboardComponent, canActivate: [AuthGuard] , 
       children: [
      { path: '', component: JobOverviewComponent ,canActivate: [AuthGuard]  }, 
      { path: 'jobOverview', component: JobOverviewComponent ,canActivate: [AuthGuard] },
      { path: 'jobView', component: JobViewComponent, canActivate: [AuthGuard]  }, 
      { path: 'candidateApp', component: JobAppComponent ,canActivate: [AuthGuard] }, 
      { path: 'CompareCandidate', component: CompareCandidateComponent ,canActivate: [AuthGuard] },
      { path: 'TechTests', component: JobOverviewComponent ,canActivate: [AuthGuard] },
      { path: 'PrehiringTest', component: JobTestsComponent,canActivate: [AuthGuard] },
      { path: 'PrehiringTest/AddTests', component: AddTestDialogComponent,canActivate: [AuthGuard] },
      { path: 'PrehiringTest/UpdTest/:id', component: UpdateTestComponent,canActivate: [AuthGuard] },
      { path: 'Quizmanagement', component: TechTestComponent,canActivate: [AuthGuard] },
      { path: 'Quizmanagement/AddTest', component: AddQuizComponent,canActivate: [AuthGuard] },
      { path: 'Quizmanagement/AddTest/AddQuestions/:id', component: AddQuestionsComponent ,canActivate: [AuthGuard] },
      { path: 'History', component: JobOverviewComponent ,canActivate: [AuthGuard] }, 
    ]},
      
    { path: 'AboutUs', component: AboutUsComponent  },
    { path: 'BusinessProfile', component: BusinessProfileComponent  },
    { path: 'CandidateJobs', component: CandidateJobsComponent },
    { path: 'CandidateApps', component: CandidateAppComponent,canActivate: [AuthGuard]  },
    { path: 'UserApplications', component: UserApplicationsComponent },
    { path: 'Tests', component: TestsComponent ,canActivate: [AuthGuard] },
    { path: 'Tests/AddTests', component: AddTestDialogComponent,pathMatch: 'full'   ,canActivate: [AuthGuard] },
    { path: 'Tests/UpdTest/:id', component: UpdateTestComponent  ,pathMatch: 'full' ,canActivate: [AuthGuard]  },
    { path: 'AdminUser', component: AdminUserComponent   },
    { path: 'Tests/AddTechTest', component: AddQuizComponent ,pathMatch: 'full',canActivate: [AuthGuard] },
    { path: 'Tests/AddTechTest/AddQuestions/:id', component: AddQuestionsComponent ,pathMatch: 'full' ,canActivate: [AuthGuard]  },
    { path:'BusinessLogin', component: BusinessLoginComponent},
    { path:'SubAccounts', component: SubAccountsComponent,canActivate: [AuthGuard] },
    { path:'PassTest/:id', component: QuizPertraineeComponent,canActivate: [CoreAuthGuard]}
    
  ]},
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourzeloBusinessHomeRoutingModule { }
