import { Inject, NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { CourzeloBusinessHomeRoutingModule } from './courzelo-business-home-routing.module';
import { CourzeloBusinessHomeComponent } from './courzelo-business-home.component';
import { RouterModule } from '@angular/router';
import { SharedBusinessModule } from '../../Shared/shared-business.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon'
import { MatCardModule } from '@angular/material/card';
import { RegisterComponent } from '../../Modules/register/register.component';
import { HomepageComponent } from '../../Modules/homepage/homepage.component';
import { JobOffersComponent } from '../../Modules/job-offers/job-offers.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import { AddJobDialogComponent } from '../../Modules/add-job-dialog/add-job-dialog.component';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { UpdJobDialogComponent } from '../../Modules/upd-job-dialog/upd-job-dialog.component';
import { MatGridListModule } from '@angular/material/grid-list';
import {MatStepperModule} from '@angular/material/stepper';
import { AboutUsComponent } from '../../Modules/about-us/about-us.component';
import { CandidateJobsComponent } from '../../Modules/candidate-jobs/candidate-jobs.component';
import { CandidateAppComponent } from '../../Modules/candidate-app/candidate-app.component';
import { BusinessLoginComponent } from '../../Modules/business-login/business-login.component';
import { TestsComponent } from '../../Modules/tests/tests.component';
import { AddTestDialogComponent } from '../../Modules/add-test-dialog/add-test-dialog.component';
import { QuestionsComponent } from '../../Modules/questions/questions.component';
import {IvyCarouselModule} from 'angular-responsive-carousel';
import {MatTooltipModule} from '@angular/material/tooltip';
import { JobDetailsComponent } from '../../Modules/job-details/job-details.component';
import { UpdateTestComponent } from '../../Modules/update-test/update-test.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTabsModule} from '@angular/material/tabs';
import {MatChipsModule} from '@angular/material/chips';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { UserApplicationsComponent } from '../../Modules/user-applications/user-applications.component';
import { AdminUserComponent } from '../../Modules/admin-user/admin-user.component';
import { SlideComponent } from '../../Modules/slide/slide.component';
import {MatSliderModule} from '@angular/material/slider';
import {MatSidenavModule} from '@angular/material/sidenav';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import { NgChartsModule } from 'ng2-charts';
import { JobOverviewComponent } from '../../Modules/job-overview/job-overview.component';
import { JobDashboardComponent } from '../../Modules/job-dashboard/job-dashboard.component';
import { JobViewComponent } from '../../Modules/job-view/job-view.component';
import { InterviewDiagComponent } from '../../Modules/interview-diag/interview-diag.component';
import { JobAppComponent } from '../../Modules/job-app/job-app.component';
import { OfferDiagComponent } from '../../Modules/offer-diag/offer-diag.component';
import { ApplyDiagComponent } from '../../Modules/apply-diag/apply-diag.component'
import { JobTestsComponent } from '../../Modules/job-tests/job-tests.component';
import { TechTestComponent } from '../../Modules/tech-test/tech-test.component';
import { AuthGuardService } from '../../Shared/services/AuthGuardService';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MeetComponent } from '../../Modules/meet/meet.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from 'src/app/Courzelo_Core/Shared/Interceptor/auth.interceptor';
import { BusinessAuthInterceptor } from '../../Shared/_helpers/BusinessAuth.interceptor';
import { SendTestComponent } from '../../Modules/send-test/send-test.component';
import { TrackBoardComponent } from '../../Modules/track-board/track-board.component';
import { PowerBIEmbedModule } from 'powerbi-client-angular';
import { CompareCandidateComponent } from '../../Modules/compare-candidate/compare-candidate.component';
import { BusinessForgotPassComponent } from '../../Modules/business-forgot-pass/business-forgot-pass.component';
import { BusinessResetPassComponent } from '../../Modules/business-reset-pass/business-reset-pass.component';
import {MatBadgeModule} from '@angular/material/badge';
import { WebSocketService } from '../../Shared/services/websocket.service';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { SubAccountsComponent } from '../../Modules/sub-accounts/sub-accounts.component';
import { AddSubAccountDialogComponent } from '../../Modules/add-sub-account-dialog/add-sub-account-dialog.component';

@NgModule({
  declarations: [
    CourzeloBusinessHomeComponent,
    RegisterComponent,
    HomepageComponent,
    JobOffersComponent,
    AddJobDialogComponent,
    UpdJobDialogComponent,
    AboutUsComponent,
    CandidateJobsComponent,
    CandidateAppComponent,
    BusinessLoginComponent,
    TestsComponent,
    AddTestDialogComponent,
    QuestionsComponent,
    JobDetailsComponent,
    UpdateTestComponent,
    UserApplicationsComponent,
    SlideComponent,
    AdminUserComponent,
    JobOverviewComponent,
    JobDashboardComponent,
    JobViewComponent,
    InterviewDiagComponent,
    JobAppComponent,
    OfferDiagComponent,
    JobTestsComponent,
    ApplyDiagComponent,
    TechTestComponent,
    MeetComponent,
    SendTestComponent,
    CompareCandidateComponent,
    BusinessForgotPassComponent,
    BusinessResetPassComponent,
    TrackBoardComponent,
    SubAccountsComponent,
    AddSubAccountDialogComponent
    
    
  ],
  imports: [
    CommonModule,
    CourzeloBusinessHomeRoutingModule,
    RouterModule,
    SharedBusinessModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatCardModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule, 
    MatGridListModule,
    MatStepperModule,
    MatCheckboxModule,
    MatRadioModule,
    IvyCarouselModule,
    MatTooltipModule,
    MatExpansionModule,
    MatTabsModule,
    MatChipsModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatSidenavModule,
    MatDividerModule,
    MatListModule,
    ScrollingModule,
    NgChartsModule,
    PdfViewerModule,
    MatProgressSpinnerModule,
    PowerBIEmbedModule,
    MatBadgeModule,
    NgxDocViewerModule
    
  ],
  exports:[
    CourzeloBusinessHomeComponent,
  ],
  providers: [WebSocketService,DatePipe,AuthGuardService,{ provide: HTTP_INTERCEPTORS, useClass: BusinessAuthInterceptor, multi: true}]
})
export class CourzeloBusinessHomeModule { }
