import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  SharedClassroomTraineeModule } from '../../Shared/shared-classroom-Trainee.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import {  MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card'; 
import { FormationComponent } from '../../Module/formation/formation.component';
import { DetailFormationComponent } from '../../Module/detail-formation/detail-formation.component';
import { MyclassesComponent } from '../../Module/myclasses/myclasses.component';
import { EspaceFormationComponent } from '../../Module/espace-formation/espace-formation.component';
import { FormulaireFormationComponent } from '../../Module/formulaire-formation/formulaire-formation.component';
import {MatPaginatorModule} from '@angular/material/paginator'; 
import {MatTabsModule} from '@angular/material/tabs'; 
import { MatExpansionModule} from '@angular/material/expansion';
import {MatListModule} from '@angular/material/list'; 
import { ClassroomTraineehomeComponent } from './classroomTraineehome.component';
import { ClassroomhomeComponentRoutingModule } from './classroomTraineehome-routing.module';
import { BrowserModule } from '@angular/platform-browser'
import { ArchivedcoursesComponent } from '../../Module/archivedcourses/archivedcourses.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgxPaginationModule } from 'ngx-pagination';
import { RecherchePipe } from '../../Module/pipes/recherche.pipe';
import { TrainerhomeModule } from 'src/app/Courzelo_Classroom/Courzelo_Classroom_Trainer/Courzelo_Classroom_Trainer_layouts/Trainerhome/trainerhome.module';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { TrainerhomeRoutingModule } from 'src/app/Courzelo_Classroom/Courzelo_Classroom_Trainer/Courzelo_Classroom_Trainer_layouts/Trainerhome/trainerhome-routing.module';
import { ModalsubscriptionComponent } from '../../Module/modalsubscription/modalsubscription.component';
import { PhaseTraineeComponent } from '../../Module/phase-trainee/phase-trainee.component';
import { ClassWorkTraineeComponent } from '../../Module/class-work-trainee/class-work-trainee.component';
import { FluxTraineeComponent } from '../../Module/flux-trainee/flux-trainee.component';
import { AssessmentsTraineeComponent } from '../../Module/assessments-trainee/assessments-trainee.component';
import { AttendeesTraineeComponent } from '../../Module/attendees-trainee/attendees-trainee.component';
import { GradesTraineeComponent } from '../../Module/grades-trainee/grades-trainee.component';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { CalenderComponent } from '../../Module/calender/calender.component';









@NgModule({
  declarations: [
    ClassroomTraineehomeComponent,
    FormationComponent,
    DetailFormationComponent,
    MyclassesComponent,
    EspaceFormationComponent,
    FormulaireFormationComponent,
    ArchivedcoursesComponent,
    RecherchePipe,
    ModalsubscriptionComponent,
    PhaseTraineeComponent,
    ClassWorkTraineeComponent,
    FluxTraineeComponent,
    AssessmentsTraineeComponent,
    AttendeesTraineeComponent,
    GradesTraineeComponent,
    CalenderComponent
    
  ],
  imports: [
    CommonModule,
    ClassroomhomeComponentRoutingModule,
    SharedClassroomTraineeModule,
    TrainerhomeModule, 
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    MatCardModule,
    MatPaginatorModule,
    MatTabsModule,
    MatExpansionModule,
   MatIconModule,
   MatListModule,
  BrowserModule,
  CalendarModule.forRoot({
    provide: DateAdapter,
    useFactory: adapterFactory,
  }),
  MatMenuModule,
  FormsModule,
  MatSlideToggleModule,
  DragDropModule,
  RouterModule,
  MatDialogModule,
  ReactiveFormsModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatDatepickerModule,
  NgxPaginationModule,
  TrainerhomeRoutingModule,
  MatTableModule,
  MatSortModule,
  NgxDocViewerModule,
   

    

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports:[
    ClassroomTraineehomeComponent
  ]
})
export class ClassroomTraineehomeModule { }
