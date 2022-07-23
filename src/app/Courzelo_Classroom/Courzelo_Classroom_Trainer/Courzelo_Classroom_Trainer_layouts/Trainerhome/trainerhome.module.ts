import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainerhomeRoutingModule } from './trainerhome-routing.module';
import { TrainerhomeComponent } from './trainerhome.component';
import { RouterModule } from '@angular/router';
import { SharedClassroomTrainerModule } from '../../Shared/shared-classroom-Trainer.module';
import { ModalCoursesTrainerComponent } from '../../Module/modal-courses-trainer/modal-courses-trainer.component';
import { CoursesTrainerComponent } from '../../Module/courses-trainer/courses-trainer.component';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { ClassWorkTrainerComponent } from '../../Module/class-work-trainer/class-work-trainer.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HomeWorkTrainerComponent } from '../../Module/home-work-trainer/home-work-trainer.component';
import { AttendeesTrainerComponent } from '../../Module/attendees-trainer/attendees-trainer.component';
import { FluxTrainerComponent } from '../../Module/flux-trainer/flux-trainer.component';
import { GradesTrainerComponent } from '../../Module/grades-trainer/grades-trainer.component';
import {MatListModule} from '@angular/material/list'; 
import {DragDropModule} from '@angular/cdk/drag-drop'; 
import {MatExpansionModule} from '@angular/material/expansion'; 
import {MatMenuModule} from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { ModalUpdateCoursesComponent } from '../../Module/modal-update-courses/modal-update-courses.component';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatSlideToggleModule} from '@angular/material/slide-toggle'; 
import { ModalUpdatePostComponent } from '../../Module/modal-update-post/modal-update-post.component';
import { ArchivedCoursesTrainerComponent } from '../../Module/archived-courses-trainer/archived-courses-trainer.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ModalPhaseComponent } from '../../Module/modal-phase/modal-phase.component';
import { ModalTextComponent } from '../../Module/modal-text/modal-text.component';
import { ModalFileComponent } from '../../Module/modal-file/modal-file.component';
import { PhaseComponent } from '../../Module/phase/phase.component';
import { ModalSectionResourcesComponent } from '../../Module/modal-section-resources/modal-section-resources.component';
import { RecherchePipe } from '../../Module/pipes/recherche.pipe';
import { MatTableModule } from '@angular/material/table';
import { AssessmentsComponent } from '../../Module/assessments/assessments.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { BrowserModule } from '@angular/platform-browser';
import { PdfviewerComponent } from '../../Module/pdfviewer/pdfviewer.component';
import { NgxDocViewerModule } from 'ngx-doc-viewer';




@NgModule({
  declarations: [
    
    TrainerhomeComponent,
    CoursesTrainerComponent,
    ModalCoursesTrainerComponent,
    ClassWorkTrainerComponent,
    HomeWorkTrainerComponent,
    AttendeesTrainerComponent,
    FluxTrainerComponent,
    GradesTrainerComponent,
    ModalUpdateCoursesComponent,
    ModalUpdatePostComponent,
    ArchivedCoursesTrainerComponent,
    ModalPhaseComponent,
    ModalTextComponent,
    ModalFileComponent,
    PhaseComponent,
    ModalSectionResourcesComponent,
    RecherchePipe,
    AssessmentsComponent,
    PdfviewerComponent
    
  ],
  imports: [
    CommonModule,
    TrainerhomeRoutingModule,
    RouterModule,
    SharedClassroomTrainerModule,
    MatIconModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    DragDropModule,
    MatExpansionModule,
    MatMenuModule,
    MatSidenavModule,
    MatSidenavModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatSlideToggleModule,
    NgxPaginationModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    NgxDocViewerModule,
    BrowserModule
    
    

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports:[
    TrainerhomeComponent,
    PhaseComponent,
    FluxTrainerComponent,
    PdfviewerComponent
  ]
})
export class TrainerhomeModule { }
